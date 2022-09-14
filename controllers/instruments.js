const Song = require('../models/songs');
const Instrument = require('../models/instruments');

module.exports = {
  index,
  create,
  show,
};

async function index(req, res) {
  try {
    const songDoc = await Musician.find();
    const instDoc = await Instrument.find();
    const voiceDoc = await Instrument.find({ type: 'voice' });
    const stringDoc = await Instrument.find({ type: 'strings' });
    const brassDoc = await Instrument.find({ type: 'brass' });
    const woodwindDoc = await Instrument.find({ type: 'woodwinds' });
    const keyDoc = await Instrument.find({ type: 'keyboards' });
    const percDoc = await Instrument.find({ type: 'percussion' });
    const otherDoc = await Instrument.find({ type: 'others' });

    // console.log(instDoc, '<- instDoc: ctrl/inst/index()');
    // console.log(songDoc, '<- songDoc: ctrl/instr/index()');
    res.render('../views/instruments/index.ejs', {
      title: 'Instruments',
      instruments: instDoc,
      songs: songDoc,
      voice: voiceDoc,
      strings: stringDoc,
      brass: brassDoc,
      woodwinds: woodwindDoc,
      keyboards: keyDoc,
      percussion: percDoc,
      others: otherDoc,
    });
  } catch (err) {
    res.send(err);
  }
}

function create(req, res) {
  // console.log(req.body, '<- req.body: ctrl/inst/create()');
  Instrument.create(req.body, function (err, instDoc) {
    if (err) {
      console.log(err, '<- err: ctrl/inst/create()');
      return res.render('views/instruments/index.ejs');
    }
    console.log(instDoc, '<- instDoc: ctrl/inst/create()');
    res.redirect('/instruments');
  });
}

async function show(req, res) {
  try {
    // console.log(req.params.id, '<- req.params.id: ctrl/inst/show()');
    const instDoc = await Instrument.findById(req.params.id);
    const songDoc = await Song.find({
      instrument: { _id: req.params.id },
    });
    // console.log(songDoc, '<- songDoc: ctrl/inst/show()');
    res.render('../views/instruments/show.ejs', {
      instruments: instDoc,
      songs: songDoc,
    });
  } catch (err) {
    res.send(err);
  }
}
