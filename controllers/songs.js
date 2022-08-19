const Song = require('../models/song');
const Profile = require('../models/profile');

module.exports = {
  index,
  new: newSong,
  create,
  show,
  delete: deleteSong,
  edit: editSong,
  update: updateSong
}

async function index(req, res) {

  try {
    const songDocument = await Song.find({})
    res.render('songs/songs.ejs', {
      songs: songDocument
    });

  } catch(err){
    res.send(err)
  }
};

function newSong(req, res) {
  res.render('songs/new.ejs')
  console.log(newSong, '<- new Song')
};

async function create(req, res) {
  console.log(req.body)
  req.body.futurePerformance = !!req.body.futurePerformance;

  try {
    const songDocumentCreated = await Song.create(req.body)
    console.log(songDocumentCreated, 'song document created in db')
    res.redirect('/songs')
  
  } catch(err){
    res.send(err)
  }
}

async function deleteSong(req, res){

  try {
    const song = await Song.findByIdAndRemove(req.params.id);
    
    res.redirect('/songs');

  } catch(err) {
    res.send(err)
  }
}

async function show(req, res){
  console.log(req.params.id, 'req.params.id')

  try {
    const songDocument = await Song.findById(req.params.id)
    console.log(songDocument, '<- songDocument')

    sortDateDescending = songDocument.songRehearsal.sort((a, b) => b.createdAt - a.createdAt);
    
    res.render('songs/show', {
      song: songDocument,
        
    })

  } catch(err){
      res.send(err)
  }
}

async function editSong(req, res){

  try {
    const songDocument = await Song.findById(req.params.id, req.body)
    
    res.render('songs/edit', {
        song: songDocument
      })

  } catch(err){
      res.send(err);
  }
};

async function updateSong(req, res){
    
  try {
    const songDocument = await Song.findByIdAndUpdate(req.params.id, req.body)

    res.redirect(`/songs/${songDocument._id}`)

  } catch(err){
    res.send(err)
  }
}