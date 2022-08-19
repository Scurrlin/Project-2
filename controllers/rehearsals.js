const Song = require('../models/song');

module.exports = {
    create
};

async function create(req, res){
  console.log(req.body, '<- form contents')
  console.log(req.params.id, '<- song id')
  
  try {
    const songDocument = await Song.findById(req.params.id)
    console.log(songDocument, '<- songDocument')

    songDocument.songRehearsal.push(req.body);
    songDocument.save(function(err){
      res.redirect(`/songs/${req.params.id}`)
    })

  } catch(err){
    res.send(err)
  }
};
