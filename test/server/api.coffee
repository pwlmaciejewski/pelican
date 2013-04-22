sandbox = require 'sandboxed-module'
api = sandbox.require '../../lib/route/api.js', 
	requires:
		'../model/playlist.js': require './mock/playlist.js'

module.exports = 
	setUp: (callback) ->
		api.songs.reset()
		callback()

	postSong: (test) ->
		req = { body: { url: 'https://www.youtube.com/watch?v=8ZcmTl_1ER8' } };

		api.postSong req, 
			send: (txt) ->
				json = JSON.parse txt
				test.ok json.ok
				test.equal api.songs.length, 1
				test.equal json.song.title, 'Epic sax guy 10 hours'
				test.done()

	postInvalidSong: (test) ->
		req = { body: { url: 'http://youtube.com/watch?v=xxx' } }
		api.postSong req,
			send: (txt) ->
				json = JSON.parse(txt)
				test.ok !json.ok
				test.equal api.songs.length, 0, 'Songs should not be added into collection'
				test.done()

	getNowPlaying: 
		emptyQueue: (test) ->
			api.getNowPlaying {}, 
				send: (txt) ->
					json = JSON.parse txt
					test.equal json.song, false, 'Now playing for empty queue should be "false"'
					test.done()

		playing: (test) ->
			api.songs.add { ytId: '8ZcmTl_1ER8' }
			api.songs.add { ytId: 'WYGFNjEL7Jw' }
			api.songs.fetch
				complete: ->
					api.getNowPlaying {},
						send: (txt) ->
							json = JSON.parse txt
							test.equal json.song.ytId, '8ZcmTl_1ER8'
							test.done()

		uninitializedSong: (test) ->
			api.songs.add { ytId: '8ZcmTl_1ER8' }
			api.getNowPlaying {}, 
				send: (txt) ->
					json = JSON.parse txt
					test.ok !json.song, 'There should not be actually playing song'
					test.done()