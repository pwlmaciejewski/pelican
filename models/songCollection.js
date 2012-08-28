var Backbone = require('backbone');
var Song = require('./song.js');
var async = require('async');
var _ = require('underscore');

var Collection = Backbone.Collection.extend({ model: Song });

module.exports = Backbone.Collection.extend({
  model: Song,

  initialize: function () {
    this.unfetchedModels = new Collection();
  },

  // Adding new, unfetched model don't trigger `add` event.
  // Also, if model is unfetched it isn't added to models,
  // it appears in `unfetchedModels`. 
  add: function (models, options) {
    models = _.isArray(models) ? models.slice() : [models];

    // Fetched and unfetched models
    var fetched = _(models).filter(function (model) {
      model = model instanceof Backbone.Model ? model : new this.model(model);
      return !model.isFetched();
    }, this);
    var unfetched = _(models).difference(fetched);

    this.unfetchedModels.add(fetched);
    return Backbone.Collection.prototype.add.call(this, unfetched, options);
  },

  // Need to reset `this.unfetechedModels` by my self.
  reset: function () {
    this.unfetchedModels.reset();
    return Backbone.Collection.prototype.reset.apply(this, arguments);
  },

  // It fetches models from `unfetchedModels`.
  fetch: function (options) {
    options.success = options.success || function () {};
    options.error = options.error || function () {};
    options.complete = options.complete || function () {};

    // Fetch each unfetched song (in parallel)
    async.parallel(this.unfetchedModels.map(function (song) {
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
      // Valid models
      var valid = _(results).filter(function (model) {
        return model.isFetched();
      });

      // Invalid models
      var invalid = _(results).difference(valid);

      this.add(valid);

      // Clear `unfetchedModels`
      this.unfetchedModels.reset();

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