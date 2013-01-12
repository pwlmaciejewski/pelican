Song = require '../models/song.js'
Playlist = require '../models/playlist.js'
songs = new Playlist()

exports.songs = songs

# Standard API error factory
apiError =  (msg) ->
	err = { error: true }
	if msg then err.message = msg
	JSON.stringify err

# GET /songs/
exports.getSongs = (req, res) ->
	res.send songs.toJSON()

# GET /songs/:id 
exports.getSong = (req, res) ->
	song = songs.get req.params.id
	unless song then res.send 404, apiError('Invalid song id')
	res.send song.toJSON()

# POST /songs/
exports.postSong = (req, res) ->
	url = req.body.url

	if url.search('youtube') != -1 then songs.add { url: url }
	else songs.add { ytId: url }

	songs.fetch
		complete: (model, results, valid, invalid) ->
			r = 
				ok: !!valid.length
				song: results[0]

			res.send JSON.stringify(r)

# GET /nowPlaying/
exports.getNowPlaying = (req, res) ->
	nowPlaying = songs.nowPlaying()
	res.send JSON.stringify({ song: (if nowPlaying then nowPlaying.toJSON() else false) })