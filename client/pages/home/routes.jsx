import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './container/Home';
import Role from './container/Role';

export default (
  <Switch>
    <Route exact path="/home" component={Home} />
    <Route exact path="/role" component={Role} />
  </Switch>
);
