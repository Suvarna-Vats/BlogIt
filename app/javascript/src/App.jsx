import React from "react";

import Blog from "components/Blog";
import NewBlogPost from "components/Blog/New";
import ShowBlogPost from "components/Blog/Show";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CategoryProvider } from "src/contexts/category";

const App = () => (
  <CategoryProvider>
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <Redirect to="/blogs" />
        </Route>
        <Route exact component={Blog} path="/blogs" />
        <Route exact component={NewBlogPost} path="/blogs/new" />
        <Route exact component={ShowBlogPost} path="/blogs/:slug" />
      </Switch>
    </Router>
  </CategoryProvider>
);

export default App;
