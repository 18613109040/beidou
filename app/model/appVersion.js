module.exports = (app) => {
  const mongoose = app.mongoose;

  const AppVersionSchema = new mongoose.Schema({
    appVersion: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updataUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isable: { type: Number, default: 0 },
  });

  return mongoose.model('AppVersion', AppVersionSchema);
};

