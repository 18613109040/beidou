

import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Routers from './router/index';

const FastClick = require('fastclick');

export default class Index extends Component {
  static doctype = '<!DOCTYPE html>'

  static async getStore() {
    const store = configureStore();
    return store;
  }

  static getPartial({ store, ctx }) {
    const html = (
      <Provider store={store}>
        <Routers location={ctx.req.url} context={{}} />
      </Provider>
    );
    return { html };
  }

  render() {
    const { html, helper, state } = this.props;
    console.dir(helper);
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="react" />
          <meta content="telephone=no" name="format-detection" />
          <meta content="email=no" name="format-detection" />
          <meta name="screen-orientation" content="portrait" />
          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />
          <meta name="x5-orientation" content="portrait" />
          <meta name="x5-fullscreen" content="true" />
          <meta name="x5-page-mode" content="app" />
          <script dangerouslySetInnerHTML={{ __html: '!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=window;t["default"]=i.flex=function(e,t){var a=e||100,n=t||1,r=i.document,o=navigator.userAgent,d=o.match(/Android[\\S\\s]+AppleWebkit\\/(\\d{3})/i),l=o.match(/U3\\/((\\d+|\\.){5,})/i),c=l&&parseInt(l[1].split(".").join(""),10)>=80,p=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),s=i.devicePixelRatio||1;p||d&&d[1]>534||c||(s=1);var u=1/s,m=r.querySelector(\'meta[name="viewport"]\');m||(m=r.createElement("meta"),m.setAttribute("name","viewport"),r.head.appendChild(m)),m.setAttribute("content","width=device-width,user-scalable=no,initial-scale="+u+",maximum-scale="+u+",minimum-scale="+u),r.documentElement.style.fontSize=a/2*s*n+"px"},e.exports=t["default"]}]);\n' +
          'flex(100, 1);' }}
          />
          <link rel="stylesheet" href={helper.asset('index.css')} />
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__ = ${state}`,
            }}
          />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset('index.js')} />
        </body>
      </html>
    );
  }
}


if (__CLIENT__) {
  const store = configureStore(window.__INITIAL_STATE__);
  // 解决移动端300毫秒延迟
  FastClick.attach(document.body);
  ReactDOM.hydrate(
    <Provider store={store}>
      <Routers />
    </Provider>, document.getElementById('container'));
  if (module.hot) {
    module.hot.accept('./router', () => {
      const NewTodoApp = require('./router').default;
      ReactDOM.hydrate(
        <Provider store={store}>
          <NewTodoApp />
        </Provider>,
        document.getElementById('container')
      );
    });
  }
}
