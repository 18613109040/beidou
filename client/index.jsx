

import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
const FastClick = require('fastclick')
const store = configureStore()
import App from './App'
export default class Index extends Component {

  static getPartial({ store,ctx}) {
    const html = (
      <Provider store={store}>
        <App location={ctx.req.url} context={{}}/>
      </Provider>
    );
    return { html };
  }
  render() {
    const { html, helper ,state} = this.props;
    console.dir(state)
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <link rel="stylesheet" href={helper.asset('index.css')} />
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
         
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__ = ${state}`,
            }}
          />
          <script  src={helper.asset('manifest.js')} />
          <script  src={helper.asset('index.js')} />
        </body>
      </html>
    );
  }
}

/**
 * client scope, wrapped in __CLIENT__ detect block
 * only run in client side
 */
if (__CLIENT__) {
  const store = configureStore(window.__INITIAL_STATE__);
  //解决移动端300毫秒延迟
  FastClick.attach(document.body)
  
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('container'));
  if (module.hot) {
    module.hot.accept('./App', () => {
      const NewTodoApp = require('./App').default;
      ReactDOM.render(
        <Provider store={store}>
          <NewTodoApp />
        </Provider>,
        document.getElementById('container')
      );
    });
  }
}
