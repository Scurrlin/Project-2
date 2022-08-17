const Song = require("../models/song");
// import our Song object which can perform crud operations

module.exports = {
  new: newSong,
  create,
  index,
  show,
};

async function show(req, res) {
   
  try {
    // Song model is talking to the database to find the song with the id
    const songDocument = await Song.findById(req.params.id)
                                      .populate("artist")
                                      .exec()

    res.render("songs/show", {
      title: "Song Name",
      movie: songDocument,
    });

  } catch(err){
    res.send(err);
  }
};

  function index(req, res) {
  // List out the songs
  Song.find({}, function (err, allOfTheSongsInTheDatabase) {
    console.log(allOfTheSongsInTheDatabase, " <- all the songs");
    if (err) {
      res.send(
        "You have an error trying to find the songs, check the terminal"
      );
    }

    // response should be inside the callback,
    // because this is after we got a response from the db that we
    // found all the songs
    res.render("songss/index.ejs", {
      movies: allOfTheSongsInTheDatabase,
    }); // end of render
  });
}

function newSong(req, res) {
  res.render("songs/new.ejs");
}

function create(req, res) {
  // log out what the function needs
  console.log(req.body);
  // take teh contents of the form (req.body), and add it to our database
  req.body.futurePerformance = !!req.body.futurePerformance; // forces the value to a boolean
  // remove whitespace next to commas, wierd syntax is a regular expression (regex)
  // req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
  // // split if it's not an empty string
  // if (req.body.cast) req.body.cast = req.body.cast.split(',');  // <- returns an array
  // the callback function occurs after the database sends a respone
  // back to our express server, and its send either an error object,
  // or the document you created or were looking for as teh second argument
  Song.create(req.body, function (err, movieSongCreatedInTheDatabase) {
    if (err) {
      console.log(err, " <- err in the songs create controller");
      return res.render("songs/new.ejs");
    }

    console.log(songDocumentCreatedInTheDatabase, " <- song created in db");
    //normally redirect, but for testing
    // the response is always inside of the callback of the Song model crud operation
    // because we want to confirm with the database our action before we respond to the client
    // aka the browser
    res.redirect(`/songs/${songDocumentCreatedInTheDatabase._id}`);
  });
}