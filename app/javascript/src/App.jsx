import React from "react";

import Blog from "components/Blog";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/blogs" />} />
      <Route exact component={Blog} path="/blogs" />
    </Switch>
  </Router>
);

export default App;
