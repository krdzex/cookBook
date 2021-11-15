import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../auth/authHelper';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest} render={(props) =>
                auth.isAuthentcated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/signIn", state: { from: props.location } }} />)
            }
        />)
};

export default PrivateRoute;