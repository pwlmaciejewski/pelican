var sandbox = require('sandboxed-module');
var SongCollection = require('./song.js');
var Backbone = require('backbone');

module.exports = sandbox.require('../../models/playlist.js', {
  requires: {
    backbone: Backbone,
    './songCollection.js': sandbox.require('./songCollection.js', {
      requires: {
        backbone: Backbone
      }
    })
  }
});