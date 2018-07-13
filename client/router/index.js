'use strict';

import React from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import Loadable from 'react-loadable';
// import lazyLoadComponent from 'lazy-load-component'
// const  Home = lazyLoadComponent(() => import('./containers/Home/index'))
import '../assets/style/index.less';

const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

export const Home = Loadable({
  loader: () => import('../containers/Home/index'),
  loading: () => (<div>loading</div>),
});

const Routers = props => (
  <Router {...props}>
    <Switch>

      <Route
        exact
        path="/"
        render={() => (
          <Redirect to="/home" />
        )}
      />
      <Route path="/home" component={Home} />
    </Switch>

  </Router>
);
export default Routers;
