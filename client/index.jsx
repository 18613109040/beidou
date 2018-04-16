

import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
const FastClick = require('fastclick')

import App from './App'
import {testAction} from './actions/home'
export default class Index extends Component {
  
  static async getStore({ ctx }) {
    const store = configureStore()
   
    const imadvertlist =  await ctx.service.home.findImadvertList();
    const imcategorylist =  await ctx.service.home.findImcategoryList();
    const imcampaginList =  await ctx.service.home.findImcampaginList();
    store.dispatch(testAction({
      imadvertlist:imadvertlist,
      imcategorylist:imcategorylist,
      imcampaginList:imcampaginList
    }))
    return store;
  }
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
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
          <meta name="apple-mobile-web-app-title" content="react"/>
          <meta content="telephone=no" name="format-detection"/>
          <meta content="email=no" name="format-detection"/>
          <meta name="screen-orientation" content="portrait"/>
          <meta name="full-screen" content="yes"/>
          <meta name="browsermode" content="application"/>
          <meta name="x5-orientation" content="portrait"/>
          <meta name="x5-fullscreen" content="true"/>
          <meta name="x5-page-mode" content="app"/>
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
  
  ReactDOM.hydrate(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('container'));
  if (module.hot) {
    module.hot.accept('./App', () => {
      const NewTodoApp = require('./App').default;
      ReactDOM.hydrate(
        <Provider store={store}>
          <NewTodoApp />
        </Provider>,
        document.getElementById('container')
      );
    });
  }
}
