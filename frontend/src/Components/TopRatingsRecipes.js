import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { getTopRatedRecipes } from '../apiService/recipeApi';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addSingleRecipe } from '../Actions';

const TopRatingsRecipes = () => {

    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        getTopRatedRecipes().then(res => {
            setRecipes(res)
        }).catch(err => console.log(err))
    }, [])
    const dispatch = useDispatch()
    return (
        <div className="topRatings">
            <div className="title">
                <h2>Top ratings</h2>
            </div>
            {recipes.map((recipe, id) => (
                <Link to="singleRecipe" onClick={() => dispatch(addSingleRecipe(recipe._id))} key={id}><div className="recipe" key={id}>
                    <div className="recipeHeader">
                        <h2>
                            {recipe.name}
                        </h2>
                        {recipe.ratings > 0 ? <div style={{ color: "green", fontSize: "25px", position: "relative", top: "2px" }}>
                            {recipe.ratings > 0 ? recipe.ratings >= 1 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                            {recipe.ratings > 1 ? recipe.ratings >= 2 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                            {recipe.ratings > 2 ? recipe.ratings >= 3 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                            {recipe.ratings > 3 ? recipe.ratings >= 4 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                            {recipe.ratings > 4 ? recipe.ratings >= 5 ? <Icon icon="bi:star-fill" /> : <Icon icon="bi:star-half" /> : <Icon icon="bi:star" />}
                        </div> : <div style={{ color: "red", fontSize: "18px", position: "relative", top: "2px" }}>Less then 3 votes!</div>}
                    </div>
                    <div className="recipeBottomSide">
                        <p>
                            {recipe.ingredients.toString()}
                        </p>
                        <p>
                            {recipe.categorie}
                        </p>
                    </div>
                </div></Link>))}
        </div>
    );
};

export default TopRatingsRecipes;