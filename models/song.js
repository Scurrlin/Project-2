const mongoose = require("mongoose");

// Creates the schema, which defines,
// what the documents (objects) in a mongodb collection (songs)
// will all look like

// Embed the Comments in the Movies
// One to many relationship
// One Song has many Comments, Comment belongs to a Song
const songSchema = new mongoose.Schema(
  {
    content: String,
    instrument: String,
    lenght: Number,
    bpm: Number,
    futurePerformance: Boolean,
    daysBeforePerformance: Number,
    sessionDuration: Number,
    totalSessions: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Song", songSchema);