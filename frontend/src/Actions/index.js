
export const addSingleRecipe = (recipe) => {
    return {
        type: "ADD_RECIPE",
        payload: recipe
    }
}

export const openPopUp = (content) => {
    return {
        type: "SHOW_POP_UP",
        payload: content
    }
}

export const closePopUp = () => {
    return {
        type: "REMOVE_POP_UP"
    }
}  

export const openErrorPopUp = (content) => {
    return {
        type: "SHOW_ERROR_POP_UP",
        payload: content
    }
}

export const closeErrorPopUp = () => {
    return {
        type: "REMOVE_ERROR_POP_UP"
    }
} 