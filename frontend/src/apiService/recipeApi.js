import url from "../config/config"

const createRecipe = (recipe) => {
    return fetch(`${url}/api/recipe`, {
        method: "POST",
        body: recipe
    }).then(response => response.json()).catch(err => console.log(err))

}

const updateRecipe = (id, recipe) => {
    return fetch(`${url}/api/recipe/${id}`, {
        method: "PUT",
        body: recipe
    }).then(response => response.json()).catch(err => console.log(err))
}

const updateRecipeStar = (id, recipeStar) => {
    return fetch(`${url}/api/recipe/star/${id}`, {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(recipeStar)
    }).then(response => response.json()).catch(err => console.log(err))
}

const listRecipe = () => {
    return fetch(`${url}/api/recipe`, {
        method: "GET",
    }).then(response => response.json()).catch(err => console.log(err))
}

const listLikeThisrecipe = (id) => {
    return fetch(`${url}/api/recipe/likeThis/${id}`, {
        method: "GET",
    }).then(response => response.json()).catch(err => console.log(err))
}

const listMyRecipes = (id) => {
    return fetch(`${url}/api/recipe/${id}`, {
        method: "GET",
    }).then(response => response.json()).catch(err => console.log(err))
}

const getTopRatedRecipes = () => {
    return fetch(`${url}/api/topRatedRecipes`, {
        method: "GET",
    }).then(response => response.json()).catch(err => console.log(err))
}

const deleteRecipe = (id) => {
    return fetch(`${url}/api/recipe/${id}`, {
        method: "DELETE",
    }).then(response => response.json()).catch(err => console.log(err))
}

const getSignelRecipe = (id) => {
    return fetch(`${url}/api/singleRecipe/${id}`, {
        method: "GET",
    }).then(response => response.json()).catch(err => console.log(err))
}


export { createRecipe, listRecipe, listLikeThisrecipe, updateRecipe, listMyRecipes, updateRecipeStar, getTopRatedRecipes, deleteRecipe, getSignelRecipe }