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
		this.trigger('next', this.nowPlaying());
		return this;
	},

	reset: function () {
		var res = SongCollection.prototype.reset.apply(this, arguments);
		this.trigger('next', this.nowPlaying());
		return res;
	},

	add: function () {
		var oldLength = this.length;
		var res = SongCollection.prototype.add.apply(this, arguments);

		if (oldLength === 0 && this.length > 0) {
			this.trigger('next', this.nowPlaying());
		}

		return res;
	}
});

module.exports = Playlist;