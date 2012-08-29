var sandbox = require('sandboxed-module');
var api = sandbox.require('../routes/api.js', {
  requires: {
    '../models/songCollection.js': require('./mocks/songCollection.js')
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