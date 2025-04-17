const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user',
  },
});

module.exports = mongoose.model('User', userSchema);