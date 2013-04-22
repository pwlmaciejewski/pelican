Playlist = require '../mock/playlist.js'

module.exports = 
	setUp: (callback) ->
		@playlist = new Playlist()
		@playlist.add [
			# "Totally Enormous Extinct Dinosaurs - \"Garden\": SXSW 2011 Showcasing Artist"
			{ ytId: 'KD1NTfTF21I' }
			# "Amelie Soundtrack - Yann Tiersen (Original)"
			{ ytId: 'WYGFNjEL7Jw' }
		]

		@playlist.fetch
			complete: ->
				callback()

	emptyPlaylist: (test) ->
		playlist = new Playlist()
		test.equal playlist.nowPlaying(), false
		test.done()

	nowPlaying: (test) ->
		test.equal @playlist.nowPlaying().get('title'), "Totally Enormous Extinct Dinosaurs - \"Garden\": SXSW 2011 Showcasing Artist"
		test.done()

	next: (test) ->
		@playlist.next()
		test.equal @playlist.nowPlaying().get('title'), "Amelie Soundtrack - Yann Tiersen (Original)"
		test.done()

	nextEvent: (test) ->
		@playlist.on 'next', (song) ->
			test.equal song.get('title'), "Amelie Soundtrack - Yann Tiersen (Original)"
			test.done()
		@playlist.next()

	reset: (test) ->
		nextEvent = false
		@playlist.on 'next', ->
			nextEvent = true

		@playlist.reset()
		test.ok nextEvent
		test.equal @playlist.nowPlaying(), false
		test.done()

	nextOnAddToEmptyPlaylist: (test) ->
		playlist = new Playlist()
		
		playlist.on 'next', ->
			test.ok true, 'Next event should be triggered when adding to empty playlist'
			test.done()

		playlist.add { ytId: 'KD1NTfTF21I' }
		playlist.fetch()