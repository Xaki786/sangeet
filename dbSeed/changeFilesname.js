const FP = require("filepath");
var fs = require("fs");
module.exports = (file, song) => {
  // ============================================
  // CONVERT ALL EMPTY SPACES TO HYPHENS AND FILE A NEW NAME
  // ============================================
  //set a reference to the old file name
  const oldFileName = file;
  // -----------------------------------------
  //set a reference to the new file name
  // -----------------------------------------
  //  CONVERT EMPTY SPACES TO HYPHENS
  // -----------------------------------------
  let newFileName = song.name.replace(/\s+/g, "-").toLowerCase() + ".mp3";
  // -----------------------------------------
  //set a reference to the folder structure that leads up to the current file, add a trailing slash
  // -----------------------------------------
  const fpFolder = FP.newPath() + "/public/music/";
  // -----------------------------------------
  //set a reference to the old file
  // -----------------------------------------
  const fpFile = "/public/music/" + FP.newPath(oldFileName);

  //build the final file paths
  const oldFilePath = fpFolder + oldFileName;
  //set a reference to the new file path
  const newFilePath = fpFolder + newFileName;
  //use the fs object's rename method to re-name the file
  fs.rename(oldFilePath, newFilePath, function(err) {
    if (err) {
      return next(err);
    }
  });
};
