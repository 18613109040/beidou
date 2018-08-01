
'use strict';

const BaseService = require('./baseService');

class UserService extends BaseService {
  constructor(ctx) {
    const columns = [{
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
    }];
    const searchKeys = ['email'];
    const fiterData = [];
    const pathId = '3-2-1';
    const isUser = true;
    super(ctx, ctx.model.User, columns, searchKeys, fiterData, pathId, isUser);
  }

  // create======================================================================================================>
  async create(payload) {
    const { ctx, service } = this;
    const role = await service.role.show(payload.role);
    if (!role) {
      ctx.throw(404, '角色没发现');
    }
    payload.password = await this.ctx.genHash(payload.password);
    const id = ctx.state.user.data._id;
    return ctx.model.User.create(Object.assign(payload, { createUser: id, updataUser: id }));
  }

  async index(payload) {
    const { ctx } = this;
    const id = ctx.state.user.data._id;
    const { currentPage, pageSize, isPaging, search, keyword } = payload;
    const user = await this.ctx.model.User.findOne({ _id: id }).populate('role').lean().exec();
    let auth = 0;
    if (this.isAdministrator(user.role.name)) {
      auth = 15;
    } else {
      const modules = user.role.modules.find(item => item.id === this.pathId);
      auth = modules ? modules.auth : 0;
    }

    let findQuery = { isable: 0, createUser: id };
    if (search) {
      findQuery = Object.assign({}, findQuery, JSON.parse(search));
    }
    if (keyword) {
      findQuery = Object.assign({}, findQuery, this.queryFactory(keyword));
    }
    let res = [];
    let count = 0;
    const skip = ((Number(currentPage)) - 1) * Number(pageSize || 10);
    if (isPaging) {
      res = await ctx.model.User.find(findQuery).skip(skip).limit(Number(pageSize)).populate({ path: 'role', select: 'name' })
        .sort({ createdAt: -1 })
        .lean()
        .exec();
      count = await ctx.model.User.count(findQuery).exec();
    } else {
      res = await ctx.model.User.find(findQuery).sort({ createdAt: -1 }).lean().exec();
      count = await ctx.model.User.count(findQuery).exec();
    }
    return { columns: this.columns, auth, fiter: this.fiterData, count, list: res, pageSize: Number(pageSize), currentPage: Number(currentPage) };
  }

  async detail() {
    const { ctx } = this;
    const id = ctx.state.user.data._id;
    const user = await ctx.model.User.find({ _id: id });
    if (!user) {
      ctx.throw(404, '没有该用户');
    }
    return ctx.model.User.findOne({ _id: id }).populate('role').lean().exec();
  }

  // Commons======================================================================================================>
  async findByEmail(email) {
    return this.ctx.model.User.findOne({ email });
  }
}


module.exports = UserService;
