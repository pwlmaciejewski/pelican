var sandbox = require('sandboxed-module');
var Backbone = require('backbone');

module.exports = sandbox.require('../../models/song.js', {
  requires: { 
    jquery:  require('../mocks/jqueryAjax.js'),
    backbone: Backbone
  }
});