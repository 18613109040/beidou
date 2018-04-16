module.exports = (app) => {
  class HomeService extends app.Service {
    constructor(ctx) {
      super(ctx);
    }
    //获取首页轮播图
    async findImadvertList() {
      const { ctx } = this;
      const list = await ctx.curl(app.config.hostapi+"/imadvert/list",{
        dataType: 'json'
      })
      return list.data
    }
    //获取首页专场活动
    async findImcategoryList() {
      const { ctx } = this;
      const list = await ctx.curl(app.config.hostapi+"/imcategory/list",{
        dataType: 'json'
      })
      return list.data
    }
    //获取热门商品
    async findImcampaginList() {
      const { ctx } = this;
      const list = await ctx.curl(app.config.hostapi+"/imcampagin/list",{
        dataType: 'json'
      })
      return list.data
    }

    
  }

  return HomeService;
};
