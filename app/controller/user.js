'use strict';

const { Controller } = require('beidou-core');

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.UserCreateTransfer = {
      email: { type: 'email', required: true, allowEmpty: false },
      password: { type: 'password', required: true, allowEmpty: false, min: 2 },
      role: { type: 'string', required: true, allowEmpty: false },
    };
    this.UserUpdataTransfer = {
      email: { type: 'email', required: true, allowEmpty: false },
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

  // 更新用户
  async update() {
    const { ctx, service } = this;

    // 校验参数
    ctx.validate(this.UserUpdataTransfer);
    // 组装参数
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.user.update(id, payload);
    // 设置响应内容和响应状态码
    const msg = '修改用户成功';
    ctx.helper.success({ ctx, res, msg });
  }

  // 获取单个用户
  async show() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.user.show(id);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 获取所有用户(分页/模糊)
  async index() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    const res = await service.user.index(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 获取当前用户详情
  async detail() {
    const { ctx, service } = this;
    // 调用 Service 进行业务处理
    const res = await service.user.detail();
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserController;
