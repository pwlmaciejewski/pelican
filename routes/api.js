// Songs model
var Song = require('../models/song.js');
var SongCollection = require('../models/songCollection.js');
var songs = new SongCollection();

// Export songs out (why not?)
exports.songs = songs;

// Standard API error factory
var apiError = function (msg) {
  var err = { error: true };
  
  if (msg) {
    err.message = msg;
  }

  return JSON.stringify(err);
};

// GET /songs/
exports.getSongs = function (req, res) {
  res.send(songs.toJSON());
};

// GET /songs/:id 
exports.getSong = function (req, res) {
  var song = songs.get(req.params.id);

  if (!song) {
    res.send(404, apiError('Invalid song id'));    
  }

  res.send(song.toJSON());
};

// POST /songs/
exports.postSong = function (req, res) {
  var url = req.body.url;

  if (url.search('youtube') !== -1) {
    songs.add({ url: url });
  } else {
    songs.add({ ytId: url });
  }

  songs.fetch({
    complete: function (model, results, valid, invalid) {
      var r = {
        ok: !!valid.length,
        song: results[0]
      };

      res.send(JSON.stringify(r));
    }
  });
};
