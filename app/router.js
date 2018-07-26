'use strict';

// const c2k = require('koa-connect');
// const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  const { router, controller } = app;
  router.get('/api/role', app.jwt, controller.role.index);
  router.post('/api/role', app.jwt, controller.role.create);

  router.get('/api/menu', app.jwt, controller.menu.index);
  router.delete('/api/menu/:id', app.jwt, controller.menu.destroy);
  router.put('/api/menu/:id', app.jwt, controller.menu.update);
  router.post('/api/menu', app.jwt, controller.menu.create);


  router.get('login', '/login', controller.user.login);
  router.get('/', '/*', controller.index.index);
  // router.get('/api/*', function* (next) {
  //   yield c2k(proxy({
  //     target: this.app.config.hostapi,
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '' },
  //   }))(this, next);
  // });
  router.post('/api/user', app.jwt, controller.user.create);


  router.post('/api/user/access/login', controller.userAccess.login);
};
