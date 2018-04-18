'use strict';

import React from 'react';
import { BrowserRouter, StaticRouter, Link } from 'react-router-dom';
import { Switch,Route } from 'react-router'
import App from './App'
import About from './containers/About'
import Home from './containers/Home/index'
import './assets/style/index.less'
const Router = __CLIENT__ ? BrowserRouter : StaticRouter;
const ServerRouters = (props) => {
  return (
    <Router {...props}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route  path="/home" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  )
}
export default ServerRouters;
