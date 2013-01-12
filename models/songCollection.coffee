Backbone = require 'backbone'
Song = require './song.js'
async = require 'async'
_ = require 'underscore'

Collection = Backbone.Collection.extend { model: Song }

module.exports = Backbone.Collection.extend
  model: Song

  initialize: ->
    @unfetchedModels = new Collection()

  add: (models, options) ->
    models = if _.isArray(models) then models.slice() else [models]

    fetched = _(models).filter (model) =>
      model = if model instanceof Backbone.Model then model else new @model(model)
      not model.isFetched()
    unfetched = _(models).difference fetched

    @unfetchedModels.add fetched
    Backbone.Collection::add.call @, unfetched, options
  
  reset: ->
    @unfetchedModels.reset()
    Backbone.Collection::reset.call @ 
  
  fetch: (options) ->
    options = options or {}
    options.success = options.success or ->
    options.error = options.error or ->
    options.complete = options.complete or ->
    
    async.parallel @unfetchedModels.map((song) =>
      (callback) =>
        song.fetch
          success: (model, res) ->
            callback(null, model)
          error: (model, err) ->
            callback(err, model)
    ), (err, results) =>
      valid = _(results).filter (model) -> model.isFetched()      
      invalid = _(results).difference valid
      @add valid
      @unfetchedModels.reset()
      if err then options.error @, invalid
      options.success @, valid      
      options.complete @, results, valid, invalid