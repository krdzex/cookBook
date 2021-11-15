import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addSingleRecipe } from '../Actions';
import { listLikeThisrecipe } from '../apiService/recipeApi';;

const RecipeLikeThis = () => {
    const recipeInfo = useSelector(state => state.singleRecipe)
    const [likeThisRecipe, setLikeThisRecipe] = useState([])
    useEffect(() => {
        listLikeThisrecipe(recipeInfo).then(res => {
            res = res.filter(res => res._id !== recipeInfo)
            setLikeThisRecipe(res)
        }).catch(err => console.log(err))
    }, [recipeInfo, recipeInfo.categorie])
    const dispatch = useDispatch()
    return (
        <div>
            {likeThisRecipe.length > 0 && (<div className="likeThisWrapper">
                <h2 style={{ margin: "0px" }}>More like this:</h2>
                <div className="listWrapper">

                    {likeThisRecipe.map((recipe, id) =>

                    (<Link to="singleRecipe" onClick={() => dispatch(addSingleRecipe(recipe._id))} key={id}><div className="recipeLikeThis" key={id}>
                        <div className="img">
                            <img src={process.env.PUBLIC_URL + `/images/${recipe.img}`} alt="recipeImg"></img>
                        </div>
                        <div className="name">
                            <p>{recipe.name}</p>
                        </div>
                        <div className="stars">
                            {recipe.ratings > 0 ? <div style={{ color: "green", fontSize: "25px", position: "relative", top: "2px", textAlign: "center" }}>
                                {recipe.ratings > 0 ? recipe.ratings >= 1 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                                {recipe.ratings > 1 ? recipe.ratings >= 2 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                                {recipe.ratings > 2 ? recipe.ratings >= 3 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                                {recipe.ratings > 3 ? recipe.ratings >= 4 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                                {recipe.ratings > 4 ? recipe.ratings >= 5 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                            </div> : <div style={{ color: "red", fontSize: "18px", position: "relative", top: "2px", textAlign: "center" }}>Less then 3 votes!</div>}
                        </div>
                    </div></Link>))}
                </div>
            </div>)}
        </div>
    );
};

export default RecipeLikeThis;