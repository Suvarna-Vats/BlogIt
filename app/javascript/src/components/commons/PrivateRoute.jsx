import React from "react";

import { Redirect, Route } from "react-router-dom";
import routes from "routes";
import { isLoggedIn } from "utils/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to={routes.auth.login} />
      )
    }
  />
);

export default PrivateRoute;
