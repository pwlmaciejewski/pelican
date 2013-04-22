(function() {
  var Q, self;

  Q = require('q');

  module.exports = self = {
    nowPlaying: function(playlist) {
      if (playlist.length) {
        return playlist[0];
      } else {
        return null;
      }
    },
    next: function(pubsub, playlist) {
      var newPlaylist;

      newPlaylist = playlist.slice(1);
      pubsub.emit('next', newPlaylist);
      return newPlaylist;
    },
    add: function(pubsub, playlist, song) {
      var newPlaylist;

      newPlaylist = playlist.slice();
      newPlaylist.push(song);
      if (!playlist.length) {
        pubsub.emit('next', newPlaylist, song);
      }
      return newPlaylist;
    },
    fetchAndAdd: function(service, request, id, pubsub, playlist) {
      var deferred;

      deferred = Q.defer();
      service.fetchSong(request, id).then((function(song) {
        return deferred.resolve(self.add(pubsub, playlist, song));
      }), deferred.reject);
      return deferred.promise;
    }
  };

}).call(this);
