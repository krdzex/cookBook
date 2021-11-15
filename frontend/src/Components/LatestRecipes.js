import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listRecipe } from '../apiService/recipeApi';
import { useDispatch } from 'react-redux';
import { addSingleRecipe } from '../Actions';
import { Icon } from '@iconify/react';


const LatestRecipes = () => {
    const dispatch = useDispatch()
    const [latestRecipe, setLatestRecipe] = useState([])
    useEffect(async () => {
        await listRecipe().then(async res => {
            await res.forEach(async recipe => {
                let allRatings = recipe.ratings.length
                recipe.ratings = recipe.ratings.reduce((a, b) => a + b, 0);
                if (recipe.ratings !== 0) {
                    recipe.ratings /= allRatings
                }
            });
            res.reverse();
            setLatestRecipe(res)
        }).catch(err => console.log(err))
    }, [])
    return (
        <div className="latest">
            <div className="title">
                <h2>Latest recipe</h2>
            </div>
            {latestRecipe.map((recipe, id) => (
                <Link to="singleRecipe" onClick={() => dispatch(addSingleRecipe(recipe._id))} key={id}><div className="recipe"  >
                    <div className="recipeHeader" >
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
                </div></Link>))}
        </div>
    );
};

export default LatestRecipes;