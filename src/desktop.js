const imageSize = require('image-size');
const wallpaper = require('wallpaper');
const fs = require('fs');


/**
 *
 * @param {string[]} argFilePaths array of paths to images to consider
 * @param {boolean} shouldDeleteSmallImages if true will delete images whose width are less than 1000px
 * @returns {string[]} paths to images left to delete if you opt out of caching the images
 */
module.exports = async function setDesktopImage(argFilePaths, shouldDeleteSmallImages = true) {
  const filepaths = [];
  for (let pathToFile of argFilePaths) {
    const { width } = imageSize(pathToFile);
    if (width < 1e3 && shouldDeleteSmallImages) {
      fs.unlinkSync(pathToFile);
    } else {
      filepaths.push(pathToFile)
    }
  }
  const index = Math.floor(Math.random() * filepaths.length);
  console.log(`${filepaths[index]} selected for background.\n`);
  await wallpaper.set(filepaths[index]);
  console.log('Background image set.\n');
  return filepaths;
}
