// ======================================================
// GLOBAL ERROR HANDLING FOR TRY CATCH IS ADDED THROUGH EXPRESS-PROMISE-ROUTER
// ======================================================
const router = require("express-promise-router")({ margeParams: true });
// ======================================================
// IMPORTING SONGS CONTROLLERS
// ======================================================
const {
  getSongs,
  createSong,
  getOneSong,
  updateSong,
  deleteSong,
  playMusic
} = require("../controllers").songsController;
// ===============================================================
// ----------------------------------------
// @route   /api/songs/
// @desc    GET ALL SONGS => CREATE NEW SONG
// ----------------------------------------
router
  .route("/")
  .get(getSongs)
  .post(createSong);
// ----------------------------------------
// @route   /api/songs/music
// @desc    RETRIEVE SONG FROM THE PUBLIC DIRECTORY AND SERVE IT AS A STREAM
// ----------------------------------------
router.route("/music").get(playMusic);
// ----------------------------------------
// @route   /api/songs/:songId
// @desc    GET SINGLE SONG => UPDATE SONG => DELETE SONG
// ----------------------------------------
router
  .route("/:songId")
  .get(getOneSong)
  .put(updateSong)
  .delete(deleteSong);

// ===============================================================
module.exports = router;
