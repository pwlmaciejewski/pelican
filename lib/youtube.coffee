Q = require 'q'

module.exports = self =
  getSongId: (song) -> self.getSongUrl(song).match(/v=([^&]*)/)[1]

  getSongUrl: (song) -> song.entry.link[0].href

  getSongTitle: (song) -> song.entry.title.$t

  getSongThumbnail: (song) -> song.entry.media$group.media$thumbnail[0].url

  fetchSong: (request, id) ->
    deferred = Q.defer()
    request
      uri: self.getFetchUrl(id)
    ,
      (err, req, body) ->
        if err then deferred.reject new Error "Network error: #{err.message}"
        else if req.statusCode is 200 then deferred.resolve JSON.parse(body)
        else deferred.reject new Error 'Song not found'
    deferred.promise

  getFetchUrl: (id) -> "https://gdata.youtube.com/feeds/api/videos/#{id}?v=2&alt=json"