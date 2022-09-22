const Song = require('../models/songs');
const Instrument = require('../models/instruments');

module.exports = {
  create,
  deleteEntry,
};

async function create(req, res) {
  try {
    const songDoc = await Song.findById(req.params.id);
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    songDoc.entry.push(req.body);
    await songDoc.save();
    res.redirect(`/ysbpsongs/${req.params.id}`);
  } catch (err) {
    res.send(err);
  }
}

async function deleteEntry(req, res) {
  try {
    const songDoc = await Song.findOne({
      'entry._id': req.params.id,
      'entry.user': req.user._id,
    });

    if (!songDoc) return res.redirect('/ysbpsongs');
    songDoc.entry.remove(req.params.id);
    await entryDoc.save();
    res.redirect(`/ysbpsongs/${songDoc._id}`);
  } catch (err) {
    res.send(err);
  }
}