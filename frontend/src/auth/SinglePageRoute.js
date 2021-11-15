import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const SinglePageRoute = ({ component: Component, ...rest }) => {
    const singleRecipe = useSelector(state => state.singleRecipe)
    return (
        <Route
            {...rest} render={(props) =>
                typeof singleRecipe === "string" ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/homePage", state: { from: props.location } }} />)
            }
        />)
};

export default SinglePageRoute;