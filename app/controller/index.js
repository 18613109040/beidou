'use strict';

const { Controller } = require('beidou-core');

class IndexController extends Controller {
  async route() {
    const { ctx } = this;
    await ctx.render('index',{name:111});
  }
}

module.exports = IndexController;
