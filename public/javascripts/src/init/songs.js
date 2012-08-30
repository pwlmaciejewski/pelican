define([
  'jquery',
  'model/songThumbCollection', 
  'view/songThumbCollection',
  'socketio'
], function ($, SongsModel, SongsView, io) {
  var model = new SongsModel([], {
    socket: io.connect()
  });

  var view = new SongsView({
    el: $('.playlist .songs'),
    collection: model
  });

  view.render();
  model.fetch();
});