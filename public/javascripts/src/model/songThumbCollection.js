
define(['backbone', 'model/songThumb'], function(Backbone, SongThumb) {
  return Backbone.Collection.extend({
    model: SongThumb,
    url: '/api/songs',
    socket: null,
    initialize: function(attrs, options) {
      if (options.socket) {
        this.socket = options.socket;
        return this.initializeSocket();
      }
    },
    initializeSocket: function() {
      var _this = this;
      this.socket.on('add', function(model) {
        return _this.add(model);
      });
      this.socket.on('remove', function(model) {
        return _this.remove(model);
      });
      this.socket.on('reset', function(models) {
        return _this.reset(models);
      });
      return this.socket.on('change', function(model) {
        return _this.get(model.id).set(model);
      });
    },
    fetch: function() {
      if (!this.socket) {
        return Backbone.Collection.fetch.apply(this, arguments);
      }
      return this.socket.emit('fetch');
    }
  });
});
