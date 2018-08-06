'use strict';

const { Controller } = require('beidou-core');

class AppVersionController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createAppVersion = {
      appVersion: { type: 'string', required: true, allowEmpty: false },
    };
  }

  // 创建App版本号
  async create() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.createAppVersion);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.appVersion.create(payload);
    const msg = '创建成功';
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res, msg });
  }

  // 删除App版本号
  async destroy() {
    const { ctx, service } = this;
    // 校验参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.appVersion.destroy(id);
    // 设置响应内容和响应状态码
    const msg = '删除成功';
    ctx.helper.success({ ctx, res, msg });
  }

  // 修改App版本号
  async update() {
    const { ctx, service } = this;

    // 校验参数
    ctx.validate(this.createAppVersion);
    // 组装参数
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.appVersion.update(id, payload);
    // 设置响应内容和响应状态码
    const msg = '修改角色成功';
    ctx.helper.success({ ctx, res, msg });
  }

  // 获取App版本信息
  async show() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.appVersion.show(id);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 获取所有角色(分页/模糊)
  async index() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    const res = await service.appVersion.index(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  async findByAppVersion() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.appVersion.findByAppVersion(payload);
    // 设置响应内容和响应状态码
    const msg = '';
    ctx.helper.success({ ctx, res, msg });
  }
}


module.exports = AppVersionController;
