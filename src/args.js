const CACHE = '--cache';
const EMPTY_CACHE = '--empty-cache';
const UNDO = 'undo';
const OPTIONS = new Set([CACHE, EMPTY_CACHE, UNDO]);


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
  const numOptionsProvided =
    [...opts].reduce((acc, opt) => acc + opt, 0);
  const subreddits = args.filter(arg => !opts.has(arg));

  if (numOptionsProvided > 1) {
    throw new Error(
      `You cannot provide more than one of the following options ${CACHE}, ${EMPTY_CACHE}, and ${UNDO}`);
  }

  switch (true) {
    case subreddits.length > 0 && opts.has(EMPTY_CACHE):
      throw new Error(
        `You cannot provide any subreddits with the ${EMPTY_CACHE} option.`);

    case subreddits.length > 0 && opts.has(UNDO):
      throw new Error(
        `You cannot provide any subreddits with the ${UNDO} option.`);

    case subreddits.length == 0 && opts.has(CACHE):
      throw new Error(
        `You must provide at least one subreddit with the ${CACHE} option.`);

    case subreddits.length == 0 && opts.size == 0:
      throw new Error('You must provide at least one subreddit.');
  }

  return { options, subreddits };
}

module.exports = {
  CACHE,
  EMPTY_CACHE,
  UNDO,
  parseArguments,
}
