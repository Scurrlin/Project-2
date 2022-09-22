const Song = require('../models/songs');

module.exports = {
  create,
  deleteEntry,
};

async function create(req, res) {
  try {
    // console.log(req.user, ',<- req.user: ctrl/comments/create()');
    // console.log(req.body, '<- req.body: ctrl/comments/create()');
    const songDoc = await Song.findById(req.params.id);
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    songDoc.comment.push(req.body);
    await songDoc.save();
    res.redirect(`/ydbpsongs/${req.params.id}`);
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
    // console.log(req.params.id, '<- req.params.id: deleteEntry');
    // console.log(songDoc, '<- songDoc: deleteEntry');

    if (!songDoc) return res.redirect('/ysbpsongs');
    songDoc.comment.remove(req.params.id);
    await songDoc.save();
    res.redirect(`/ysbp/${songDoc._id}`);
  } catch (err) {
    res.send(err);
  }
}