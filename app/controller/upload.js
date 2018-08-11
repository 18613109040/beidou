const path = require('path');
const Controller = require('egg').Controller;

class UploadController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  // 上传单个文件
  async create() {
    const { ctx, service, app } = this;
    // 要通过 ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件：
    // 只支持上传一个文件。
    // 上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields。
    const stream = await ctx.getFileStream();
    // 所有表单字段都能通过 `stream.fields` 获取到
    const filename = path.basename(stream.filename); // 文件名称
    const extname = path.extname(stream.filename).toLowerCase(); // 文件扩展名称
    const uid = stream.fields.uid; // 获取上传的uid 主要ant
    const dirPath = stream.fields.dirPath;
    const fileType = stream.fields.name;
    const attachment = new this.ctx.model.Attachment();
    attachment.extname = extname;
    attachment.filename = filename;
    attachment.uid = uid;
    const dir = `igola-cms/${process.env.CURRENT_ENV}/${dirPath}/${fileType}/`;
    // 上传七牛
    // if (fileType === 'image') {
    await app.qiniu.putStream(stream, { filename, dir, uuid: true }).then((res) => {
      if (res.key) {
        attachment.url = res.url;
      } else {
        ctx.throw(404, '上传错误');
      }
    });
    // } else {
    //   await app.qiniu.putFile(stream, { filename, dir, uuid: true }).then((res) => {
    //     if (res.key) {
    //       attachment.url = res.url;
    //     } else {
    //       ctx.throw(404, '上传错误');
    //     }
    //   });
    // }
    const res = await service.upload.create(attachment);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }
}


module.exports = UploadController;
