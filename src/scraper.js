const request = require('request');
const axios = require('axios');
const { Parser } = require('htmlparser2');
const fs = require('fs');


/**
 * @param {string} subreddit to get images from
 * @returns {Promise<string[]>} names of images scraped from Reddit
 */
module.exports = async function scrapeSubredditsForImages(subreddit) {
  const { data } = await axios.get(
    `https://old.reddit.com/r/${subreddit}`);
  const imgUrls = [];
  const parser = new Parser({
    onopentag(name, attr) {
      if (
        name === 'div' &&
        attr.class &&
        attr.class.indexOf(' thing') !== -1 &&
        attr.class.indexOf('link ') !== -1 &&
        attr['data-url'] &&
        (attr['data-url'].slice(-4) === '.jpg' ||
          attr['data-url'].slice(-4) === '.png')
      ) {
        imgUrls.push(attr['data-url']);
      }
    },
  }, { decodeEntities: true });

  parser.write(data);
  parser.end();

  if (!imgUrls.length) {
    throw new Error(
      'No images to use for background.');
  }

  return Promise.all(
    imgUrls.map((url) => {
      const imgName = url.slice(0, -4).split('/').slice(-1)[0];
      const extension = url.slice(-4);
      const filename = `${imgName}${extension}`;
      return new Promise(
        resolve =>
          request.get({ url, encoding: null })
            .pipe(fs.createWriteStream(`${__dirname}/../data/${filename}`))
            .on('close', () => resolve(filename)))
    }));
}
