sandbox = require 'sandboxed-module'
SongCollection = require './song.js'
Backbone = require 'backbone'

module.exports = sandbox.require '../../models/playlist.js',
	requires:
		backbone: Backbone
		'./songCollection.js': sandbox.require('./songCollection.js',
			requires: 
				backbone: Backbone
			)