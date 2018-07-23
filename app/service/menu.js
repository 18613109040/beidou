
'use strict';

module.exports = (app) => {
  class MenuService extends app.Service {
    constructor(ctx) {
      super(ctx);
    }

    // create======================================================================================================>
    async create(payload) {
      return this.ctx.model.Menu.create(payload);
    }

    getChildren(item, data) {
      const filterData = data.filter(it => it.parentId === item._id.toString());
      if (filterData.length > 0) {
        filterData.map((d) => {
          if (d.type === '0') {
            d.children = this.getChildren(d, data);
            return d;
          } else {
            return d;
          }
        });
      }
      return filterData;
    }

    // index======================================================================================================>
    async index(payload) {
      const res = await this.ctx.model.Menu.find().sort({ createdAt: -1 }).exec();
      const data = res.map((e, i) => {
        const jsonObject = Object.assign({}, e._doc);
        return jsonObject;
      });

      const roots = data.filter(item => item.parentId === 'root');
      roots.map((item) => {
        if (item.type === '0') {
          const children = this.getChildren(item, data);
          item.children = children;
          return item;
        } else {
          return item;
        }
      });
      return roots;
    //   return { count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) };
    }
  }
  return MenuService;
};

