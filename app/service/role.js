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
    const fiterData = [{ key: 'name', value: ['2', '3', '4'] }];
    const appPath = 'role';
    super(ctx, ctx.model.Role, columns, searchKeys, fiterData, appPath);
  }
}

module.exports = RoleService;
