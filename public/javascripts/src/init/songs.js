define([
  'jquery',
  'model/songThumbCollection', 
  'view/songThumbCollection',
  'socketio'
], function ($, SongsModel, SongsView, io) {
  var model = new SongsModel([], {
    socket: io.connect('localhost')
  });

  var view = new SongsView({
    el: $('.playlist'),
    collection: model
  });

  view.render();
  model.fetch();
});