import React from 'react'
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router
} from "react-router-dom"
import Home from './containers/home'
import { connect } from 'react-redux'
import Loginscreen from './containers/loginscreen.js'

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)
const PublicRoutes = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={Loginscreen} />
        {/* <Route
          exact
          path={"/signin"}
          component={asyncComponent(() => import("./containers/Page/signin"))}
        />
        <Route
          exact
          path={"/signup"}
          component={asyncComponent(() => import("./containers/Page/signup"))}
        /> */}
        <RestrictedRoute
          path="/home"
          component={Home}
          isLoggedIn={isLoggedIn}
        />
      </Switch>
    </Router>
  )
}

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null
}))(PublicRoutes)
