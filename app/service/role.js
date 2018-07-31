'use strict';

const BaseService = require('./baseService');

class RoleService extends BaseService {
  constructor(ctx) {
    const columns = [{
      title: '角色名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '描述',
      dataIndex: 'des',
      key: 'des',
    }];
    const searchKeys = ['name', 'des'];
    const fiterData = [];
    const appPath = 'role';
    const isUser = true;
    super(ctx, ctx.model.Role, columns, searchKeys, fiterData, appPath, isUser);
  }
}

module.exports = RoleService;
