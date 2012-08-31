var fs = require('fs');

module.exports = function (options, callback) {
  // TEED - Garden
  if (options.uri === 'https://gdata.youtube.com/feeds/api/videos/KD1NTfTF21I?v=2&alt=json') {
    callback(null, { statusCode: 200 },
      fs.readFileSync('fixtures/youtubeResponses/teed.garden.json').toString());
  }
  // Amelie
  else if (options.uri === 'https://gdata.youtube.com/feeds/api/videos/WYGFNjEL7Jw?v=2&alt=json') {
    callback(null, { statusCode: 200 },
      fs.readFileSync('fixtures/youtubeResponses/amelie.json').toString());
  } 
  // Epic sax guy
  else if (options.uri === 'https://gdata.youtube.com/feeds/api/videos/8ZcmTl_1ER8?v=2&alt=json') {
    callback(null, { statusCode: 200 },
      fs.readFileSync('fixtures/youtubeResponses/saxguy.json').toString());
  } 
  else {
    callback(null, { statusCode: 400 },
      '<errors xmlns=\'http://schemas.google.com/g/2005\'><error><domain>GData</domain><code>InvalidRequestUriException</code><internalReason>Invalid id</internalReason></error></errors>');
  }
};