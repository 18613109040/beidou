'use strict';

// const c2k = require('koa-connect');
// const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  const { router, controller } = app;
  router.get('/api/role', controller.role.index);
  router.get('/api/menu', controller.menu.index);

  router.get('login', '/login', controller.user.login);
  router.get('/', '/*', controller.index.index);
  // router.get('/api/*', function* (next) {
  //   yield c2k(proxy({
  //     target: this.app.config.hostapi,
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '' },
  //   }))(this, next);
  // });
  router.post('/api/user', controller.user.create);
  router.post('/api/role', controller.role.create);

  router.delete('/api/menu/:id', controller.menu.destroy);
  router.put('/api/menu/:id', controller.menu.update);
  router.post('/api/menu', controller.menu.create);

  router.post('/api/user/access/login', controller.userAccess.login);
};
