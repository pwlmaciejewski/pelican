var sandbox = require('sandboxed-module');
var fs = require('fs');

var Song = sandbox.require('../../models/song.js', {
  requires: { 
    jquery:  {
      ajax: function (options) {
        // TEED - Garden
        if (options.url === 'https://gdata.youtube.com/feeds/api/videos/KD1NTfTF21I?v=2&alt=json') {
          options.success(JSON.parse(fs.readFileSync('fixtures/youtubeResponses/teed.garden.json').toString()));
        } else {
          options.error({
            status: 400,
            responseTest: '<errors xmlns=\'http://schemas.google.com/g/2005\'><error><domain>GData</domain><code>InvalidRequestUriException</code><internalReason>Invalid id</internalReason></error></errors>'
          });
        }        
      }
    }
  }
});

module.exports = {
  ytId: function (test) {
    test.equal(Song.ytId('http://www.youtube.com/watch?v=WrkWtJkuj0o'), 'WrkWtJkuj0o');
    test.equal(Song.ytId('http://www.youtube.com/watch?v=WrkWtJkuj0o&feature=g-vrec&foo=bar'), 'WrkWtJkuj0o');
    test.done();
  },

  fetch: function (test) {
    var song = new Song({ ytId: 'KD1NTfTF21I' });
    test.equal(song.url(), 'https://gdata.youtube.com/feeds/api/videos/KD1NTfTF21I?v=2&alt=json');
    song.fetch({
      success: function () {
        test.equal(song.get('url'), 'https://www.youtube.com/watch?v=KD1NTfTF21I&feature=youtube_gdata', 'Url should be valid');
        test.equal(song.get('title'), 'Totally Enormous Extinct Dinosaurs - "Garden": SXSW 2011 Showcasing Artist', 'Title should be valid');
        test.equal(song.get('thumbnail'), 'http://i.ytimg.com/vi/KD1NTfTF21I/default.jpg', 'Thumbnail should be valid');
        test.done();    
      }
    });

  },

  invalidVideo: function (test) {
    var song = new Song({ ytId: 'KD1NTfTF21' });
    song.fetch({
      error: function (model) {
        test.equal(model, song, 'First argument should be a model');
        test.done();
      }
    });
  },

  isFetched: function (test) {
    var song = new Song({ ytId: 'KD1NTfTF21I' });
    test.ok(!song.isFetched());
    song.fetch({
      success: function () {
        test.ok(song.isFetched());
        test.done();        
      }
    });
  },

  id: function (test) {
    var s1 = new Song({ ytId: 'xxx' });
    var s2 = new Song({ ytId: 'xxx' });
    test.ok(s1.get('id') !== s2.get('id'), 'Songs should have unque id\'s');
    test.done();
  }
};