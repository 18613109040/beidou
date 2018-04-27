'use strict';

const { Controller } = require('beidou-core');
const proxy = require('koa-proxy');
class IndexController extends Controller {
  async route() {
    const { ctx } = this;
    await ctx.render('index');
  }
  async proxyapi(){
    console.log("++++++++++++___")

  }
}

module.exports = IndexController;
