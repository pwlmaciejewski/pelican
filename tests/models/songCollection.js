var sandbox = require('sandboxed-module');
var fs = require('fs');
var SongCollection = sandbox.require('../../models/songCollection.js', {
  requires: {
    './song.js': sandbox.require('../../models/song.js', {
      requires: {
        jquery: {
          ajax: function (options) {
            // Amelie
            if (options.url === 'https://gdata.youtube.com/feeds/api/videos/WYGFNjEL7Jw?v=2&alt=json') {
              options.success(JSON.parse(fs.readFileSync('fixtures/youtubeResponses/amelie.json').toString()));
            } 
            // Epic sax guy
            else if (options.url === 'https://gdata.youtube.com/feeds/api/videos/8ZcmTl_1ER8?v=2&alt=json') {
              options.success(JSON.parse(fs.readFileSync('fixtures/youtubeResponses/saxguy.json').toString()));
            } 
            else {
              options.error({
                status: 400,
                responseTest: '<errors xmlns=\'http://schemas.google.com/g/2005\'><error><domain>GData</domain><code>InvalidRequestUriException</code><internalReason>Invalid id</internalReason></error></errors>'
              });
            }
          }
        }
      }
    })
  }
});

module.exports = {
  addingNewModel: {
    setUp: function (callback) {
      this.songs = new SongCollection();
      this.songs.add({ ytId: '8ZcmTl_1ER8' });
      this.songs.add({ ytId: 'WYGFNjEL7Jw' });
      callback();
    },

    length: function (test) {
      test.equal(this.songs.length, 2, 'There should be two songs in collection');
      test.done();
    },

    fetchSuccess: function (test) {
      this.songs.fetch({
        success: function (model, results) {
          test.equal(this.songs, model, 'Model should be a first argument');
          test.equal(results[0], this.songs.at(0), 'Results should be an array of added elements');
          test.equal(this.songs.at(0).get('title'), 'Epic sax guy 10 hours');
          test.equal(this.songs.at(1).get('title'), 'Amelie Soundtrack - Yann Tiersen (Original)'); 
          test.done();
        }.bind(this)
      });
    },

    fetchError: function (test) {
      this.songs.add({ ytId: 'xxx' });
      this.songs.fetch({
        success: function (model, results) {
          test.equal(results.length, 2, 'Results should be an array of valid models');
        },
        error: function (model, results) {
          test.equal(results[0].get('ytId'), 'xxx', 'Invalid models should be results of error');
        },
        complete: function (model) {
          test.equal(model.length, 2, 'Invalid models should be rejected from collection');
          test.done();
        }
      });
    }
  }
};