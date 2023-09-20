const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: false,
    match: /^[a-zA-Z0-9]{0,50}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^[A-Za-z0-9_]+([\.-]?[A-Za-z0-9_]+)*@[A-Za-z0-9_]+([\.-]?[A-Za-z0-9_]+)*(\.[A-Za-z0-9_]{2,3})+$/,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
