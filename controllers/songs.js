const Song = require('../models/songs');

module.exports = {
  index,
  create,
  show,
  edit,
  update,
  deleteSong,
};

async function index(req, res) {
  const songDoc = await Song.find();
  try {
    res.render('../views/songs/index.ejs', {
      songs: songDoc,
      title: 'Song',
    });
  } catch (err) {
    res.send(err);
  }
}

async function create(req, res) {
  try {
    const songDoc = await Song.create(req.body);
    res.redirect('/ysbpsongs');
  } catch (err) {
    console.log(err, '<- err: controller/songs/create()');
    return res.render('../views/songs/new.ejs');
  }
}
async function show(req, res) {
  try {
    const songDoc = await Song.findById(req.params.id);
    res.render('../views/songs/show.ejs', {
      songs: songDoc,
    });
  } catch (err) {
    res.send(err);
  }
}

async function deleteSong(req, res) {
  try {
    res.redirect('/ysbpsongs');
    const songToDel = await Song.findById(req.params.id);
    // console.log(songToDel, '<-songToDel: deleteSong()');
    songToDel.remove(req.params.id);
    await songToDel.save();
  } catch (err) {
    console.log(err, '<- err: controller/songs/deleteSong()');
    return res.render('../views/songs/show.ejs');
  }
}

async function edit(req, res) {
  try {
    const songDoc = await Song.findById(req.params.id);
    res.render('../views/songs/edit.ejs', {
      songs: songDoc,
    });
  } catch (err) {
    res.send(err);
  }
}

function update(req, res) {
  Song.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    function (err, SongDoc) {
      res.redirect(`/ysbpsongs/${req.params.id}`);
    }
  );
}