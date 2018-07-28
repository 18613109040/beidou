'use strict';

module.exports = (app) => {
  class RoleService extends app.Service {
  // create======================================================================================================>
    async create(payload) {
      const id = this.ctx.state.user.data._id;
      Object.assign(payload, { user: id });
      return this.ctx.model.Role.create(payload);
    }

    // destroy======================================================================================================>
    async destroy(_id) {
      const { ctx } = this;
      const role = await ctx.service.role.find(_id);
      if (!role) {
        ctx.throw(404, 'role not found');
      }

      return ctx.model.Role.findByIdAndUpdate(_id, { isable: 1 });
    }

    // update======================================================================================================>
    async update(_id, payload) {
      const { ctx } = this;
      const role = await ctx.service.role.find(_id);
      if (!role) {
        ctx.throw(404, 'role not found');
      }
      return ctx.model.Role.findByIdAndUpdate(_id, payload);
    }

    // show======================================================================================================>
    async show(_id) {
      const role = await this.ctx.service.role.find(_id);
      if (!role) {
        this.ctx.throw(404, 'role not found');
      }
      return this.ctx.model.Role.findById(_id);
    }

    // index======================================================================================================>
    async index(payload) {
      const _id = this.ctx.state.user.data._id;
      // Object.assign(payload, { user: _id });
      const { currentPage, pageSize, isPaging, search } = payload;
      let res = [];
      let count = 0;
      const skip = ((Number(currentPage)) - 1) * Number(pageSize || 10);
      if (isPaging) {
        if (search) {
          res = await this.ctx.model.Role.find({ name: { $regex: search }, isable: 0 }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 })
            .exec();
          count = res.length;
        } else {
          res = await this.ctx.model.Role.find({ isable: 0 }).skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 })
            .exec();
          count = await this.ctx.model.Role.count({ isable: 0 }).exec();
        }
      } else if (search) {
        res = await this.ctx.model.Role.find({ name: { $regex: search }, isable: 0 }).sort({ createdAt: -1 }).exec();
        count = res.length;
      } else {
        res = await this.ctx.model.Role.find({ isable: 0 }).sort({ createdAt: -1 }).exec();
        count = await this.ctx.model.Role.count({ isable: 0 }).exec();
      }
      // 整理数据源 -> Ant Design Pro
      const data = res.map((e, i) => {
        const jsonObject = Object.assign({}, e._doc);
        jsonObject.key = i;
        jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt);
        return jsonObject;
      });
      const columns = [{
        title: '角色名',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '描述',
        dataIndex: 'des',
        key: 'des',
      }];
      // const filter = [{ name: '角色名', key: 'name' }];
      return { columns, count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) };
    }


    // removes======================================================================================================>
    async removes(values) {
      return this.ctx.model.Role.remove({ _id: { $in: values } });
    }

    // Commons======================================================================================================>
    async find(id) {
      return this.ctx.model.Role.findById(id);
    }
  }
  return RoleService;
};

