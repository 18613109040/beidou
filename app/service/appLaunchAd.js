'use strict';

const BaseService = require('./baseService');

class AppLaunchAdService extends BaseService {
  constructor(ctx) {
    const columns = [{
      title: '语言',
      dataIndex: 'lang',
      key: 'lang',
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'app 版本',
      dataIndex: 'appVersion',
      key: 'appVersion',
    }, {
      title: '跳转类型',
      dataIndex: 'jumpType',
      key: 'jumpType',
    }, {
      title: '展示时间',
      dataIndex: 'duration',
      key: 'duration',
    }, {
      title: '上架状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '上架时间',
      dataIndex: 'addedDate',
      key: 'addedDate',
    }, {
      title: '下架时间',
      dataIndex: 'dismountedDate',
      key: 'dismountedDate',
    }];

    const searchKeys = ['link'];
    const fiterData = [{ key: 'lang', name: '语言', value: ['ZH', 'EN'] }];
    const pathId = '0-0-0';

    super(ctx, ctx.model.AppLaunchAd, columns, searchKeys, fiterData, pathId);
  }

  getSearchQuery() {

  }

  formatListItem(list) {
    list.map((item) => {
      item.createdAt = this.ctx.helper.formatTime(item.createdAt);
      item.updatedAt = this.ctx.helper.formatTime(item.updatedAt);
      item.jumpType = item.jumpType === 0 ? '关闭' : item.jumpType === 1 ? '网页链接' : 'APP内部跳转';
      // item.status =
      return item;
    });
    return list;
  }
}

module.exports = AppLaunchAdService;
