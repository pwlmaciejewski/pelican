define ['backbone'], (Backbone) ->
	Backbone.Model.extend
		defaults:
			song: false

		socket: null

		initialize: (attrs, options) ->
			if options.socket
				@socket = options.socket
				@initializeSocket()

		initializeSocket: ->
      @socket.on 'songChange', (song) =>
        @set 'song', song

    next: ->
      @socket.emit 'songNext'

		fetch: ->
      unless this.socket then return Backbone.Model.prototype.fetch.apply @, arguments 
      @socket.emit 'whatsPlaying?'