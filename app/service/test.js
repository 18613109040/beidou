
'use strict';

const BaseService = require('./baseService');
const Service = require('egg').Service;

class TestService extends BaseService {
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
    super(ctx, ctx.model.Role, columns, searchKeys, fiterData);
    console.dir('===========');
    // console.dir(ctx);
  }
}


module.exports = TestService;
