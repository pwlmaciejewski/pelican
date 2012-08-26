var Backbone = require('backbone');
var Song = require('./song.js');
var async = require('async');

module.exports = Backbone.Collection.extend({
  model: Song,
  fetch: function (options) {
    var fn = [];

    // Gerenate async functions
    this.each(function (song) {
      fn.push(function (callback) {
        song.fetch({
          success: function (model, res) {
            callback();
          },
          error: function (res) {
            callback(res);
          }
        });
      });
    }, this);

    // Run functions in parallel
    async.parallel(fn, function (err, results) {
      options.success(results);
    });
  }
});