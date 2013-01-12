var Backbone, Playlist, SongCollection;

Backbone = require('backbone');

SongCollection = require('./songCollection.js');

Playlist = SongCollection.extend({
  nowPlaying: function() {
    if (this.length) {
      return this.first();
    } else {
      return false;
    }
  },
  next: function() {
    this.remove(this.first());
    this.trigger('next', this.nowPlaying());
    return this;
  },
  reset: function() {
    var res;
    res = SongCollection.prototype.reset.call(this);
    this.trigger('next', this.nowPlaying());
    return res;
  },
  add: function(models, options) {
    var oldLength, res;
    oldLength = this.length;
    res = SongCollection.prototype.add.call(this, models, options);
    if (oldLength === 0 && this.length > 0) {
      this.trigger('next', this.nowPlaying());
    }
    return res;
  }
});

module.exports = Playlist;
