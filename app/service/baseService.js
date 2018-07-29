const Service = require('egg').Service;

class BaseService extends Service {
  constructor(ctx, model, columns = [], searchKeys = [], fiterData = []) {
    super(ctx);
    // this.ctx = ctx;
    this.model = model;
    this.columns = columns;
    this.searchKeys = searchKeys;
    this.fiterData = fiterData;
    // console.dir(this.model);
    // console.dir('=====================================');

    // this.model.find().lean().exec().then((res) => {
    //   console.dir(res);
    // });
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

  async index(payload) {
    const id = this.ctx.state.user.data._id;
    const { currentPage, pageSize, isPaging, search, keyword } = payload;
    let findQuery = { isable: 0, user: id };
    if (search) {
      findQuery = Object.assign({}, findQuery, JSON.parse(search));
    }
    if (keyword) {
      findQuery = Object.assign({}, findQuery, this.queryFactory(keyword));
    }
    console.dir(findQuery);
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
    console.dir(res);
    return { columns: this.columns, count, list: res, pageSize: Number(pageSize), currentPage: Number(currentPage) };
    // // 整理数据源 -> Ant Design Pro
    // const data = res.map((e, i) => {
    //   const jsonObject = Object.assign({}, e._doc);
    //   jsonObject.key = i;
    //   jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt);
    //   return jsonObject;
    // });
    // const columns = [{
    //   title: '角色名',
    //   dataIndex: 'name',
    //   key: 'name',
    // }, {
    //   title: '描述',
    //   dataIndex: 'des',
    //   key: 'des',
    // }];
    // // const filter = [{ name: '角色名', key: 'name' }];
    // return { columns, count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) };
  }
}

module.exports = BaseService;

