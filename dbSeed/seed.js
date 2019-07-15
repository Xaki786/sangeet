const mm = require("music-metadata");
var fs = require("fs");
const { Song } = require("../models");
const changeFileNames = require("./changeFilesname");
// =============================================================
const musicFolder = "public/music/";
const fetchFiles = async () => {
  // -----------------------------------------
  //  READING ALL FILES METADATA PRESENT IN THE PUBLIC FOLDER
  // -----------------------------------------
  fs.readdir(musicFolder, (err, files) => {
    files.forEach(file => {
      const filePath = "public/music/" + file;
      // -----------------------------------------
      // CHECK IF THE FILE EXISTS IN THE SPECIFED PATH
      // -----------------------------------------
      fs.exists(filePath, async function(exists) {
        if (exists) {
          // -----------------------------------------
          // CREATE NEW OBJECT BY EXTRACTING METADATA FROM THE FILE
          // -----------------------------------------
          let song = {};
          mm.parseFile(filePath)
            .then(metadata => {
              song.length = Number.parseFloat(
                metadata.format.duration / 60
              ).toFixed(2);
              // -----------------------------------------
              // NAME OF THE FILE AND TITLE ARE DIFFERENT, IF TITLE IS UNDEFINED, THEN ASSIGN IT VALUE OF NAME
              // -----------------------------------------
              if (!metadata.common.title) {
                metadata.common.title = file;
              }
              song.name = metadata.common.title;
              song.artists = metadata.common.artists;
              // -----------------------------------------
              // CONVERT ALL EMPTY SPACES TO HYPHENS AND FILE A NEW NAME
              // -----------------------------------------
              changeFileNames(file, song);
            })
            .then(() => {
              // -----------------------------------------
              // IF ALL METADATA IS EXTRACTED SUCCESSFULLY, SAVE IT TO THE DATABASE
              // -----------------------------------------
              Song.create(song);
            })
            .catch(err => {
              console.error(err.message);
            });
        } else {
          const error = new Error("Page Not Found");
          error.status = 404;
          return next(error);
        }
      });
    });
  });
};
// =============================================================
module.exports = async () => {
  await fetchFiles();
};
