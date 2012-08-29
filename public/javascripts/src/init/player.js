define(['socketio', 'model/player', 'view/player'], function (io, PlayerModel, PlayerView) {
	var model = new PlayerModel({}, {
		socket: io.connect('localhost')
	});

	var view = new PlayerView({
		el: $('#player'),
		model: model,
		ready: function () {
			model.fetch();
		}
	});

	console.log(view);

	view.render();
});