import React from "react";
import {
  Route,
  Redirect,
  Switch,
  HashRouter as Router
} from "react-router-dom";
import { connect } from "react-redux";
import Signin from "./pages/signin/signin";
import Home from "./pages/home/home";
import Signup from "./pages/signinup/signup";

import Profile from "./pages/profile/profile";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
const PublicRoutes = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        <Route exact path={"/signin"} component={Signin} />
        <Route exact path={"/signup"} component={Signup} />
        <RestrictedRoute
          exact
          path={"/profile/:username"}
          component={Profile}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute path="/" component={Home} isLoggedIn={isLoggedIn} />
      </Switch>
    </Router>
  );
};

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null
}))(PublicRoutes);
