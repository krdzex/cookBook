import express from "express";
import recipeController from "../controller/recipe.controller";
import multer from "multer";
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/public/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })
router.route("/api/recipe").post(upload.single('img'), recipeController.createRecipe).get(recipeController.listRecipe)
router.route("/api/recipe/likeThis/:id").get(recipeController.recipeLikeThis)
router.route("/api/recipe/:id").put(upload.single('img'), recipeController.editRecipe).delete(recipeController.deleteRecipe)
router.route("/api/singleRecipe/:id").get(recipeController.singleRecipe)
router.route("/api/recipe/:id").get(recipeController.listMyRecipes)
router.route("/api/recipe/star/:id").put(recipeController.editRecipeStar)
router.route("/api/topRatedRecipes").get(recipeController.topRateRecipes)

export default router;