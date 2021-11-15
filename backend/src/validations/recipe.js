import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateRecipe(data) {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : ""
    data.description = !isEmpty(data.description) ? data.description : ""
    data.categorie = !isEmpty(data.categorie) ? data.categorie : ""
    data.instructions = !isEmpty(data.instructions) ? data.instructions : ""
    data.ingredients = data.ingredients.length > 0 ? data.ingredients : data.ingredients
    data.img = !isEmpty(data.img) ? data.img : ""


    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }
    if (Validator.isEmpty(data.description)) {
        errors.description = "Description is required";
    }
    if (Validator.isEmpty(data.categorie)) {
        errors.categorie = "Categorie is required";
    }
    if (Validator.isEmpty(data.instructions)) {
        errors.instructions = "Instructions are required";
    }
    if (data.ingredients.length === 0) {
        errors.ingredients = "Ingredients are required";
    }
    if (Validator.isEmpty(data.img)) {
        errors.img = "Image is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}