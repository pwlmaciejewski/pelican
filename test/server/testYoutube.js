(function() {
  var buster, fs, youtube;

  buster = require('buster');

  youtube = require('../../lib/youtube');

  fs = require('fs');

  buster.testCase('youtube', {
    'getters': {
      setUp: function() {
        return this.song = JSON.parse(fs.readFileSync(__dirname + '/fixture/youtubeResponse.json').toString());
      },
      'test getSongUrl': function() {
        return assert.equals(youtube.getSongUrl(this.song), 'https://www.youtube.com/watch?v=WYGFNjEL7Jw&feature=youtube_gdata');
      },
      'test getSongTitle': function() {
        return assert.equals(youtube.getSongTitle(this.song), 'Amelie Soundtrack - Yann Tiersen (Original)');
      },
      'test getSongThumbnail': function() {
        return assert.equals(youtube.getSongThumbnail(this.song), 'http://i.ytimg.com/vi/WYGFNjEL7Jw/default.jpg');
      },
      'test getSongId': function() {
        return assert.equals(youtube.getSongId(this.song), 'WYGFNjEL7Jw');
      }
    },
    'fetchSong': {
      setUp: function() {
        var _this = this;

        this.fooSong = {
          foo: 'bar'
        };
        return this.requestMock = function(options, callback) {
          if (options == null) {
            options = {};
          }
          if (callback == null) {
            callback = function() {};
          }
          if (options.uri === youtube.getFetchUrl('foo')) {
            return callback(null, {
              statusCode: 200
            }, JSON.stringify(_this.fooSong));
          } else if (options.uri === youtube.getFetchUrl('bar')) {
            return callback(null, {
              statusCode: 404
            }, JSON.stringify({}));
          } else {
            return callback(new Error('some error'));
          }
        };
      },
      'test fetch success': function(done) {
        var _this = this;

        return youtube.fetchSong(this.requestMock, 'foo').then(function(song) {
          assert.equals(song, _this.fooSong);
          return done();
        });
      },
      'test fetch failure': function(done) {
        return youtube.fetchSong(this.requestMock, 'bar').then((function() {}), function(err) {
          refute.isNull(err);
          return done();
        });
      },
      'test fetch error': function(done) {
        return youtube.fetchSong(this.requestMock, 'xxx').then((function() {}), function(err) {
          refute.isNull(err);
          return done();
        });
      }
    }
  });

}).call(this);
