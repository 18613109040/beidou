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
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    const res = await service.test.index(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }
}


module.exports = TestController;
