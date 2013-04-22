(function() {
  var Backbone, Song, sandbox;

  sandbox = require('sandboxed-module');

  Song = require('./song.js');

  Backbone = require('backbone');

  module.exports = sandbox.require('../../../lib/model/songCollection.js', {
    requires: {
      backbone: Backbone,
      './song.js': sandbox.require('./song.js', {
        requires: {
          backbone: Backbone
        }
      })
    }
  });

}).call(this);
