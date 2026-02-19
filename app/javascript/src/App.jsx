import React from "react";

import { Login, SignUp } from "components/Authentication";
import Blog from "components/Blog";
import Blogs from "components/Blogs";
import { PrivateRoute } from "components/commons";
import EditPosts from "components/Edit";
import EditPost from "components/Edit/EditPost";
import NewBlogPost from "components/New";
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
        <PrivateRoute exact component={Blogs} path="/blogs" />
        <PrivateRoute exact component={EditPosts} path="/edit" />
        <PrivateRoute exact component={NewBlogPost} path="/blogs/new" />
        <PrivateRoute exact component={EditPost} path="/blogs/:slug/edit" />
        <PrivateRoute exact component={Blog} path="/blogs/:slug" />
      </Switch>
    </Router>
  </CategoryProvider>
);

export default App;
