import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { View } from 'client/layout';
import routes from './routes';
import Layout from './layout';
import configureStore from './store';
// import storeLocalStorage from 'store';

import './index.less';

const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

export default class RouteView extends View {
  static defaultProps = {
    title: 'home',
    asset: 'main',
  };

  static async getStore({ ctx }) {
    // const result = await ctx.service.menu.index();
    const store = configureStore();
    // const token = storeLocalStorage.get('token');
    // console.dir(token);
    // store.dispatch((setMenu(result)));
    return store;
  }

  static getPartial({ store, ctx }) {
    const props = {};
    if (ctx && ctx.url) {
      props.location = ctx.url;
      props.context = {
        location: {
          pathname: ctx.pathname,
        },
      };
    }
    const html = (
      <Provider store={store}>
        <Router {...props}>
          <Layout>
            {routes}
          </Layout>
        </Router>
      </Provider>
    );

    return { html };
  }
}

/**
 * client scope, wrapped in __CLIENT__ detect block
 * only run in client side
 */
if (__CLIENT__) {
  const store = configureStore(window.__INITIAL_STATE__);
  const app = (
    <Provider store={store}>
      <Router>
        <Layout>
          {routes}
        </Layout>
      </Router>
    </Provider>
  );
  ReactDOM.hydrate(app, document.getElementById('container'));

  if (module.hot) {
    module.hot.accept((err) => { // 地址参数可以省去
      if (err) {
        console.error('Cannot apply hot update', err);
      }
      ReactDOM.render(app, document.getElementById('container'));
    });
  }
}
