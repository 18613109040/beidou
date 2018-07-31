module.exports = (app) => {
  const mongoose = app.mongoose;

  const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    des: { type: String },
    access: { type: String, default: 'user' },
    modules: { type: mongoose.Schema.Types.Mixed },
    isable: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updataUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });

  return mongoose.model('Role', RoleSchema);
};
