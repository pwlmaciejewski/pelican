var sandbox = require('sandboxed-module');
var Song = require('./song.js');
var Backbone = require('backbone');

module.exports = sandbox.require('../../models/songCollection.js', {
  requires: {
    backbone: Backbone,
    './song.js': sandbox.require('./song.js', {
      requires: {
        backbone: Backbone
      }
    })
  }
});