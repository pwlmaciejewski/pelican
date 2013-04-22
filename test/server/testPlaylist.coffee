buster = require 'buster'
sinon = require 'sinon'
events = require 'events'
playlist = require '../../lib/playlist'
Q = require 'q'

buster.testCase 'playlist',
  setUp: ->
    @pubsub = new events.EventEmitter()
    sinon.stub @pubsub, 'emit'

  'nowPlaying':
    'test playing': ->
      assert.equals playlist.nowPlaying([{ foo: 'bar' }]), { foo: 'bar' }

    'test not playing': ->
      assert.isNull playlist.nowPlaying([])

  'next':
    'test playlist forwarded': ->
      assert.equals playlist.next(@pubsub, [{}, {}]).length, 1

    'test next event triggered': ->
      newPlaylist = playlist.next @pubsub, [{}, {}]
      assert.calledWith @pubsub.emit, 'next', newPlaylist

  'add':
    'test added to playlist': ->
      assert.equals playlist.add(@pubsub, [{}], {}).length, 2

    'test next called when first product': ->
      song = {}
      newPlaylist = playlist.add @pubsub, [], song
      assert.calledWith @pubsub.emit, 'next', newPlaylist, song

    'test next wasnt called when not first product': ->
      playlist.add @pubsub, [{}], {}
      refute.called @pubsub.emit

  'fetchAndAdd':
    setUp: ->
      @service =
        fetchSong: sinon.spy (request, id) ->
          deferred = Q.defer()
          if id is 'foo' then deferred.resolve {}
          else deferred.reject new Error 'Some error'
          deferred.promise

    'test fetch success': (done) ->
      playlist.fetchAndAdd(@service, {}, 'foo', @pubsub, [])
        .then (newPlaylist) ->
          assert.equals newPlaylist.length, 1
          done()

    'test fetch error': (done) ->
      playlist.fetchAndAdd(@service, {}, 'bar', @pubsub, [])
        .then (->), (err) ->
          refute.isNull err
          done()