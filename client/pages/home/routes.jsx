import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Home from './container/Home';
import Role from './container/Role';
import RoleList from './container/Role/list';

export default (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (
        <Redirect to="/home" />
      )}
    />
    <Route exact path="/home" component={Home} />
    <Route exact path="/role" component={RoleList} />
  </Switch>
);
