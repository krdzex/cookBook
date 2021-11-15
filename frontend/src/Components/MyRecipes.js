import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addSingleRecipe, closePopUp, openPopUp } from '../Actions';
import { deleteRecipe, listMyRecipes } from '../apiService/recipeApi';
import authHelper from '../auth/authHelper';
import moment from "moment"
import { Icon } from '@iconify/react';
const MyRecipes = () => {
    const [clickedHeader, setClickedHeader] = useState("")
    const [myAllRecipes, setMyAllrecipes] = useState([])
    useEffect(() => {
        listMyRecipes(authHelper.isAuthentcated().user._id).then(res => {
            res.forEach((recipe) => {
                recipe.created = moment(recipe.created).format('DD/MM/YYYY - HH:mm')
            });
            setMyAllrecipes(res)
        }).catch(reason => console.log(reason))
    }, [])

    const dispatch = useDispatch()

    const [arrow, setArrow] = useState({})
    const onHeaderClick = (header) => {
        const myAllRecipesCopy = myAllRecipes.slice()
        let arrowCopy = arrow;
        if (clickedHeader === header) {
            switch (header) {
                case "recipe":
                    myAllRecipesCopy.reverse()
                    arrowCopy = { recipe: !arrow.recipe }
                    break;
                case "rating":
                    myAllRecipesCopy.reverse()
                    arrowCopy = { rating: !arrow.date }
                    break;
                case "date":
                    myAllRecipesCopy.reverse()
                    arrowCopy = { date: !arrow.date }
                    break;
                case "categorie":
                    myAllRecipesCopy.reverse()
                    arrowCopy = { categorie: !arrow.categorie }
                    break;
                default:
                    return header
            }
        } else {
            switch (header) {
                case "recipe":
                    myAllRecipesCopy.sort((a, b) => a.name.localeCompare(b.name))
                    arrowCopy = { recipe: true }
                    break;
                case "rating":
                    myAllRecipesCopy.sort((a, b) => a.ratings - b.ratings)
                    arrowCopy = { rating: true }
                    break;
                case "date":
                    myAllRecipesCopy.sort((a, b) => a.created.localeCompare(b.created)).reverse()
                    arrowCopy = { date: true }
                    break;
                case "categorie":
                    myAllRecipesCopy.sort((a, b) => a.categorie.localeCompare(b.categorie))
                    arrowCopy = { categorie: true }
                    break;
                default:
                    return header
            }
        }
        setMyAllrecipes(myAllRecipesCopy)
        setArrow(arrowCopy)
        setClickedHeader(header)
    }
    const onDeleteClick = (id) => {
        let newRecipes = myAllRecipes.filter((recipe) => recipe._id !== id)
        dispatch(openPopUp("Successfuly Deleted Recipe!"))
        setTimeout(() => {
            dispatch(closePopUp())
        }, 3000);
        setMyAllrecipes(newRecipes)
        deleteRecipe(id).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    return (
        <div className="myRecipeWrapper">
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <td onClick={() => onHeaderClick("recipe")}>Recipe {Object.keys(arrow)[0] === "recipe" ? arrow.recipe ? <Icon icon="akar-icons:circle-chevron-down" style={{ position: "relative", top: "3px" }} /> : <Icon icon="akar-icons:circle-chevron-up" style={{ position: "relative", top: "3px" }} /> : ""}</td>
                            <td onClick={() => onHeaderClick("rating")}>Rating  {Object.keys(arrow)[0] === "rating" ? arrow.rating ? <Icon icon="akar-icons:circle-chevron-down" style={{ position: "relative", top: "3px" }} /> : <Icon icon="akar-icons:circle-chevron-up" style={{ position: "relative", top: "3px" }} /> : ""}</td>
                            <td onClick={() => onHeaderClick("date")}>Date  {Object.keys(arrow)[0] === "date" ? arrow.date ? <Icon icon="akar-icons:circle-chevron-down" style={{ position: "relative", top: "3px" }} /> : <Icon icon="akar-icons:circle-chevron-up" style={{ position: "relative", top: "3px" }} /> : ""}</td>
                            <td onClick={() => onHeaderClick("categorie")}>Categorie  {Object.keys(arrow)[0] === "categorie" ? arrow.categorie ? <Icon icon="akar-icons:circle-chevron-down" style={{ position: "relative", top: "3px" }} /> : <Icon icon="akar-icons:circle-chevron-up" style={{ position: "relative", top: "3px" }} /> : ""}</td>
                            <td >Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {myAllRecipes.map((recipe, id) => (
                            <tr key={id}>
                                <td>
                                    {recipe.name}
                                </td>
                                {recipe.ratings > 0 ? <td style={{ color: "green", fontSize: "25px", position: "relative", top: "2px" }}>
                                    {recipe.ratings > 0 ? recipe.ratings >= 1 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                                    {recipe.ratings > 1 ? recipe.ratings >= 2 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                                    {recipe.ratings > 2 ? recipe.ratings >= 3 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                                    {recipe.ratings > 3 ? recipe.ratings >= 4 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                                    {recipe.ratings > 4 ? recipe.ratings >= 5 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                                </td> : <td style={{ color: "red", fontSize: "18px", position: "relative", top: "2px" }}>Less then 3 votes!</td>}
                                <td>
                                    {recipe.created}
                                </td>
                                <td>
                                    {recipe.categorie}
                                </td>
                                <td>
                                    <div className="myRecipesGrid" >
                                        <Link to="/editRecipe" onClick={() => dispatch(addSingleRecipe(recipe._id))}><p style={{ marginRight: "10px" }}>Edit</p></Link>
                                        <Link to="/singleRecipe" onClick={() => dispatch(addSingleRecipe(recipe._id))}><p style={{ marginRight: "10px" }}>View</p></Link>
                                        <span  style={{color: "red",cursor:"pointer"}}onClick={() => onDeleteClick(recipe._id)}><p>Delete</p></span>
                                    </div>
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default MyRecipes;
