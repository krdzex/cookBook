import Recipe from "../models/recipe.model"
import _ from "lodash";
import fs from "fs"
import { promisify } from "util";
import validateRecipe from "../validations/recipe"

const createRecipe = (req, res) => {
    const deleteImg = promisify(fs.unlink)
    const recipe = new Recipe(req.body);
    if (req.file !== undefined) {
        recipe.img = req.file.filename;
    } else {
        recipe.img = "";
    }
    const { errors, isValid } = validateRecipe(recipe);
    if (!isValid) {
        if (recipe.img !== "") {
            deleteImg(`../frontend/public/images/${recipe.img}`)
        }
        return res.status(400).json(errors)
    }
    Recipe.findOne({ "name": req.body.name }).then((result) => {
        if (result) {
            deleteImg(`../frontend/public/images/${recipe.img}`)
            return res.status(400).json({ name: "Name already exist!" })
        } else {
            recipe.save().then(res.status(200).json({
                message: "Successfully created recipe"
            })).catch(err => console.log(err))
        }
    })

}

const listRecipe = (req, res) => {
    Recipe.find((err, result) => {
        result.forEach(recipe => {
            let allRatings = recipe.ratings.length;
            if (allRatings > 2) {
                recipe.ratings = recipe.ratings.reduce((a, b) => a + b, 0);
                recipe.ratings /= allRatings
            } else {
                recipe.ratings = 0
            }

        });
        res.status(200).json(result)
    })
}

const singleRecipe = (req, res) => {
    let id = req.params.id
    Recipe.findById(id).exec().then((result) => {
        res.status(200).json(result)
    })
}

const recipeLikeThis = (req, res) => {
    let id = req.params.id
    let categoria = ""
    Recipe.findById(id).exec().then((recipe) => {
        categoria = recipe.categorie;
        Recipe.find({ "categorie": categoria }).limit(6).exec((err, result) => {
            result.forEach(recipe => {
                let allRatings = recipe.ratings.length;
                if (allRatings > 2) {
                    recipe.ratings = recipe.ratings.reduce((a, b) => a + b, 0);
                    recipe.ratings /= allRatings
                } else {
                    recipe.ratings = 0
                }

            });

            res.json(result);
        }
        )
    }).catch((err) => {
        return 'error occured';
    });

}

const editRecipe = (req, res) => {
    let id = req.params.id;

    Recipe.findById(id).exec((err, result) => {
        const originalImg = result.img;
        const deleteImg = promisify(fs.unlink)

        let recipe = result;
        recipe = _.extend(recipe, req.body)
        if (req.body.ingredients === "") {
            recipe = _.extend(recipe, { ingredients: [] })
        }
        const { errors, isValid } = validateRecipe(recipe);
        if (!isValid) {
            if (req.file !== undefined) {
                deleteImg(`../frontend/public/images/${req.file.filename}`)
            }
            return res.status(400).json(errors)
        }
        Recipe.findOne({ name: req.body.name }).then((result) => {
            if (result.id !== id) {
                if (req.file !== undefined) {
                    deleteImg(`../frontend/public/images/${req.file.filename}`)
                }
                return res.status(400).json({ name: "Name already exist!" })
            } else {
                if (req.file !== undefined) {
                    deleteImg(`../frontend/public/images/${originalImg}`)
                    recipe = _.extend(recipe, { img: req.file.filename })
                }
                recipe.save().then(res.json({ message: "Successfuly edited recipe" })).catch(err => console.log(err))
            }
        })
    })
}

const listMyRecipes = (req, res) => {
    let id = req.params.id;
    Recipe.find({ "author": id }, (err, result) => {
        if (result !== null) {
            result.forEach(recipe => {
                let allRatings = recipe.ratings.length;
                if (allRatings > 2) {
                    recipe.ratings = recipe.ratings.reduce((a, b) => a + b, 0);
                    recipe.ratings /= allRatings
                } else {
                    recipe.ratings = 0
                }

            });
        }
        res.json(result);
    })
}

const editRecipeStar = (req, res) => {
    let id = req.params.id;
    Recipe.findById(id).exec((err, recipe) => {
        recipe.ratings.push(req.body.grade);
        for (let i = 0; i < recipe.ratedBy.length; i++) {
            if (recipe.ratedBy[i].toString() === req.body.user) {
                return res.status(200).json({ error: "Already voted!" })
            }
        }
        recipe.ratedBy.push(req.body.user);
        recipe.save();
        res.json({ message: "Rated" });
    });
}

const topRateRecipes = (req, res) => {
    let topRatedArray = []
    Recipe.find((err, result) => {
        result.forEach(recipe => {
            let allRatings = recipe.ratings.length;
            if (allRatings > 2) {
                recipe.ratings = recipe.ratings.reduce((a, b) => a + b, 0);
                recipe.ratings /= allRatings
            } else {
                recipe.ratings = 0
            }

        });
        result.sort((a, b) => b.ratings - a.ratings)
        for (let i = 0; result.length < 10 ? i < result.length : i < 10; i++) {
            topRatedArray.push(result[i])
        }
        res.json(topRatedArray);
    })
}

const deleteRecipe = (req, res) => {
    let id = req.params.id;
    const deleteImg = promisify(fs.unlink)
    Recipe.findByIdAndDelete(id).exec((err, res) => {
        deleteImg(`../frontend/public/images/${res.img}`)
    })
}





export default { createRecipe, listRecipe, recipeLikeThis, editRecipe, listMyRecipes, editRecipeStar, topRateRecipes, deleteRecipe, singleRecipe }