const Song = require('../models/songs');
const Instrument = require('../models/instruments');

module.exports = {
  create,
  deleteComment,
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
    res.redirect(`/ysbpsongs/${req.params.id}`);
  } catch (err) {
    res.send(err);
  }
}

async function deleteComment(req, res) {
  try {
    const songDoc = await Song.findOne({
      'comment._id': req.params.id,
      'comment.user': req.user._id,
    });

    if (!songDoc) return res.redirect('/ysbpsongs');
    songDoc.comment.remove(req.params.id);
    await songDoc.save();
    res.redirect(`/ysbpsongs/${songDoc._id}`);
  } catch (err) {
    res.send(err);
  }
}