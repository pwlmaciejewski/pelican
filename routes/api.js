// Songs model
var Song = require('../models/song.js');
var SongCollection = require('../models/songCollection.js');
var songs = new SongCollection([{
  id: 0,
  url: 'http://google.pl',
  title: 'Kasabian',
  thumbUrl: 'http:/xxx.pl'
}, {
  id: 1,
  url: 'http://www.youtube.com/watch?v=AyggY_R3jU8',
  title: 'Final countdowna',
  thumbUrl: 'http://dupa.pl'
}]);

// Standard API error factory
var apiError = function (msg) {
  var err = { error: true };
  
  if (msg) {
    err.message = msg;
  }

  return JSON.stringify(err);
};

exports.getSongs = function (req, res) {
  res.send(songs.toJSON());
};

exports.getSong = function (req, res) {
  var song = songs.get(req.params.id);

  if (!song) {
    res.send(404, apiError('Invalid song id'));    
  }

  res.send(song.toJSON());
};
