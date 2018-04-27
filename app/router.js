'use strict';
const c2k = require('koa-connect');
const proxy = require('http-proxy-middleware');
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/vb/*', controller.index.route);
  router.get('/api/*', function* (next) {
    yield c2k(proxy({
      target: this.app.config.hostapi,
      changeOrigin: true,
      pathRewrite: {'^/api': ''}
    }))(this, next);
  })
};
