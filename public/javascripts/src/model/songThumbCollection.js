define(['backbone', 'model/songThumb'], function (Backbone, SongThumb) {
  return Backbone.Collection.extend({
    model: SongThumb,

    url: '/api/songs',

    socket: null,

    initialize: function (attrs, options) {
      if (options.socket) {
          this.socket = options.socket;
          this.initializeSocket();            
      }
    },

    initializeSocket: function () {
      this.socket.on('add', function (model) {
        console.log('*** ADD ***', model);
        this.add(model);
      }.bind(this));

      this.socket.on('remove', function (model) {
        console.log('*** REMOVE ***', model);
        this.remove(model);
      }.bind(this));

      this.socket.on('reset', function (models) {
        console.log('*** RESET ***', models);
        this.reset(models);  
      }.bind(this));

      this.socket.on('change', function (model) {
        console.log('*** CHANGE ***', model);
        this.get(model.id).set(model);
      }.bind(this));
    },

    fetch: function () {
      if (!this.socket) {
          return Backbone.Collection.fetch.apply(this, arguments);
      }

      this.socket.emit('fetch');
    }
  });
});