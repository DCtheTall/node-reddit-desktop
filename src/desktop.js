const imageSize = require('image-size');
const wallpaper = require('wallpaper');


module.exports = async function setDesktopImage(argFilenames) {
  console.log('filtering images with minimum 1000px width requirement...\n');
  const filenames = [];
  const getPath = fname => `${__dirname}/../data/${fname}`
  for (let filename of argFilenames) {
    const pathToFile = getPath(filename);
    const { width } = imageSize(pathToFile);
    if (width < 1e3) {
      fs.unlinkSync(pathToFile);
    } else {
      filenames.push(filename)
    }
  }
  const index = Math.floor(Math.random() * filenames.length);
  console.log(`${filenames[index]} selected for background.\n`)
  const pathToFile = getPath(filenames[index]);
  await wallpaper.set(pathToFile);
  console.log('Background image set.\n');
  return filenames;
}
