'use strict';

const { Controller } = require('beidou-core');

class TestController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false },
    };
  }

  // 创建角色
  async test() {
    const { service } = this;
    await service.test.index();
  }
}


module.exports = TestController;
