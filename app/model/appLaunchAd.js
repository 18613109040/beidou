/**
 * @param {}
 * lang  语言
 * appVersion app版本
 */
module.exports = (app) => {
  const mongoose = app.mongoose;

  const MenuSchema = new mongoose.Schema({
    lang: { type: String, default: 'ZH' },
    name: { type: String, required: true },
    status: { type: String },
    photo: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String, default: false },
    link: { type: String },
    duration: { type: Number },
    type: { type: String, default: '' },
    version: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updataUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isable: { type: Number, default: 0 },
  });

  return mongoose.model('AppLaunchAd', MenuSchema);
};

