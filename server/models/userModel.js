const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Story = require('./storyModel');

// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, minlength: 3 },
    password: { type: String, required: true, minlength: 8 },
    storiesCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Story',
      },
    ],
    lastLogIn: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
