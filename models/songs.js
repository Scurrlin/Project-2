const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, maxlength: 500 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

const videoSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
});

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: String,
  details: { type: String, maxlength: 750 },
  ca: String,
  instrument: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instrument' }],
  comment: [commentSchema],
  video: [videoSchema],
});

module.exports = mongoose.model('Songs', songSchema);