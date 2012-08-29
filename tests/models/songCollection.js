var SongCollection = require('../mocks/songCollection.js');

module.exports = {
  setUp: function (callback) {
    this.songs = new SongCollection();
    this.songs.add({ ytId: '8ZcmTl_1ER8' });
    this.songs.add({ ytId: 'WYGFNjEL7Jw' });
    callback();
  },

  length: function (test) {
    test.equal(this.songs.length, 0, 'There should not be songs in collection (before fetch)');
    test.done();
  },

  reset: function (test) {
    this.songs.reset();
    test.equal(this.songs.unfetchedModels.length, 0, 'After reset unfetchedModels should be empty');
    test.done();
  },

  add: {
    beforeFetch: function (test) {
      this.songs.reset();
      this.songs.add({ ytId: '8ZcmTl_1ER8' });
      test.equal(this.songs.length, 0, 'There should not be any songs in collection before fetch()');
      test.done();
    },

    afterFetch: function (test) {
      this.songs.reset();
      this.songs.add({ ytId: '8ZcmTl_1ER8' });
      this.songs.fetch({
        complete: function (collection) {
          test.equal(collection.length, 1, 'There should be one model in collection after fetch()');
          test.done();
        }
      });        
    }
  },

  addEvent: function (test) {
    var addEvent = false;
    
    this.songs.on('add', function () {
      addEvent = true;
    });

    this.songs.add({ ytId: 'xxx' });
    test.ok(!addEvent, 'There should not be add event before fetch');      
    test.done();
  },

  fetch: {
    success: function (test) {
      this.songs.fetch({
        success: function (collection, results) {
          test.equal(this.songs, collection, 'Collection should be a first argument');
          test.equal(results[0], this.songs.at(0), 'Results should be an array of added elements');
          test.equal(this.songs.at(0).get('title'), 'Epic sax guy 10 hours');
          test.equal(this.songs.at(1).get('title'), 'Amelie Soundtrack - Yann Tiersen (Original)'); 
          test.done();
        }.bind(this)
      });
    },

    error: function (test) {
      this.songs.add({ ytId: 'xxx' });
      this.songs.fetch({
        success: function (model, results) {
          test.equal(results.length, 2, 'Results should be an array of valid models');
        },
        error: function (model, results) {
          test.equal(results[0].get('ytId'), 'xxx', 'Invalid models should be results of error');
        },
        complete: function (model, results, valid, invalid) {
          test.equal(model.length, 2, 'Invalid models should be rejected from collection');
          test.equal(results.length, 3, 'Results should have all models');
          test.equal(valid.length, 2, 'Valid array should contain valid models');
          test.equal(invalid.length, 1, 'Invalid array should contain invalid models');
          test.done();
        }
      });
    }

  } 
};