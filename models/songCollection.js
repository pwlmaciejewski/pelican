var Backbone = require('backbone');
var Song = require('./song.js');
var async = require('async');

module.exports = Backbone.Collection.extend({
  model: Song,

  fetch: function (options) {
    options.success = options.success || function () {};
    options.error = options.error || function () {};
    options.complete = options.complete || function () {};

    // Run functions in parallel
    async.parallel(this.map(function (song) {
      return function (callback) {
        song.fetch({
          success: function (model, res) {
            callback(null, model);
          },
          error: function (model, err) {
            callback(err, model);
          }
        });
      };
    }, this), function (err, results) {
      var valid = results.filter(function (result) { 
        return result.get('title') !== ''; 
      });

      var invalid = results.filter(function (result) { 
        return result.get('title') === ''; 
      });

      // Remove invalid models from collection
      this.remove(invalid);

      // Send error
      if (err) {
        options.error(this, invalid);
      }

      // Send success
      options.success(this, valid);

      // Send complete
      options.complete(this, results, valid, invalid);
    }.bind(this));
  }
});