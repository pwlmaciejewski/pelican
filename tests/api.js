var api, sandbox;

sandbox = require('sandboxed-module');

api = sandbox.require('../routes/api.js', {
  requires: {
    '../models/playlist.js': require('./mocks/playlist.js')
  }
});

module.exports = {
  setUp: function(callback) {
    api.songs.reset();
    return callback();
  },
  postSong: function(test) {
    var req;
    req = {
      body: {
        url: 'https://www.youtube.com/watch?v=8ZcmTl_1ER8'
      }
    };
    return api.postSong(req, {
      send: function(txt) {
        var json;
        json = JSON.parse(txt);
        test.ok(json.ok);
        test.equal(api.songs.length, 1);
        test.equal(json.song.title, 'Epic sax guy 10 hours');
        return test.done();
      }
    });
  },
  postInvalidSong: function(test) {
    var req;
    req = {
      body: {
        url: 'http://youtube.com/watch?v=xxx'
      }
    };
    return api.postSong(req, {
      send: function(txt) {
        var json;
        json = JSON.parse(txt);
        test.ok(!json.ok);
        test.equal(api.songs.length, 0, 'Songs should not be added into collection');
        return test.done();
      }
    });
  },
  getNowPlaying: {
    emptyQueue: function(test) {
      return api.getNowPlaying({}, {
        send: function(txt) {
          var json;
          json = JSON.parse(txt);
          test.equal(json.song, false, 'Now playing for empty queue should be "false"');
          return test.done();
        }
      });
    },
    playing: function(test) {
      api.songs.add({
        ytId: '8ZcmTl_1ER8'
      });
      api.songs.add({
        ytId: 'WYGFNjEL7Jw'
      });
      return api.songs.fetch({
        complete: function() {
          return api.getNowPlaying({}, {
            send: function(txt) {
              var json;
              json = JSON.parse(txt);
              test.equal(json.song.ytId, '8ZcmTl_1ER8');
              return test.done();
            }
          });
        }
      });
    },
    uninitializedSong: function(test) {
      api.songs.add({
        ytId: '8ZcmTl_1ER8'
      });
      return api.getNowPlaying({}, {
        send: function(txt) {
          var json;
          json = JSON.parse(txt);
          test.ok(!json.song, 'There should not be actually playing song');
          return test.done();
        }
      });
    }
  }
};
