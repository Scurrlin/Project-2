const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({

  date: Date,
  sessionCompleted: Boolean,
  userFeedback: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);