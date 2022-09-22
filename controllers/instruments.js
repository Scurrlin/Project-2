const Song = require('../models/songs');
const Instrument = require('../models/instruments');

module.exports = {
  index,
  create,
  show,
};

async function index(req, res) {
  try {
    const songDoc = await Song.find();
    const instDoc = await Instrument.find();
    const vocalsDoc = await Instrument.find({ type: 'vocals' });
    const stringsDoc = await Instrument.find({ type: 'strings' });
    const brassDoc = await Instrument.find({ type: 'brass' });
    const woodwindsDoc = await Instrument.find({ type: 'woodwinds' });
    const keyboardsDoc = await Instrument.find({ type: 'keyboards' });
    const percussionDoc = await Instrument.find({ type: 'percussion' });
    const otherDoc = await Instrument.find({ type: 'other' });

    res.render('../views/instruments/index.ejs', {
      title: 'YSBP Instruments',
      instruments: instDoc,
      songs: songDoc,
      vocals: vocalsDoc,
      strings: stringsDoc,
      brass: brassDoc,
      woodwinds: woodwindsDoc,
      keyboards: keyboardsDoc,
      percussion: percussionDoc,
      other: otherDoc,
    });
  } catch (err) {
    res.send(err);
  }
}

function create(req, res) {
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
    const instDoc = await Instrument.findById(req.params.id);
    const songDoc = await Song.find({
      instrument: { _id: req.params.id },
    });
    res.render('../views/instruments/show.ejs', {
      instruments: instDoc,
      songs: songDoc,
    });
  } catch (err) {
    res.send(err);
  }
}