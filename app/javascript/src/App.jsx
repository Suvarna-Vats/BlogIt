import React from "react";

import { Login, SignUp } from "components/Authentication";
import Blog from "components/Blog";
import Blogs from "components/Blogs";
import PageNotFound from "components/PageNotFound";
import { PrivateRoute } from "components/commons";
import EditPosts from "components/Edit";
import EditPost from "components/Edit/EditPost";
import MyBlogPosts from "components/MyBlogPosts";
import NewBlogPost from "components/New";
import { QueryClientProvider } from "react-query";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "routes";
import { CategoryProvider } from "src/contexts/category";
import { queryClient } from "src/query";
import { isLoggedIn } from "utils/auth";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CategoryProvider>
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact path={routes.root}>
            <Redirect
              to={isLoggedIn() ? routes.blogs.index : routes.auth.login}
            />
          </Route>
          <Route exact component={Login} path={routes.auth.login} />
          <Route exact component={SignUp} path={routes.auth.signup} />
          <PrivateRoute exact component={Blogs} path={routes.blogs.index} />
          <PrivateRoute exact component={EditPosts} path={routes.edit.index} />
          <PrivateRoute
            exact
            component={MyBlogPosts}
            path={routes.myBlogPosts.index}
          />
          <PrivateRoute exact component={NewBlogPost} path={routes.blogs.new} />
          <PrivateRoute
            exact
            component={EditPost}
            path={routes.blogs.editPath}
          />
          <PrivateRoute exact component={Blog} path={routes.blogs.showPath} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </CategoryProvider>
  </QueryClientProvider>
);

export default App;
