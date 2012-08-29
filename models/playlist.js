var Backbone = require('backbone');
var SongCollection = require('./songCollection.js');

var Playlist = SongCollection.extend({
	nowPlaying: function () {
		if (this.length) {
			return this.first();
		} else {
			return false;
		}
	},

	next: function () {
		this.remove(this.first());
		return this;
	}
});

module.exports = Playlist;