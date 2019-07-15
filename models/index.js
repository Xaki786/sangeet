// ======================================================
// IMPORTING ALL MODELS AND COMBINING THEM TO THE SINGLE OBJECT
// ======================================================
const songModel = require("./songModel");
module.exports = {
  Song: songModel
};
