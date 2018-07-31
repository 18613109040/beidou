
'use strict';

module.exports = (app) => {
  class UserService extends app.Service {
    constructor(ctx) {
      super(ctx);
    }

    // create======================================================================================================>
    async create(payload) {
      const { ctx, service } = this;
      const role = await service.role.show(payload.role);
      if (!role) {
        ctx.throw(404, '角色没发现');
      }
      payload.password = await this.ctx.genHash(payload.password);
      return ctx.model.User.create(payload);
    }


    async detail() {
      const { ctx } = this;
      const id = ctx.state.user.data._id;
      console.dir(id);
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
  return UserService;
};

