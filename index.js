const { CACHE, parseArguments } = require('./src/args');
const scrapeSubredditsForImages = require('./src/scraper');
const fs = require('fs');


(async function main() {
  const {
    options,
    subreddits,
  } = parseArguments(process.argv.slice(2));

  console.log(`Scraping subreddits: ${subreddits.join(', ')}...`);

  const index = Math.floor(Math.random() * subreddits.length);
  const subreddit = subreddits[index];

  const filenames = await scrapeSubredditsForImages(subreddit);
  filenames.map(
    filename => (
      (!options.has(CACHE)) &&
        fs.unlinkSync(`${__dirname}/data/${filename}`)));
})().catch(console.log);
