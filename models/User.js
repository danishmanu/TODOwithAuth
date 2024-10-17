const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  token:{ type: String, required: true, unique: true },
  tasks: [{
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
