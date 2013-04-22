(function() {
  var Q, self;

  Q = require('q');

  module.exports = self = {
    getSongId: function(song) {
      return self.getSongUrl(song).match(/v=([^&]*)/)[1];
    },
    getSongUrl: function(song) {
      return song.entry.link[0].href;
    },
    getSongTitle: function(song) {
      return song.entry.title.$t;
    },
    getSongThumbnail: function(song) {
      return song.entry.media$group.media$thumbnail[0].url;
    },
    fetchSong: function(request, id) {
      var deferred;

      deferred = Q.defer();
      request({
        uri: self.getFetchUrl(id)
      }, function(err, req, body) {
        if (err) {
          return deferred.reject(new Error("Network error: " + err.message));
        } else if (req.statusCode === 200) {
          return deferred.resolve(JSON.parse(body));
        } else {
          return deferred.reject(new Error('Song not found'));
        }
      });
      return deferred.promise;
    },
    getFetchUrl: function(id) {
      return "https://gdata.youtube.com/feeds/api/videos/" + id + "?v=2&alt=json";
    }
  };

}).call(this);
