const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, minlength: 3 },
    password: { type: String, required: true, minlength: 8 },
    storyCreated: { type: Number, default: 0 },
    lastLogIn: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
