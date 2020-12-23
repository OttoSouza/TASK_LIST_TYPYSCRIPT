import React from "react";
import { Switch } from "react-router-dom";
import Home from "../pages/Home";
import SingIn from "../pages/SingIn";
import SingUp from "../pages/SingUp";
import Profile from "../pages/Profile";
import Route from "./PrivateRoute"
const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/signup" component={SingUp} />
      <Route path="/home" component={Home} isPrivate/>
      <Route path="/profile" component={Profile} isPrivate/>
    </Switch>
  );
};

export default Routes;
