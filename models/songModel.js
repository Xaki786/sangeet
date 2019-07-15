const mongoose = require("mongoose");
const songSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: "untitled song",
    required: true
  },
  length: {
    type: String,
    default: "0"
  },
  artists: [],
  genre: {
    type: String,
    default: "Desi Song"
  }
});

const songModel = mongoose.model("song", songSchema);
module.exports = songModel;
