import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import reducers from './reducers';
import Login from './container/Login';
import { View, render } from 'client/layout';
import './index.less';

export default class Page extends View {
  static defaultProps = {
    title: 'login',
    asset: 'login',
  };

  static getStore() {
    const store = configureStore(reducers);

    return store;
  }

  static getPartial({ store }) {
    const html = (
      <Provider store={store}>
        <Login />
      </Provider>
    );
    return { html };
  }
}
const store = configureStore(reducers, window.__INITIAL_STATE__);
render(Login, store);
if (module.hot) {
  module.hot.accept((err) => { // 地址参数可以省去
    if (err) {
      console.error('Cannot apply hot update', err);
    }
    render(Login, store);
  });
}
