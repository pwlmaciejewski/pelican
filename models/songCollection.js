var Backbone, Collection, Song, async, _;

Backbone = require('backbone');

Song = require('./song.js');

async = require('async');

_ = require('underscore');

Collection = Backbone.Collection.extend({
  model: Song
});

module.exports = Backbone.Collection.extend({
  model: Song,
  initialize: function() {
    return this.unfetchedModels = new Collection();
  },
  add: function(models, options) {
    var fetched, unfetched,
      _this = this;
    models = _.isArray(models) ? models.slice() : [models];
    fetched = _(models).filter(function(model) {
      model = model instanceof Backbone.Model ? model : new _this.model(model);
      return !model.isFetched();
    });
    unfetched = _(models).difference(fetched);
    this.unfetchedModels.add(fetched);
    return Backbone.Collection.prototype.add.call(this, unfetched, options);
  },
  reset: function() {
    this.unfetchedModels.reset();
    return Backbone.Collection.prototype.reset.call(this);
  },
  fetch: function(options) {
    var _this = this;
    options = options || {};
    options.success = options.success || function() {};
    options.error = options.error || function() {};
    options.complete = options.complete || function() {};
    return async.parallel(this.unfetchedModels.map(function(song) {
      return function(callback) {
        return song.fetch({
          success: function(model, res) {
            return callback(null, model);
          },
          error: function(model, err) {
            return callback(err, model);
          }
        });
      };
    }), function(err, results) {
      var invalid, valid;
      valid = _(results).filter(function(model) {
        return model.isFetched();
      });
      invalid = _(results).difference(valid);
      _this.add(valid);
      _this.unfetchedModels.reset();
      if (err) {
        options.error(_this, invalid);
      }
      options.success(_this, valid);
      return options.complete(_this, results, valid, invalid);
    });
  }
});
