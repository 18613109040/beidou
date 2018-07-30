'use strict';

const BaseService = require('./baseService');

class AppLaunchAdService extends BaseService {
  constructor(ctx) {
    const columns = [{
      title: '语言',
      dataIndex: 'lang',
      key: 'lang',
    }, {
      title: '链接',
      dataIndex: 'link',
      key: 'link',
    }, {
      title: 'app 版本',
      dataIndex: 'version',
      key: 'version',
    }, {
      title: '是否跳转',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '展示时间',
      dataIndex: 'duration',
      key: 'duration',
    }, {
      title: '开始时间',
      dataIndex: 'startDate',
      key: 'startDate',
    }, {
      title: '结束时间',
      dataIndex: 'endDate',
      key: 'endDate',
    }];
    const searchKeys = ['link'];
    const fiterData = [{ key: 'lang', name: '语言', value: ['ZH', 'EN'] }];
    const appPath = 'app-launch-ad';
    super(ctx, ctx.model.AppLaunchAd, columns, searchKeys, fiterData, appPath);
  }
}

module.exports = AppLaunchAdService;
