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
                // Amelie
                else if (options.url === 'https://gdata.youtube.com/feeds/api/videos/WYGFNjEL7Jw?v=2&alt=json') {
                  options.success(JSON.parse(fs.readFileSync('fixtures/youtubeResponses/amelie.json').toString()));
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

module.exports = {
  setUp: function (callback) {
    api.songs.reset();
    callback();
  },

  postSong: function (test) {
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
  },

  postInvalidSong: function (test) {
    var req = { body: { url: 'http://youtube.com/watch?v=xxx' } };
    api.postSong(req, {
      send: function (txt) {
        var json = JSON.parse(txt);
        test.ok(!json.ok);
        test.equal(api.songs.length, 0, 'Songs should not be added into collection');
        test.done();
      }
    });
  },

  getNowPlaying: {
    emptyQueue: function (test) {
      api.getNowPlaying({}, {
        send: function (txt) {
          var json = JSON.parse(txt);
          test.equal(json.song, false, 'Now playing for empty queue should be "false"');
          test.done();
        }
      });
    },

    playing: function (test) {
      api.songs.add({ ytId: '8ZcmTl_1ER8' });
      api.songs.add({ ytId: 'WYGFNjEL7Jw' });
      api.songs.fetch({
        complete: function () {
          api.getNowPlaying({}, {
            send: function (txt) {
              var json = JSON.parse(txt);
              test.equal(json.song.ytId, '8ZcmTl_1ER8');
              test.done();
            }
          });
        }
      });
    },

    uninitializedSong: function (test) {
      api.songs.add({ ytId: '8ZcmTl_1ER8' });
      api.getNowPlaying({}, {
        send: function (txt) {
          var json = JSON.parse(txt);
          test.ok(!json.song, 'There should not be actually playing song');
          test.done();
        }
      });
    }
  }
};