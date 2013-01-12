
define(['socketio', 'model/player', 'view/player'], function(io, PlayerModel, PlayerView) {
  var model, view;
  model = new PlayerModel({}, {
    socket: io.connect()
  });
  view = new PlayerView({
    el: $('.playerContainer'),
    model: model
  });
  view.on('ready', function() {
    return model.fetch();
  });
  return view.render();
});
