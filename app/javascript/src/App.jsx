import React from "react";

import { Login, SignUp } from "components/Authentication";
import Blog from "components/Blog";
import NewBlogPost from "components/Blog/New";
import ShowBlogPost from "components/Blog/Show";
import { PrivateRoute } from "components/commons";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CategoryProvider } from "src/contexts/category";
import { isLoggedIn } from "utils/auth";

const App = () => (
  <CategoryProvider>
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <Redirect to={isLoggedIn() ? "/blogs" : "/login"} />
        </Route>
        <Route exact component={Login} path="/login" />
        <Route exact component={SignUp} path="/signup" />
        <PrivateRoute exact component={Blog} path="/blogs" />
        <PrivateRoute exact component={NewBlogPost} path="/blogs/new" />
        <PrivateRoute exact component={ShowBlogPost} path="/blogs/:slug" />
      </Switch>
    </Router>
  </CategoryProvider>
);

export default App;
