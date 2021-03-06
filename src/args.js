const fs = require('fs');


const CACHE = '--cache';
const EMPTY_CACHE = '--empty-cache';
const OFFLINE = '--offline';
const SET_WITH_PATH = '--path';
const OPTIONS = new Set([CACHE, EMPTY_CACHE, OFFLINE, SET_WITH_PATH]);


/**
 * @param {Array<string>} arguments
 * @returns {Set<string>} parsed options
 */
function findOptions(args) {
  const providedOptions = new Set();
  for (let arg of args) {
    if (OPTIONS.has(arg)) {
      providedOptions.add(arg);
    }
  }
  return providedOptions;
}


/**
 * @param {string} path to image
 * @returns {boolean} if img is a PNG or Jpeg
 */
function isValidImage(path) {
  return ['.png', '.jpg'].includes(
      path.slice(-4).toLowerCase());
}


/**
 * @returns {string}
 */
function getOfflineFilepath() {
  /** @type {Array<string>} */
  const dataDir = `${__dirname}/../data/`;
  const cachedImgs = fs.readdirSync(dataDir).map(
      fname => dataDir + fname);
  if (cachedImgs.length === 0) {
    throw new Error(
        'You must have at least one image in the '
          + 'data/ directory to run in offline mode.')
  }
  const i = Math.round(cachedImgs.length * Math.random());
  return cachedImgs[i];
}


/**
 * @typedef ParsedArguments
 * @property subreddits {string[]}
 * @property options {Set<string>}
 * @property filepath {string}
 */


/**
 * @param {Array<string>} arguments provided to program
 * @returns {ParsedArguments} result of parsing arguments provided
 */
function parseArguments(args) {
  const opts = findOptions(args);
  const subreddits = args.filter(arg => !opts.has(arg));
  const noSubredditOpts = [EMPTY_CACHE, OFFLINE];

  let filepath;

  if (opts.size > 1) {
    throw new Error(
        'You cannot provide more than one of the following options '
          + `${CACHE}, ${EMPTY_CACHE}, and ${SET_WITH_PATH}`);
  }

  switch (true) {
    case opts.has(SET_WITH_PATH) && subreddits.length !== 1:
      throw new Error(
          `You must provide a path to an image file with the ${SET_WITH_PATH} option.`);

    case opts.has(SET_WITH_PATH) && !isValidImage(subreddits[0]):
      throw new Error(
          'You must provide a path to a .png or .jpg file.');

    case opts.has(SET_WITH_PATH):
      filepath = subreddits[0];
      break;

    case subreddits.length > 0 && noSubredditOpts.some(opt => opts.has(opt)):
      throw new Error(
          'You cannot provide any subreddits with the '
            + `${noSubredditOpts.find(opt => opts.has(opt))} option.`);

    case opts.has(OFFLINE):
      filepath = getOfflineFilepath();
      break;

    case subreddits.length == 0:
      throw new Error(
          'You must provide at least one subreddit.');
  }

  return { options: opts, subreddits, filepath };
}

module.exports = {
  CACHE,
  EMPTY_CACHE,
  SET_WITH_PATH,
  parseArguments,
}
