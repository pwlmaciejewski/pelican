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

		initializeSocket: function () {},

		fetch: function () {
      if (!this.socket) {
        return Backbone.Model.fetch.apply(this, arguments);
      }

      this.socket.emit('whatsPlaying?');
    }
	});
});