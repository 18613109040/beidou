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
}

module.exports = AppVersionService;
