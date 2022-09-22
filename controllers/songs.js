const Song = require('../models/songs');
const Instrument = require('../models/instruments');

module.exports = {
  index,
  newSong,
  create,
  show,
  edit,
  update,
  deleteSong,
};

async function index(req, res) {
  const songDoc = await Song.find();
  const instDoc = await Instrument.find();
  try {
    res.render('../views/songs/index.ejs', {
      songs: songDoc,
      instruments: instDoc,
      title: 'YSBP Song',
    });
  } catch (err) {
    res.send(err);
  }
}

async function newSong(req, res) {
  try {
    const instDoc = await Instrument.find();
    res.render('../views/songs/new.ejs', {
      instruments: instDoc,
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
    const instDoc = await Instrument.find({ _id: songDoc.instrument });
    res.render('../views/songs/show.ejs', {
      songs: songDoc,
      instruments: instDoc,
    });
  } catch (err) {
    res.send(err);
  }
}

async function deleteSong(req, res) {
  try {
    res.redirect('/ysbpsongs');
    const songToDel = await Song.findById(req.params.id);
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
    const instDoc = await Instrument.find();
    res.render('../views/songs/edit.ejs', {
      instruments: instDoc,
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