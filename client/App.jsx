'use strict';

import React from 'react';
import { BrowserRouter, StaticRouter, Route, Link } from 'react-router-dom';
import Home from './containers/Home'
import About from './containers/About'
const Router = __CLIENT__ ? BrowserRouter : StaticRouter;
const App = (props) => {
  console.dir(props)
  return (
    <Router {...props}>
      <div className="test">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </div>
  </Router>
  )
}
export default App;
