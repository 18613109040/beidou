/**
 * @param {}
 * lang  语言
 * appVersion app版本
 * jumpType 跳转类型 0 关闭 1网页链接 2APP内部跳转
 * link 跳转链接地址
 * internalJump 内部跳转界面 0 订单列表 1会员中心
 * fileType 文件类型  0 图片 1 视频
 * photo 图片地址
 * video 视频地址
 * name 开屏名称
 * duration 展示时间 单位秒
 * addedDate 上架时间 时间戳
 * dismountedDate   下架时间 时间戳
 * status 状态 0 显示 1隐藏
 */
module.exports = (app) => {
  const mongoose = app.mongoose;

  const MenuSchema = new mongoose.Schema({
    lang: { type: String, default: 'ZH', required: true },
    appVersion: { type: String, required: true },
    jumpType: { type: Number, default: 0 },
    link: { type: String },
    internalJump: { type: Number, default: 0 },
    fileType: { type: Number, default: 0 },
    photo: { type: String },
    video: { type: String },
    name: { type: String },
    duration: { type: Number },
    addedDate: { type: Date, required: true },
    dismountedDate: { type: Date, required: true },
    status: { type: Number },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updataUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isable: { type: Number, default: 0 },
  });

  return mongoose.model('AppLaunchAd', MenuSchema);
};

