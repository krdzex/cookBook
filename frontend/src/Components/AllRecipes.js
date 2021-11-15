import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addSingleRecipe } from '../Actions';
import { listRecipe } from '../apiService/recipeApi';

const AllRecipes = () => {
    const [allRecipes, setAllRecipes] = useState([])
    const [allRecipesChanging, setAllRecipesChanging] = useState([])
    useEffect(async () => {
        await listRecipe().then(async res => {
            setAllRecipes(res)
            setAllRecipesChanging(res)
        }).catch(err => console.log(err))
    }, [])
    const dispatch = useDispatch()

    const onChange = (e) => {
        let allRecipesCopy = [];
        allRecipes.forEach(recipe => {
            if (recipe.name.includes(e.target.value)) {
                allRecipesCopy.push(recipe)
            }
        });
        setAllRecipesChanging(allRecipesCopy)
    }
    return (
        <div className="allRecipes">
            <div className="title">
                <h2>All recipes</h2>
                <input type="text" placeholder="Search" onChange={onChange} style={{ borderRadius: "10px", paddingLeft: "10px" }} />
            </div>
            {allRecipesChanging.map((recipe, id) => (
                <Link to="singleRecipe" key={id} onClick={() => dispatch(addSingleRecipe(recipe._id))}>
                    <div className="recipe">
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
                    </div></Link>
            ))}
        </div>
    );
};

export default AllRecipes;
