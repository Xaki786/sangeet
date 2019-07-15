// ======================================================
// SONGS CONTROLLERS
// ======================================================
var fs = require("fs");
const { Song } = require("../../../models");
// ======================================================
module.exports = {
  // ======================================================
  // GLOBAL ERROR HANDLING FOR TRY CATCH IS ADDED THROUGH EXPRESS-PROMISE-ROUTER
  // ======================================================
  // @route   /api/songs/
  // @method  GET
  // @desc    GET ALL SONGS PRESENT IN THE DATABASE
  // ----------------------------------------
  getSongs: async (req, res, next) => {
    const dbSongs = await Song.find();
    if (!dbSongs) {
      const error = new Error("No songs found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({
      songs: dbSongs
    });
  },
  // ----------------------------------------
  // @route   /api/songs/
  // @method  POST
  // @desc    CREATE NEW SONG AND STORE IN THE DATABASE
  // ----------------------------------------
  createSong: async (req, res, next) => {
    const newSong = await Song.create(req.body);
    return res.status(200).json({
      song: newSong
    });
  },
  // ----------------------------------------
  // @route   /api/songs/:songId
  // @method  GET
  // @desc    GET ONE SONG FROM THE DB, SEARCH IT THROUGH SONG ID
  // ----------------------------------------
  getOneSong: async (req, res, next) => {
    const { songId } = req.params;
    const dbSong = await Song.findById(songId);
    if (!dbSong) {
      const error = new Error("Song not found");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json({
      url: `${req.baseUrl}/music/?name=${dbSong.name}`
    });
  },
  // ----------------------------------------
  // @route   /api/songs/:songId
  // @method  PUT
  // @desc    UPDATE SONG
  // ----------------------------------------
  updateSong: async (req, res, next) => {
    const { songId } = req.params;
    const editedSong = await Song.findByIdAndUpdate(songId, req.body, {
      new: true
    });
    return res.status(200).json({
      song: editedSong
    });
  },
  // ----------------------------------------
  // @route   /api/songs/:songId
  // @method  DELETE
  // @desc    DELETE SPECIFIC SONG BY ID
  // ----------------------------------------
  deleteSong: async (req, res, next) => {
    const { songId } = req.params;
    const dbSong = await Song.findById(songId);
    if (!dbSong) {
      const error = new Error("Song not found");
      error.status = 404;
      return next(error);
    }
    await Song.findByIdAndDelete(songId);
    return res.status(200).json({
      message: "Song successfully Deleted"
    });
  },
  // ----------------------------------------
  // @route   /api/songs/music/?name=songname
  // @method  GET
  // @desc    SEARCH SONG IN THE PUBLIC/MUSIC DIRECTORY BY NAME AND SEND IT'S STREAM
  // ----------------------------------------
  playMusic: async (req, res, next) => {
    const songName = req.query.name;
    // ----------------------------------------
    //  CONVERTING ALL SPACES TO THE HYPENS FOR BETTER COMPARISON
    // ----------------------------------------
    const file =
      "public/music/" + songName.replace(/\s+/g, "-").toLowerCase() + ".mp3";
    // ----------------------------------------
    //  CHECH IF FILE IS PRESENT IN THE DIRECTORY
    // ----------------------------------------
    fs.exists(file, async function(exists) {
      if (exists) {
        // ----------------------------------------
        // SET APPROPRIATE HEADERS
        // ----------------------------------------
        const stat = fs.statSync(file);
        res.writeHead(200, {
          "Content-Type": "audio/mp3",
          "Content-Length": stat.size
        });

        // ----------------------------------------
        // READ STREAM FROM FILE
        // ----------------------------------------
        const readStream = fs.createReadStream(file);
        // ----------------------------------------
        // SEND STREAM TO THE CLIENT
        // ----------------------------------------
        readStream.on("open", function() {
          // This just pipes the read stream to the response object (which goes to the client)
          readStream.pipe(res);
        });
        // ----------------------------------------
        // IF ERROR SENDING STREAM, SEND NOT FOUND RESPONSE
        // ----------------------------------------
        readStream.on("error", function(err) {
          return next(err);
        });
      } else {
        const err = new Error("Page not Found");
        err.status = 404;
        return next(err);
      }
    });
  }
};
