(function() {
  var fs;

  fs = require('fs');

  module.exports = {
    ajax: function(options) {
      if (options.url === 'https://gdata.youtube.com/feeds/api/videos/KD1NTfTF21I?v=2&alt=json') {
        return options.success(JSON.parse(fs.readFileSync('fixtures/youtubeResponses/teed.garden.json').toString()));
      } else if (options.url === 'https://gdata.youtube.com/feeds/api/videos/WYGFNjEL7Jw?v=2&alt=json') {
        return options.success(JSON.parse(fs.readFileSync('fixtures/youtubeResponses/amelie.json').toString()));
      } else if (options.url === 'https://gdata.youtube.com/feeds/api/videos/8ZcmTl_1ER8?v=2&alt=json') {
        return options.success(JSON.parse(fs.readFileSync('fixtures/youtubeResponses/saxguy.json').toString()));
      } else {
        return options.error({
          status: 400,
          responseTest: '<errors xmlns=\'http://schemas.google.com/g/2005\'><error><domain>GData</domain><code>InvalidRequestUriException</code><internalReason>Invalid id</internalReason></error></errors>'
        });
      }
    }
  };

}).call(this);
