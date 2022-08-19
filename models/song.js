const mongoose = require('mongoose');

const songRehearsalSchema = new mongoose.Schema(
  {
  date: {
    type: Date,
    default: () => { return new Date() }
  },
  feedback: String
  },
  {
    timestamps: true,
  }
);

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
      type: String,
      required: true,
  },
  instrument: {
    type: String,
    required: true,
  },
 futurePerformance: {
    type: Boolean,
    required: false,
 },
  songRehearsal: [songRehearsalSchema],
});


module.exports =  mongoose.model('Song', songSchema);