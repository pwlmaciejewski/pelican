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
  }
};