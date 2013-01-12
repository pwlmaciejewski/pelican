var Playlist, Song, apiError, songs;

Song = require('../models/song.js');

Playlist = require('../models/playlist.js');

songs = new Playlist();

exports.songs = songs;

apiError = function(msg) {
  var err;
  err = {
    error: true
  };
  if (msg) {
    err.message = msg;
  }
  return JSON.stringify(err);
};

exports.getSongs = function(req, res) {
  return res.send(songs.toJSON());
};

exports.getSong = function(req, res) {
  var song;
  song = songs.get(req.params.id);
  if (!song) {
    res.send(404, apiError('Invalid song id'));
  }
  return res.send(song.toJSON());
};

exports.postSong = function(req, res) {
  var url;
  url = req.body.url;
  if (url.search('youtube') !== -1) {
    songs.add({
      url: url
    });
  } else {
    songs.add({
      ytId: url
    });
  }
  return songs.fetch({
    complete: function(model, results, valid, invalid) {
      var r;
      r = {
        ok: !!valid.length,
        song: results[0]
      };
      return res.send(JSON.stringify(r));
    }
  });
};

exports.getNowPlaying = function(req, res) {
  var nowPlaying;
  nowPlaying = songs.nowPlaying();
  return res.send(JSON.stringify({
    song: (nowPlaying ? nowPlaying.toJSON() : false)
  }));
};
