'use strict';

const BaseService = require('./baseService');

class AppVersionService extends BaseService {
  constructor(ctx) {
    const columns = [{
      title: 'App版本号',
      dataIndex: 'appVersion',
      key: 'appVersion',
    }];
    const searchKeys = ['appVersion'];
    const fiterData = [];
    const pathId = '0-0-6';
    const isUser = true;
    super(ctx, ctx.model.AppVersion, columns, searchKeys, fiterData, pathId, isUser);
  }

  async findByAppVersion(payload) {
    const { appVersion } = payload;
    const version = await this.ctx.model.AppVersion.find({ appVersion });
    if (!version) {
      this.ctx.throw(404, 'role not found');
    }
    return this.ctx.model.AppVersion.find({ appVersion }).lean().exec();
  }
}

module.exports = AppVersionService;
