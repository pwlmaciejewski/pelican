var Playlist = require('../mocks/playlist.js');

module.exports = {
  setUp: function (callback) {
    this.playlist = new Playlist();
    callback();
  },

  emptyPlaylist: function (test) {
    test.equal(this.playlist.nowPlaying(), false);
    test.done();
  },

  oneSong: function (test) {
    this.playlist.add({ ytId: 'KD1NTfTF21I' });
    this.playlist.fetch({
      complete: function () {
        test.equal(this.playlist.nowPlaying().get('title'), "Totally Enormous Extinct Dinosaurs - \"Garden\": SXSW 2011 Showcasing Artist");
        test.done();
      }
    });
  }
};