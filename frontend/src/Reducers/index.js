import { combineReducers } from "redux";
import recipeReducer from "./singleRecipeReducer";
import popUpReducer from "./popUp";
const allReducers = combineReducers({
    singleRecipe: recipeReducer,
    popUp: popUpReducer
})

export default allReducers;