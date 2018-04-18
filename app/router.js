'use strict';
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/*', controller.index.route);
  // router.get('/api(/.+)?', controller.index.get);
};
