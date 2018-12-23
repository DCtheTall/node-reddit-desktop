const { CACHE, parseArguments } = require('./src/args');
const scrapeSubredditsForImages = require('./src/scraper');
const setDesktopImage = require('./src/desktop');
const fs = require('fs');


(async function main() {
  const {
    options,
    subreddits,
    filepath,
  } = parseArguments(process.argv.slice(2));

  if (filepath) {
    console.log('Setting desktop image from path...\n');
    await setDesktopImage([filepath]);
    return;
  }

  console.log(
      `Picking random sample from subreddits: ${subreddits.join(', ')}...`);
  const index = Math.floor(Math.random() * subreddits.length);
  const subreddit = subreddits[index];
  console.log(`${subreddit} chosen.\n`)

  const existingFiles = new Set(...fs.readdirSync(`${__dirname}/data`));
  let imgNames = await scrapeSubredditsForImages(subreddit);
  imgNames = await setDesktopImage(
      imgNames.map(fname => `${__dirname}/data/${fname}`));
  if (!options.has(CACHE)) {
    console.log('Deleting unused images...\n');
    imgNames.map(
        imgName => (
            ((!existingFiles.has(imgName)) &&
                fs.unlinkSync(`${__dirname}/data/${imgName}`))));
  }
})().then(() => console.log('Done.')).catch(console.log);
