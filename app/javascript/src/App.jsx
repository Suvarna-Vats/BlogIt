import React from "react";

import Blog from "components/Blog";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Blog />} />
      <Route exact component={Blog} path="/blogs" />
    </Switch>
  </Router>
);

export default App;
