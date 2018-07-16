'use strict';

const { Controller } = require('beidou-core');

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.UserCreateTransfer = {
      email: { type: 'email', required: true, allowEmpty: false },
      password: { type: 'password', required: true, allowEmpty: false, min: 6 },
      role: { type: 'string', required: true, allowEmpty: false },
    };
  }

  async login() {
    const { ctx, app } = this;
    app.logger.debug('=========================================');
    await ctx.render('pages/login');
  }

  // 创建用户
  async create() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.UserCreateTransfer);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.user.create(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserController;
