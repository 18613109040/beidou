module.exports = (app) => {
  const mongoose = app.mongoose;

  const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    des: { type: String },
    access: { type: String, default: 'user' },
    modules: { type: mongoose.Schema.Types.Mixed },
    isable: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  return mongoose.model('Role', RoleSchema);
};
