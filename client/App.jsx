'use strict';

import React from 'react';
import { BrowserRouter, StaticRouter, Link } from 'react-router-dom';
import { Switch,Route } from 'react-router'
import Home from './containers/Home'
import About from './containers/About'
import './assets/style/index.less'
const Router = __CLIENT__ ? BrowserRouter : StaticRouter;
const App = (props) => {
  return (
    <Router {...props}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  )
}
export default App;
