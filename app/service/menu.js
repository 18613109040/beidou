
'use strict';

module.exports = (app) => {
  class MenuService extends app.Service {
    constructor(ctx) {
      super(ctx);
    }

    // create======================================================================================================>
    async create(payload) {
      const _id = this.ctx.state.user.data._id;
      Object.assign(payload, { user: _id });
      return this.ctx.model.Menu.create(payload);
    }

    getChildren(item, data) {
      const filterData = data.filter(it => it.parentId === item._id.toString());
      if (filterData.length > 0) {
        filterData.map((d, index) => {
          if (d.type === '0') {
            filterData[index].children = this.getChildren(filterData[index], data);
            return d;
          } else {
            return d;
          }
        });
      }
      return filterData;
    }

    // index======================================================================================================>
    async index() {
      // ctx.state.user 可以提取到JWT编码的data
      let _id = '';
      if (this.ctx.state && this.ctx.state.user) {
        _id = this.ctx.state.user.data._id;
      }
      const res = await this.ctx.model.Menu.find({ deleted: false, user: _id }).sort({ createdAt: -1 }).exec();
      const data = res.map((e) => {
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
    }

    // update======================================================================================================>
    async update(_id, payload) {
      const { ctx } = this;
      const menu = await ctx.service.menu.find(_id);
      if (!menu) {
        ctx.throw(404, '没有发现该菜单');
      }
      return ctx.model.Menu.findByIdAndUpdate(_id, payload);
    }

    async deleted(_id) {
      const { ctx } = this;

      return ctx.model.Menu.findByIdAndUpdate(_id, { deleted: true });
    }

    // destroy======================================================================================================>
    async destroy(_id) {
      const { ctx } = this;
      const menu = await ctx.service.menu.find(_id);
      if (!menu) {
        ctx.throw(404, '没有发现该菜单');
      }
      return ctx.model.Menu.findByIdAndRemove(_id);
    }

    // Commons======================================================================================================>
    async find(id) {
      return this.ctx.model.Menu.findById(id);
    }
  }

  return MenuService;
};

