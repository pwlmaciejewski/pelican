
define(['jquery', 'model/songThumbCollection', 'view/songThumbCollection', 'socketio'], function($, SongsModel, SongsView, io) {
  var model, view;
  model = new SongsModel([], {
    socket: io.connect()
  });
  view = new SongsView({
    el: $('.playlist .songs'),
    collection: model
  });
  view.render();
  return model.fetch();
});
