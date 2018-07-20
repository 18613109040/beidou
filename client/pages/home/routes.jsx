import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Home from './container/Home';
import RoleCreate from './container/Role/create';
import RoleList from './container/Role/list';
// import Loadable from 'react-loadable';

// export const Activity = Loadable({
//   loader: () => import('./container/Home'),
//   loading: () => (<div>loading</div>),
// });

export default (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (
        <Redirect to="/operation/home" />
      )}
    />
    <Route
      exact
      path="/operation"
      render={() => (
        <Redirect to="/operation/home" />
      )}
    />
    <Route exact path="/operation/home" component={Home} />


    <Route
      exact
      path="/activites"
      render={() => (
        <Redirect to="/activites/home" />
      )}
    />
    <Route exact path="/activites/home" component={Home} />


    <Route exact path="/system/manage/role" component={RoleList} />
    <Route exact path="/system/manage/role/create" component={RoleCreate} />
  </Switch>
);
