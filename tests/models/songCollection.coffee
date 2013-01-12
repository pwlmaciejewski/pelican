SongCollection = require '../mocks/songCollection.js'

module.exports = 
	setUp: (callback) ->
		@songs = new SongCollection()
		@songs.add { ytId: '8ZcmTl_1ER8' }
		@songs.add { ytId: 'WYGFNjEL7Jw' }
		callback()

	length: (test) ->
		test.equal @songs.length, 0, 'There should not be songs in collection (before fetch)'
		test.done()

	reset: (test) ->
		@songs.reset()
		test.equal @songs.unfetchedModels.length, 0, 'After reset unfetchedModels should be empty'
		test.done()

	add: 
		beforeFetch: (test) ->
			@songs.reset()
			@songs.add { ytId: '8ZcmTl_1ER8' }
			test.equal @songs.length, 0, 'There should not be any songs in collection before fetch()'
			test.done()

		afterFetch: (test) ->
			@songs.reset()
			@songs.add { ytId: '8ZcmTl_1ER8' }
			@songs.fetch
				complete: (collection) ->
					test.equal collection.length, 1, 'There should be one model in collection after fetch()'
					test.done()

	addEvent: (test) ->
		addEvent = false
		
		@songs.on 'add', ->
			addEvent = true

		@songs.add { ytId: 'xxx' }
		test.ok !addEvent, 'There should not be add event before fetch' 
		test.done()

	fetch: 
		success: (test) ->
			@songs.fetch
				success: (collection, results) =>
					test.equal @songs, collection, 'Collection should be a first argument'
					test.equal results[0], @songs.at(0), 'Results should be an array of added elements'
					test.equal @songs.at(0).get('title'), 'Epic sax guy 10 hours'
					test.equal @songs.at(1).get('title'), 'Amelie Soundtrack - Yann Tiersen (Original)'
					test.done()

		error: (test) ->
			@songs.add { ytId: 'xxx' }
			@songs.fetch
				success: (model, results) ->
					test.equal(results.length, 2, 'Results should be an array of valid models')

				error: (model, results) ->
					test.equal results[0].get('ytId'), 'xxx', 'Invalid models should be results of error'

				complete: (model, results, valid, invalid) ->
					test.equal model.length, 2, 'Invalid models should be rejected from collection'
					test.equal results.length, 3, 'Results should have all models'
					test.equal valid.length, 2, 'Valid array should contain valid models'
					test.equal invalid.length, 1, 'Invalid array should contain invalid models'
					test.done()