'use strict';

const { Controller } = require('beidou-core');

class MenuController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.MenuRule = {
      parentId: { type: 'string', required: true },
      menuNameCh: { type: 'string', required: true },
      menuNameEn: { type: 'string', required: false },
      linkurl: { type: 'string', required: false },
      target: { type: 'boolean', required: true },
      type: { type: 'string', required: true },
      moduleid: { type: 'object', required: false },
      hiden: { type: 'boolean', required: true },
    };
  }

  async index() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    const res = await service.menu.index(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 创建菜单
  async create() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.MenuRule);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.menu.create(payload);
    // 设置响应内容和响应状态码
    const msg = '新建成功';
    ctx.helper.success({ ctx, res, msg });
  }

  // 修改菜单
  async update() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.MenuRule);
    // 组装参数
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.menu.update(id, payload);
    const msg = '更新成功';
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res, msg });
  }

  // 删除单个菜单
  async destroy() {
    const { ctx, service } = this;
    // 校验参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.menu.destroy(id);
    const msg = '删除成功';
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res, msg });
    // ctx.status = 204;
  }
}

module.exports = MenuController;
