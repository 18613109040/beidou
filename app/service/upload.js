
const Service = require('egg').Service;

class UploadService extends Service {
  async create(payload) {
    return this.ctx.model.Attachment.create(payload);
  }
}

module.exports = UploadService;
