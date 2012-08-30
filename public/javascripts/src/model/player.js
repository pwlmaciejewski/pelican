define(['backbone'], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			song: false
		},

		socket: null,

		initialize: function (attrs, options) {
			if (options.socket) {
				this.socket = options.socket;
				this.initializeSocket();
			}
		},

		initializeSocket: function () {
      this.socket.on('songChange', function (song) {
        this.set('song', song);
      }.bind(this));
    },

    next: function () {
      this.socket.emit('songNext');
    },

		fetch: function () {
      if (!this.socket) {
        return Backbone.Model.fetch.apply(this, arguments);
      }

      this.socket.emit('whatsPlaying?');
    }
	});
});