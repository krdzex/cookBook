import React from 'react';
import { Switch } from 'react-router';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Main from './Main';
import PrivateRoute from "./auth/PrivateRoute";
import BlockedRoute from "./auth/BlockedRoute"

const SubRouter = () => {
    return (
        <Switch>
            <BlockedRoute exact path="/signIn" component={SignIn} />
            <BlockedRoute exact path="/signUp" component={SignUp} />
            <PrivateRoute component={Main} />
        </Switch>
    );
};

export default SubRouter;