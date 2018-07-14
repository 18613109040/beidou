'use strict';

const { Controller } = require('beidou-core');

class UserController extends Controller {
  async login() {
    const { ctx, app } = this;
    app.logger.debug('=========================================');
    await ctx.render('pages/login');
  }
}

module.exports = UserController;
