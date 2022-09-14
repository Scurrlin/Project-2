const Song= require('../models/songs');

module.exports = {
  create,
};

function extractVideoId(url) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  }
}

async function create(req, res) {
  try {
    const songDoc = await Song.findById(req.params.id);
    // console.log(req.body, '<- req.body: ctrl/videos/create()');
    // console.log(req.body.url, '<- req.body.url: ctrl/videos/create()');
    req.body.url = extractVideoId(req.body.url);
    songDoc.video.push(req.body);
    await songDoc.save();
    res.redirect(`/ysbpsongs/${req.params.id}`);
  } catch (err) {
    res.send(err);
  }
}