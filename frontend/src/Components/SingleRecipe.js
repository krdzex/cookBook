import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeLikeThis from './RecipeLikeThis';
import { Icon } from "@iconify/react"
import { Link } from 'react-router-dom';
import { getSignelRecipe, updateRecipeStar } from '../apiService/recipeApi';
import authHelper from '../auth/authHelper';
import { getAuthor } from '../apiService/userApi';
import { closeErrorPopUp, closePopUp, openErrorPopUp, openPopUp } from '../Actions';
const SingleRecipe = () => {
    const dispatch = useDispatch()
    const recipeId = useSelector(state => state.singleRecipe)
    const [authorId, setAuthorId] = useState()
    const [recipeInfo, setRecipeInfo] = useState({ ingredients: [] })
    const onStarClick = (grade) => {
        let data = {
            user: authHelper.isAuthentcated().user._id,
            grade: grade
        }
        updateRecipeStar(recipeInfo._id, data).then(res => {
            if (res.message) {
                dispatch(openPopUp("Successfuly Voted!"))
                setTimeout(() => {
                    dispatch(closePopUp())
                }, 3000);
            } else {
                dispatch(openErrorPopUp("You Already Voted!"))
                setTimeout(() => {
                    dispatch(closeErrorPopUp())
                }, 3000);
            }
        }).catch(err => console.log(err))
    }

    useEffect(async () => {
        await getSignelRecipe(recipeId).then(result => {
            setAuthorId(result.author)
            getAuthor(result.author).then(res => {
                result.author = res;
                console.log(result)
                setRecipeInfo(result)
            }).catch(err => console.log(err));

        }).catch(err => console.log(err))
    }, [recipeId])

    return (
        <div className="singleRecipeWrapper view">
            <div className="upperPart view">
                <div className="singleRecipeLeftSide view">
                    <div className="image">
                        <img src={process.env.PUBLIC_URL + `/images/${recipeInfo.img}`} alt="recipeImg"></img>
                    </div>
                    <div className="ingredients">
                        <h2>Author: {recipeInfo.author} </h2>

                        <h3>List of ingredients:</h3>
                        <div className="ingredientTable single" >
                            <table>
                                <thead>
                                    <tr>
                                        <td>No</td>
                                        <td>Ingredient</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recipeInfo.ingredients.map((ingredient, id) => (
                                        <tr key={id}>
                                            <td>{id + 1}</td>
                                            <td>{ingredient}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div className="singleRecipeRightSide">
                    <div className="upper">
                        <div className="header">
                            <h2>{recipeInfo.name}</h2>
                            <div style={{ color: "green", fontSize: "25px", position: "relative", top: "2px" }}>
                                <Icon icon="bytesize:star" onClick={() => onStarClick(1)} style={{cursor:"pointer"}}/>
                                <Icon icon="bytesize:star" onClick={() => onStarClick(2)} style={{cursor:"pointer"}}/>
                                <Icon icon="bytesize:star" onClick={() => onStarClick(3)} style={{cursor:"pointer"}}/>
                                <Icon icon="bytesize:star" onClick={() => onStarClick(4)} style={{cursor:"pointer"}}/>
                                <Icon icon="bytesize:star" onClick={() => onStarClick(5)} style={{cursor:"pointer"}}/>
                            </div>
                        </div>
                        <div className="description">
                            <h3>Description:</h3>
                            <p>{recipeInfo.description}</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <h3>Categorie: {recipeInfo.categorie}</h3>
                        <div className="instructions">
                            <h3>Instructions:</h3>
                            <p>{recipeInfo.instructions}</p>
                        </div>
                    </div>
                    {authHelper.isAuthentcated().user._id.toString() === authorId && (<div className="edit">
                        <Link to="/editRecipe"><Icon icon="entypo:edit" /></Link>
                    </div>)}
                </div>

            </div>

            <RecipeLikeThis />

        </div>
    );
};

export default SingleRecipe;