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
		this.trigger('next');
		return this;
	},

	reset: function () {
		var res = SongCollection.prototype.reset.apply(this, arguments);
		this.trigger('next');
		return res;
	}
});

module.exports = Playlist;