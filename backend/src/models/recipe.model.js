import mongoose from "mongoose"

const RecipeSchema = new mongoose.Schema({
    img: { type: String, trim: true },
    author: { type: String },
    ingredients: { type: Array, "default": [] },
    name: { type: String, trim: true},
    description: { type: String, trim: true },
    categorie: { type: String, trim: true },
    instructions: { type: String, trim: true },
    ratings: [{ type: Number }],
    ratedBy: [{ type: mongoose.Types.ObjectId }],
    created: { type: Date, default: Date.now }
})

export default mongoose.model("Recipe", RecipeSchema)