buster = require 'buster'
youtube = require '../../lib/youtube'
fs = require 'fs'

buster.testCase 'youtube',
  'getters':
    setUp: ->
      @song = JSON.parse(fs.readFileSync(__dirname + '/fixture/youtubeResponse.json').toString())

    'test getSongUrl': -> 
      assert.equals youtube.getSongUrl(@song), 'https://www.youtube.com/watch?v=WYGFNjEL7Jw&feature=youtube_gdata'

    'test getSongTitle': ->
      assert.equals youtube.getSongTitle(@song), 'Amelie Soundtrack - Yann Tiersen (Original)'

    'test getSongThumbnail': ->
      assert.equals youtube.getSongThumbnail(@song), 'http://i.ytimg.com/vi/WYGFNjEL7Jw/default.jpg'

    'test getSongId': ->
      assert.equals youtube.getSongId(@song), 'WYGFNjEL7Jw'

  'fetchSong':
    setUp: ->
      @fooSong =
        foo: 'bar'
      @requestMock = (options = {}, callback = ->) =>
        if options.uri is youtube.getFetchUrl('foo')
          callback null, { statusCode: 200 }, JSON.stringify(@fooSong)
        else if options.uri is youtube.getFetchUrl('bar')
          callback null, { statusCode: 404 }, JSON.stringify({})
        else
          callback new Error('some error')

    'test fetch success': (done) ->
      youtube.fetchSong(@requestMock, 'foo')
        .then (song) =>
          assert.equals song, @fooSong
          done()

    'test fetch failure': (done) ->
      youtube.fetchSong(@requestMock, 'bar')
        .then (->), (err) ->
          refute.isNull err
          done()

    'test fetch error': (done) ->
      youtube.fetchSong(@requestMock, 'xxx')
        .then (->), (err) ->
          refute.isNull err
          done()
