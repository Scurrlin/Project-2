//import the model

const Song = require("../models/song");

module.exports = {
  create,
  delete: deleteComment
};

async function deleteComment(req, res){
  try {

    const songDocument = await Song.findOne({
      'comments._id': req.params.id,
      'comments.user': req.user._id
    });

    // no logged in user
    if(!songDocument) return res.redirect('/songs');

    songDocument.comments.remove(req.params.id);

    await songDocument.save();
    // redirect back to the page they came from!
    res.redirect(`/songs/${songDocument._id}`)


  } catch(err){
    res.send(err)
  }
}

function create(req, res) {
  console.log(req.user, " <- this is req.user")
  Song.findById(req.params.id, function (err, songDocument) {
   req.body.user = req.user._id;
   req.body.userName = req.user.name;
   req.body.userAvatar = req.user.avatar

    songDocument.comments.push(req.body);
    songDocument.save(function(err) {
      res.redirect(`/songs/${req.params.id}`);
    });
  });
}
