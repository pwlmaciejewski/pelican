(function() {
  var Backbone, sandbox;

  sandbox = require('sandboxed-module');

  Backbone = require('backbone');

  module.exports = sandbox.require('../../../lib/model/song.js', {
    requires: {
      request: require('../mock/request.js'),
      backbone: Backbone
    }
  });

}).call(this);
