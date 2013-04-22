(function() {
  var Backbone, SongCollection, sandbox;

  sandbox = require('sandboxed-module');

  SongCollection = require('./song.js');

  Backbone = require('backbone');

  module.exports = sandbox.require('../../../lib/model/playlist.js', {
    requires: {
      backbone: Backbone,
      './songCollection.js': sandbox.require('./songCollection.js', {
        requires: {
          backbone: Backbone
        }
      })
    }
  });

}).call(this);
