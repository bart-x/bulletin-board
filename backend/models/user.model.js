const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  authenticated: { type: Boolean, required: true },
  state: { type: String },
},
  { versionKey: false }
);

module.exports = mongoose.model('User', userSchema);
