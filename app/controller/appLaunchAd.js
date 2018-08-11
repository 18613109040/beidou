'use strict';

const { Controller } = require('beidou-core');

class AppLaunchAdController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      lang: { type: 'string', required: true },
      appVersion: { type: 'string', required: true },
      name: { type: 'string', required: true },
      duration: { type: 'number', required: true },
      addedDate: { type: 'string', required: true },
      dismountedDate: { type: 'string', required: true },
    };
  }

  // 创建开屏广告
  async create() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.createRule);
    // 组装参数
    const payload = ctx.request.body || {};

    // 调用 Service 进行业务处理

    const res = await service.appLaunchAd.create(payload);
    const msg = '新增成功';
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res, msg });
  }

  // 删除开屏广告
  async destroy() {
    const { ctx, service } = this;
    // 校验参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.appLaunchAd.delete(id);
    // 设置响应内容和响应状态码
    const msg = '删除成功';
    ctx.helper.success({ ctx, res, msg });
  }

  // 修改开屏广告
  async update() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.createRule);
    // 组装参数
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.appLaunchAd.update(id, payload);
    // 设置响应内容和响应状态码
    const msg = '修改成功';
    ctx.helper.success({ ctx, res, msg });
  }

  // 获取单个开屏广告
  async show() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.appLaunchAd.show(id);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 获取所有开屏广告(分页/模糊)
  async index() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    const res = await service.appLaunchAd.index(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }
}


module.exports = AppLaunchAdController;
