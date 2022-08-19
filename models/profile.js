const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    songs: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Songs'}
    }, {
      timestamps: true
    });

module.exports = mongoose.model('Profile', profileSchema);