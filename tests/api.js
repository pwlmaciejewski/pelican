var sandbox = require('sandboxed-module');
var fs = require('fs');
var api = sandbox.require('../routes/api.js', {
  requires: {
    '../models/songCollection.js': sandbox.require('../models/songCollection.js', {
      requires: {
        './song.js': sandbox.require('../models/song.js', {
          requires: {
            jquery: {
              ajax: function (options) {
                // Epic sax guy
                if (options.url === 'https://gdata.youtube.com/feeds/api/videos/8ZcmTl_1ER8?v=2&alt=json') {
                  options.success(JSON.parse(fs.readFileSync('fixtures/youtubeResponses/saxguy.json').toString()));
                } 
                else {
                  options.error({
                    status: 400,
                    responseTest: '<errors xmlns=\'http://schemas.google.com/g/2005\'><error><domain>GData</domain><code>InvalidRequestUriException</code><internalReason>Invalid id</internalReason></error></errors>'
                  });
                }
              }
            }
          }
        })
      }
    })
  } 
});

exports.postSong = function (test) {
  var req = { body: { url: 'https://www.youtube.com/watch?v=8ZcmTl_1ER8' } };

  api.postSong(req, {
    send: function (txt) {
      var json = JSON.parse(txt);
      test.ok(json.ok);
      test.equal(api.songs.length, 1);
      test.equal(json.song.title, 'Epic sax guy 10 hours');
      test.done();
    }
  });
};