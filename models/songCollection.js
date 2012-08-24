var Backbone = require('backbone');
var Song = require('./song.js');

module.exports = Backbone.Collection.extend({
  model: Song
});