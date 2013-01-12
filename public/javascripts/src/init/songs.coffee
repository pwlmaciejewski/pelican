define [
  'jquery',
  'model/songThumbCollection', 
  'view/songThumbCollection',
  'socketio'
], ($, SongsModel, SongsView, io) ->
  model = new SongsModel [],
    socket: io.connect()

  view = new SongsView
    el: $ '.playlist .songs'
    collection: model

  view.render()
  model.fetch()