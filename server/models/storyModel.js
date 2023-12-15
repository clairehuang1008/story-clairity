const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  plot: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Story', storySchema);
