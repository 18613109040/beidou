'use strict';

import React from 'react';
import { BrowserRouter, StaticRouter, Link} from 'react-router-dom';
import { Switch,Route ,Redirect} from 'react-router'
import Loadable from 'react-loadable';
import About from '../containers/About'
import Home from '../containers/Home/index'
// import lazyLoadComponent from 'lazy-load-component'
// const  Home = lazyLoadComponent(() => import('./containers/Home/index'))
import '../assets/style/index.less'
const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

export const Category = Loadable({
  loader: () => import('../containers/Category/index'),
  loading: () => (<div>loading</div>)
});

export const Cart = Loadable({
  loader: () => import('../containers/Cart/index'),
  loading: () => (<div>loading</div>)
});
export const User = Loadable({
  loader: () => import('../containers/User/index'),
  loading: () => (<div>loading</div>)
});
export const Activity = Loadable({
  loader: () => import('../containers/Activity/index'),
  loading: () => (<div>loading</div>)
});
const Routers = (props) => {
  return (
    <Router {...props}>
      <Switch>

        <Route exact path="/" render={() => (
          <Redirect to="/home"/>
        )}/>
        <Route  path="/activety" component={Activity}  />
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
