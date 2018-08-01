const Service = require('egg').Service;

class BaseService extends Service {
  constructor(ctx, model, columns = [], searchKeys = [], fiterData = [], pathId = '', isUser = false) {
    super(ctx);
    this.model = model;
    this.columns = columns;
    this.searchKeys = searchKeys;
    this.fiterData = fiterData;
    this.pathId = pathId;
    this.isUser = isUser;
  }

  queryFactory(keyword) {
    const searchQuery = {};
    this.searchKeys.filter(item => item !== '').map((item) => {
      searchQuery[item] = { $regex: keyword };
      return item;
    });
    if (this.searchKeys.length > 1) {
      return { $or: [searchQuery] };
    } else {
      return searchQuery;
    }
  }

  isAdministrator(roleName) {
    return roleName === 'Administrator';
  }

  /**
   *@param payload {object} 查询条件
   */
  async index(payload) {
    const id = this.ctx.state.user.data._id;
    const { currentPage, pageSize, isPaging, search, keyword } = payload;
    const user = await this.ctx.model.User.findOne({ _id: id }).populate('role').lean().exec();
    let auth = 0;
    if (this.isAdministrator(user.role.name)) {
      auth = 15;
    } else {
      const modules = user.role.modules.find(item => item.id === this.pathId);
      auth = modules ? modules.auth : 0;
    }

    let findQuery = { isable: 0 };
    if (this.isUser) {
      findQuery = Object.assign({}, findQuery, { createUser: id });
    }
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
      res = await this.model.find(findQuery).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 })
        .lean()
        .exec();
      count = await this.model.count(findQuery).exec();
    } else {
      res = await this.model.find(findQuery).sort({ createdAt: -1 }).lean().exec();
      count = await this.model.count(findQuery).exec();
    }
    return { columns: this.columns, auth, fiter: this.fiterData, count, list: res, pageSize: Number(pageSize), currentPage: Number(currentPage) };
  }

  /**
   *
   * @param {object} payload
   * @description 新增数据
   */
  async create(payload) {
    const id = this.ctx.state.user.data._id;
    Object.assign(payload, { createUser: id, updataUser: id });
    return this.model.create(payload);
  }

  /**
   *
   * @description 更新数据
   */
  async update(_id, payload) {
    const { ctx } = this;
    const id = ctx.state.user.data._id;
    const data = await this.find(_id);
    if (!data) {
      ctx.throw(404, 'role not found');
    }
    return this.model.findByIdAndUpdate(_id, Object.assign({}, payload, { updataUser: id }));
  }

  /**
   * @description  删除数据(更新状态)
   */
  async destroy(_id) {
    const { ctx } = this;
    const id = ctx.state.user.data._id;
    const data = await this.find(_id);
    if (!data) {
      ctx.throw(404, 'role not found');
    }

    return this.model.findByIdAndUpdate(_id, { isable: 1, updataUser: id });
  }

  async removes(values) {
    return this.model.remove({ _id: { $in: values } });
  }

  // 数据真删除
  async delete(_id) {
    const { ctx } = this;
    const data = await this.model.find({ _id });
    if (!data) {
      ctx.throw(404, 'user not found');
    }
    return this.model.findByIdAndRemove(_id);
  }

  /**
   *
   * @param {*} _id
   * @description  通过ID获取数据
   */
  async show(_id) {
    const data = await this.find(_id);
    if (!data) {
      this.ctx.throw(404, 'role not found');
    }
    return this.model.findById(_id);
  }

  async find(id) {
    return this.model.find({ _id: id, isable: 0 });
  }
}

module.exports = BaseService;

