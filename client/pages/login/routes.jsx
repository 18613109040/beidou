import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './container/Login';

export default (
  <Switch>
    <Route exact path="/login" component={Login} />
  </Switch>
);
