define ['socketio', 'model/player', 'view/player'], (io, PlayerModel, PlayerView) ->
	model = new PlayerModel {},
		socket: io.connect()

	view = new PlayerView
		el: $('.playerContainer')
		model: model

	view.on 'ready', ->
    model.fetch()

	view.render()