Backbone = require 'backbone'
SongCollection = require './songCollection.js'

Playlist = SongCollection.extend
	nowPlaying: ->
		if @length then @first() else false

	next: ->
		@remove @first()
		@trigger 'next', @nowPlaying()
		@

	reset: ->
		res = SongCollection::reset.call @
		@trigger 'next', @nowPlaying()
		res

	add: (models, options) ->
		oldLength = @length
		res = SongCollection::add.call @, models, options
		if oldLength == 0 and @length > 0 then @trigger 'next', @nowPlaying()
		res

module.exports = Playlist