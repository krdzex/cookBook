import React from 'react';
import { Route, Switch } from 'react-router';
import SinglePageRoute from './auth/SinglePageRoute';
import AddRecipe from './Components/AddRecipe';
import EditRecipe from './Components/EditRecipe';
import HomePage from './Components/HomePage';
import MyProfile from './Components/MyProfile';
import MyRecipes from './Components/MyRecipes';
import SingleRecipe from './Components/SingleRecipe';

const MainRouter = () => {
    return (
        <Switch>
            <Route exact path="/homePage" component={HomePage} />
            <SinglePageRoute  exact path="/singleRecipe" component={SingleRecipe} />
            <SinglePageRoute  exact path="/editRecipe" component={EditRecipe} />
            <Route exact path="/addRecipe" component={AddRecipe} />
            <Route exact path="/myRecipes" component={MyRecipes} />
            <Route exact path="/myProfile" component={MyProfile} />
        </Switch>
    );
};

export default MainRouter;