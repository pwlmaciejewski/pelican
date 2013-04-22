Q = require 'q'

module.exports = self =
  nowPlaying: (playlist) ->
    if playlist.length then playlist[0] else null

  next: (pubsub, playlist) -> 
    newPlaylist = playlist.slice 1
    pubsub.emit 'next', newPlaylist
    newPlaylist

  add: (pubsub, playlist, song) ->
    newPlaylist = playlist.slice()
    newPlaylist.push song
    unless playlist.length then pubsub.emit 'next', newPlaylist, song
    newPlaylist

  fetchAndAdd: (service, request, id, pubsub, playlist) ->
    deferred = Q.defer()
    service.fetchSong(request, id)
      .then ((song) ->
        deferred.resolve self.add(pubsub, playlist, song)
      ), deferred.reject
    deferred.promise