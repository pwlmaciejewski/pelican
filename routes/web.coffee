api = require './api'

web = 
	songs: (req, res) ->
		res.render 'songs'

	player: (req, res) ->
		res.render 'player'

	add: (req, res) ->
		res.render 'add', { info: req.flash('info') }

	postAdd: (req, res) ->
		url = req.body.url

		unless url
			req.flash 'info', 'Invalid input'
			web.add req, res
			return

		api.postSong req, 
			send: (txt) ->
				res.redirect '/songs'

module.exports = web