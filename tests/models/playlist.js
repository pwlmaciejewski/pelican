var Playlist = require('../mocks/playlist.js');

module.exports = {
  setUp: function (callback) {
    this.playlist = new Playlist();
    this.playlist.add([
      // "Totally Enormous Extinct Dinosaurs - \"Garden\": SXSW 2011 Showcasing Artist"
      { ytId: 'KD1NTfTF21I' },
      // "Amelie Soundtrack - Yann Tiersen (Original)"
      { ytId: 'WYGFNjEL7Jw' }
    ]);

    this.playlist.fetch({
      complete: function () {
        callback();        
      }
    });
  },

  emptyPlaylist: function (test) {
    var playlist = new Playlist();
    test.equal(playlist.nowPlaying(), false);
    test.done();
  },

  nowPlaying: function (test) {
    test.equal(this.playlist.nowPlaying().get('title'), "Totally Enormous Extinct Dinosaurs - \"Garden\": SXSW 2011 Showcasing Artist");
    test.done();
  },

  next: function (test) {
    this.playlist.next();
    test.equal(this.playlist.nowPlaying().get('title'), "Amelie Soundtrack - Yann Tiersen (Original)");
    test.done();
  },

  nextEvent: function (test) {
    this.playlist.on('next', function (song) {
      test.equal(song.get('title'), "Amelie Soundtrack - Yann Tiersen (Original)");
      test.done();
    });

    this.playlist.next();
  },

  reset: function (test) {
    var nextEvent = false;
    this.playlist.on('next', function () {
      nextEvent = true;
    });

    this.playlist.reset();
    test.ok(nextEvent);
    test.equal(this.playlist.nowPlaying(), false);
    test.done();
  },

  nextOnAddToEmptyPlaylist: function (test) {
    var playlist = new Playlist();
    
    playlist.on('next', function () {
      test.ok(true, 'Next event should be triggered when adding to empty playlist');
      test.done();
    });

    playlist.add({ ytId: 'KD1NTfTF21I' });
    playlist.fetch();
  }
};