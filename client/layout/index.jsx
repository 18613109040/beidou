import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

/**
 * custom view template
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
export class View extends React.Component {
  static doctype = '<!DOCTYPE html>';

  render() {
    const { title, asset, html, state, helper } = this.props;
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
          <title>{title}</title>
          {/* <script dangerouslySetInnerHTML={{ __html: '!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=window;t["default"]=i.flex=function(e,t){var a=e||40,n=t||1,r=i.document,o=navigator.userAgent,d=o.match(/Android[\\S\\s]+AppleWebkit\\/(\\d{3})/i),l=o.match(/U3\\/((\\d+|\\.){5,})/i),c=l&&parseInt(l[1].split(".").join(""),10)>=80,p=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),s=i.devicePixelRatio||1;p||d&&d[1]>534||c||(s=1);var u=1/s,m=r.querySelector(\'meta[name="viewport"]\');m||(m=r.createElement("meta"),m.setAttribute("name","viewport"),r.head.appendChild(m)),m.setAttribute("content","width=device-width,user-scalable=no,initial-scale="+u+",maximum-scale="+u+",minimum-scale="+u),r.documentElement.style.fontSize=a/2*s*n+"px"},e.exports=t["default"]}]);\n' +
          'flex(40, 1);' }}
          /> */}
          <link
            rel="stylesheet"
            href="https://unpkg.com/antd@3.0.1/dist/antd.min.css"
          />
          <link rel="stylesheet" href={helper.asset(`${asset}.css`)} />
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__ = ${state}`,
            }}
          />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset(`${asset}.js`)} />
        </body>
      </html>
    );
  }
}

export const render = (App, store) => {
  if (__CLIENT__) {
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    ReactDOM.render(app, document.getElementById('container'));
  }
};
