(function() {
  var Q, buster, events, playlist, sinon;

  buster = require('buster');

  sinon = require('sinon');

  events = require('events');

  playlist = require('../../lib/playlist');

  Q = require('q');

  buster.testCase('playlist', {
    setUp: function() {
      this.pubsub = new events.EventEmitter();
      return sinon.stub(this.pubsub, 'emit');
    },
    'nowPlaying': {
      'test playing': function() {
        return assert.equals(playlist.nowPlaying([
          {
            foo: 'bar'
          }
        ]), {
          foo: 'bar'
        });
      },
      'test not playing': function() {
        return assert.isNull(playlist.nowPlaying([]));
      }
    },
    'next': {
      'test playlist forwarded': function() {
        return assert.equals(playlist.next(this.pubsub, [{}, {}]).length, 1);
      },
      'test next event triggered': function() {
        var newPlaylist;

        newPlaylist = playlist.next(this.pubsub, [{}, {}]);
        return assert.calledWith(this.pubsub.emit, 'next', newPlaylist);
      }
    },
    'add': {
      'test added to playlist': function() {
        return assert.equals(playlist.add(this.pubsub, [{}], {}).length, 2);
      },
      'test next called when first product': function() {
        var newPlaylist, song;

        song = {};
        newPlaylist = playlist.add(this.pubsub, [], song);
        return assert.calledWith(this.pubsub.emit, 'next', newPlaylist, song);
      },
      'test next wasnt called when not first product': function() {
        playlist.add(this.pubsub, [{}], {});
        return refute.called(this.pubsub.emit);
      }
    },
    'fetchAndAdd': {
      setUp: function() {
        return this.service = {
          fetchSong: sinon.spy(function(request, id) {
            var deferred;

            deferred = Q.defer();
            if (id === 'foo') {
              deferred.resolve({});
            } else {
              deferred.reject(new Error('Some error'));
            }
            return deferred.promise;
          })
        };
      },
      'test fetch success': function(done) {
        return playlist.fetchAndAdd(this.service, {}, 'foo', this.pubsub, []).then(function(newPlaylist) {
          assert.equals(newPlaylist.length, 1);
          return done();
        });
      },
      'test fetch error': function(done) {
        return playlist.fetchAndAdd(this.service, {}, 'bar', this.pubsub, []).then((function() {}), function(err) {
          refute.isNull(err);
          return done();
        });
      }
    }
  });

}).call(this);
