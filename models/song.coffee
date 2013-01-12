Backbone = require 'backbone'
request = require 'request'
_ = require 'underscore'

Song = Backbone.Model.extend
  defaults: 
    url: ''
    ytId: ''
    title: ''
    thumbnail: ''

  initialize: do =>
    id = 0
    ->
      @set 'id', id, { silent: true }
      id += 1
      unless @get('ytId') then @set 'ytId', Song.ytId(@get('url'))

  url: ->
    'https://gdata.youtube.com/feeds/api/videos/' + @get('ytId') + '?v=2&alt=json'

  parse: (res) ->
    url: res.entry.link[0].href
    title: res.entry.title.$t
    thumbnail: res.entry.media$group.media$thumbnail[0].url

  fetch: (options) ->
    options = if options then _.clone(options) else {}
    options.success = options.success or ->
    options.error = options.error or ->

    request
      uri: @url()
    , (err, res, body) =>
      if res.statusCode isnt 200
        options.error @
        return

      @set @parse(JSON.parse(body))
      options.success @

  isFetched: ->
    @get('title') isnt ''
, 
  ytId: (url) ->
    url.match(/v=([^&]*)/)[1]

module.exports = Song