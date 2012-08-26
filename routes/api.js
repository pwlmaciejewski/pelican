var request = require('request');

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
  
};
