module.exports = (app) => {
  const mongoose = app.mongoose;

  const MenuSchema = new mongoose.Schema({
    menuNameCh: { type: String, required: true, unique: true },
    menuNameEn: { type: String, unique: true },
    parentId: { type: String, required: true },
    linkurl: { type: String, required: true },
    target: { type: Boolean, default: false },
    type: { type: String, required: true },
    moduleid: { type: String },
    hiden: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    upDate: { type: Date, default: Date.now },
  });

  return mongoose.model('Menu', MenuSchema);
};

