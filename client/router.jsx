'use strict';

import React from 'react';
import { BrowserRouter, StaticRouter, Link} from 'react-router-dom';
import { Switch,Route ,Redirect} from 'react-router'
import App from './App'
import About from './containers/About'
import Home from './containers/Home/index'
import Category from './containers/Category/index'
import Cart from './containers/Cart/index'
import User from './containers/User/index'
// import lazyLoadComponent from 'lazy-load-component'
// const  Home = lazyLoadComponent(() => import('./containers/Home/index'))
import './assets/style/index.less'
const Router = __CLIENT__ ? BrowserRouter : StaticRouter;
const Routers = (props) => {
  return (
    <Router {...props}>
      <Switch>

        <Route exact path="/" render={() => (
            <Redirect to="/home"/>
        )}/>
        <Route  path="/about" component={About}  />
        <Route  path="/home"  component={Home} />
        <Route  path="/category"  component={Category} />
        <Route  path="/cart"  component={Cart} />
        <Route  path="/user"  component={User} />
      </Switch>

    </Router>
  )
}
export default Routers;
