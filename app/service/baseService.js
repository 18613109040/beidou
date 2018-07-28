const Service = require('egg').Service;

export class BaseService extends Service {
  constructor(model) {
    // this.model = model;
    console.dir('=====================================');
    model.find().lean().exec().then((res) => {
      console.dir(res);
    });
  }

  async index() {
    // console.dir(this.model);
    console.dir('++++++++++++');
  }
}

// module.exports = BaseService;
