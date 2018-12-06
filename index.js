const { CACHE, parseArguments } = require('./src/args');
const scrapeSubredditsForImages = require('./src/scraper');
const setDesktopImage = require('./src/desktop');
const fs = require('fs');


(async function main() {
  const {
    options,
    subreddits,
  } = parseArguments(process.argv.slice(2));

  console.log(`Picking random sample from subreddits: ${subreddits.join(', ')}...`);
  const index = Math.floor(Math.random() * subreddits.length);
  const subreddit = subreddits[index];
  console.log(`${subreddit} chosen.\n`)

  const existingFiles = new Set(...fs.readdirSync(`${__dirname}/data`));
  let filenames = await scrapeSubredditsForImages(subreddit);
  filenames = await setDesktopImage(filenames);
  if (!options.has(CACHE)) {
    console.log('Deleting unused images...\n');
    filenames.map(
      filename => (
       ((!existingFiles.has(filename)) &&
        fs.unlinkSync(`${__dirname}/data/${filename}`))));
  }
})().then(() => console.log('Done.')).catch(console.log);
