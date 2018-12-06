const CACHE = '--cache';
const EMPTY_CACHE = '--empty-cache';
const SET_DESKTOP = '--set-desktop';
const OPTIONS = new Set([CACHE, EMPTY_CACHE, SET_DESKTOP]);


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
 * @typedef ParsedArguments
 * @property subreddits {Array<string>}
 * @property options {Set<string>}
 */


/**
 * @param {Array<string>} arguments provided to program
 * @returns {ParsedArguments} result of parsing arguments provided
 */
function parseArguments(args) {
  const opts = findOptions(args);
  const subreddits = args.filter(arg => !opts.has(arg));

  if (opts.size > 1) {
    throw new Error(
      `You cannot provide more than one of the following options ${CACHE}, ${EMPTY_CACHE}, and ${SET_DESKTOP}`);
  }

  switch (true) {
    case subreddits.length > 0 && opts.has(EMPTY_CACHE):
      throw new Error(
        `You cannot provide any subreddits with the ${EMPTY_CACHE} option.`);

    case subreddits.length > 0 && opts.has(SET_DESKTOP):
      throw new Error(
        `You cannot provide any subreddits with the ${SET_DESKTOP} option.`);

    case subreddits.length == 0 && opts.has(CACHE):
      throw new Error(
        `You must provide at least one subreddit with the ${CACHE} option.`);

    case subreddits.length == 0 && opts.size == 0:
      throw new Error('You must provide at least one subreddit.');
  }

  return { options: opts, subreddits };
}

module.exports = {
  CACHE,
  EMPTY_CACHE,
  SET_DESKTOP,
  parseArguments,
}
