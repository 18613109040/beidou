module.exports = (app) => {
  const mongoose = app.mongoose;

  const MenuSchema = new mongoose.Schema({
    menuNameCh: { type: String, required: true, unique: true },
    menuNameEn: { type: String, required: true },
    parentId: { type: String, required: true },
    path: { type: String, required: true },
    target: { type: Boolean, default: false },
    type: { type: String, required: true },
    moduleid: { type: String },
    hiden: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    upDate: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isable: { type: Number, default: 0 },
  });

  return mongoose.model('Menu', MenuSchema);
};

