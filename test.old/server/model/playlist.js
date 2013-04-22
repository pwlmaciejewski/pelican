(function() {
  var Playlist;

  Playlist = require('../mock/playlist.js');

  module.exports = {
    setUp: function(callback) {
      this.playlist = new Playlist();
      this.playlist.add([
        {
          ytId: 'KD1NTfTF21I'
        }, {
          ytId: 'WYGFNjEL7Jw'
        }
      ]);
      return this.playlist.fetch({
        complete: function() {
          return callback();
        }
      });
    },
    emptyPlaylist: function(test) {
      var playlist;

      playlist = new Playlist();
      test.equal(playlist.nowPlaying(), false);
      return test.done();
    },
    nowPlaying: function(test) {
      test.equal(this.playlist.nowPlaying().get('title'), "Totally Enormous Extinct Dinosaurs - \"Garden\": SXSW 2011 Showcasing Artist");
      return test.done();
    },
    next: function(test) {
      this.playlist.next();
      test.equal(this.playlist.nowPlaying().get('title'), "Amelie Soundtrack - Yann Tiersen (Original)");
      return test.done();
    },
    nextEvent: function(test) {
      this.playlist.on('next', function(song) {
        test.equal(song.get('title'), "Amelie Soundtrack - Yann Tiersen (Original)");
        return test.done();
      });
      return this.playlist.next();
    },
    reset: function(test) {
      var nextEvent;

      nextEvent = false;
      this.playlist.on('next', function() {
        return nextEvent = true;
      });
      this.playlist.reset();
      test.ok(nextEvent);
      test.equal(this.playlist.nowPlaying(), false);
      return test.done();
    },
    nextOnAddToEmptyPlaylist: function(test) {
      var playlist;

      playlist = new Playlist();
      playlist.on('next', function() {
        test.ok(true, 'Next event should be triggered when adding to empty playlist');
        return test.done();
      });
      playlist.add({
        ytId: 'KD1NTfTF21I'
      });
      return playlist.fetch();
    }
  };

}).call(this);
