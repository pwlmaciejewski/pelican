(function() {
  define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
      defaults: {
        song: false
      },
      socket: null,
      initialize: function(attrs, options) {
        if (options.socket) {
          this.socket = options.socket;
          return this.initializeSocket();
        }
      },
      initializeSocket: function() {
        var _this = this;

        return this.socket.on('songChange', function(song) {
          return _this.set('song', song);
        });
      },
      next: function() {
        return this.socket.emit('songNext');
      },
      fetch: function() {
        if (!this.socket) {
          return Backbone.Model.prototype.fetch.apply(this, arguments);
        }
        return this.socket.emit('whatsPlaying?');
      }
    });
  });

}).call(this);
