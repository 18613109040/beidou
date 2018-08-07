'use strict';

// const c2k = require('koa-connect');
// const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  const { router, controller } = app;


  // router.get('/api/role', app.jwt, controller.role.index);
  // router.post('/api/role', app.jwt, controller.role.create);
  // router.delete('/api/role/:id', app.jwt, controller.role.destroy);
  router.resources('role', '/api/role', app.jwt, controller.role);

  router.resources('app-launch-ad', '/api/app-launch-ad', app.jwt, controller.appLaunchAd);

  router.get('/api/user/detail', app.jwt, controller.user.detail);
  router.resources('user', '/api/user', app.jwt, controller.user);

  router.get('/api/app-version/findByAppVersion', app.jwt, controller.appVersion.findByAppVersion);
  router.resources('app-version', '/api/app-version', app.jwt, controller.appVersion);

  // router.get('/api/user', app.jwt, controller.user.index);
  // router.post('/api/user', app.jwt, controller.user.create);

  router.get('/api/menu', app.jwt, controller.menu.index);
  router.delete('/api/menu/:id', app.jwt, controller.menu.destroy);
  router.put('/api/menu/:id', app.jwt, controller.menu.update);
  router.post('/api/menu', app.jwt, controller.menu.create);

  router.get('login', '/login', controller.user.login);
  router.get('/', '/*', controller.index.index);

  router.post('/api/upload', controller.upload.create);
  router.post('/api/upload/url', controller.upload.url);
  router.post('/api/uploads', controller.upload.multiple);
  router.delete('/api/upload/:id', controller.upload.destroy);
  // router.get('/api/*', function* (next) {
  //   yield c2k(proxy({
  //     target: this.app.config.hostapi,
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '' },
  //   }))(this, next);
  // });


  router.post('/api/user/access/login', controller.userAccess.login);
};
