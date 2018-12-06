const { parseArguments } = require('./src/args');
const scrapeSubredditsForImages = require('./src/scraper');


(async function main() {
  const {
    options,
    subreddits,
  } = parseArguments(process.argv.slice(2));

  console.log(`Scraping subreddits: ${subreddits.join(', ')}...`);

  const index = Math.floor(Math.random() * subreddits.length);
  const subreddit = subreddits[index];

  const filenames = await scrapeSubredditsForImages(subreddit);
})().catch(console.log);
