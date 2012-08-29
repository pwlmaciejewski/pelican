var Backbone = require('backbone');
var SongCollection = require('./songCollection.js');

var Playlist = SongCollection.extend({
	nowPlaying: function () {
		return false;
	}
});

module.exports = Playlist;