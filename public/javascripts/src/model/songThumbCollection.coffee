define ['backbone', 'model/songThumb'], (Backbone, SongThumb) ->
	Backbone.Collection.extend
		model: SongThumb

		url: '/api/songs'

		socket: null

		initialize:  (attrs, options) ->
			if options.socket
				@socket = options.socket
				@initializeSocket()

		initializeSocket: ->
			@socket.on 'add', (model) =>
				@add model

			@socket.on 'remove', (model) =>
				@remove model

			@socket.on 'reset', (models) =>
				@reset models

			@socket.on 'change', (model) =>
				@get(model.id).set model

		fetch: ->
			unless this.socket then return Backbone.Collection.fetch.apply @, arguments
			@socket.emit 'fetch'