const { parseArguments } = require('./src/args');


(function main() {
  const {
    options,
    subreddits,
  } = parseArguments(process.argv.slice(2));
})();
