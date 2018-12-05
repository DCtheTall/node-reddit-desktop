const CACHE = '--cache';
const EMPTY_CACHE = '--empty-cache';
const UNDO = 'undo';
const OPTIONS = new Set([CACHE, EMPTY_CACHE, UNDO]);


/**
 * @typedef Options
 * @property CACHE {string}
 * @property EMPTY_CACHE {string}
 * @property UNDO {string}
 */


/**
 * @param {Array<string>} arguments
 * @returns {Options} parsed options
 */
function findOptions(args) {
  const options = {};
  for (let arg of args) {
    if (OPTIONS.has(arg)) {
      options[arg] = true;
    }
  }
  return options;
}


/**
 * @typedef ParsedArguments
 * @property subreddits {Array<string>}
 * @property options {Options}
 */


/**
 * @param {Array<string>} arguments provided to program
 * @returns {ParsedArguments} result of parsing arguments provided
 */
function parseArguments(args) {
  const options = findOptions(args);
  return {
    options,
    subreddits: [],
  };
}

module.exports = {
  CACHE,
  EMPTY_CACHE,
  UNDO,
  parseArguments,
}
