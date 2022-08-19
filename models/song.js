const mongoose = require('mongoose');

const songRehearsalSchema = new mongoose.Schema({
  note: String,
});

const songSchema = new mongoose.Schema({
  name: String,
  artist: String,
  futurePerformance: Boolean,
  songRehearsal: [songRehearsalSchema],
});


module.exports =  mongoose.model('Song', songSchema);