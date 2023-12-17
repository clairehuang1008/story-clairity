const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  plotCards: [
    {
      type: { type: String },
      plot: { type: String },
    },
  ],
  imageUrl: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Story', storySchema);
