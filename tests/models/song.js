var sandbox = require('sandboxed-module');
var fs = require('fs');

var Song = sandbox.require('../../models/song.js', {
  requires: { 
    request: function (options, callback) {
      // TEED - Garden
      if (options.uri === 'https://gdata.youtube.com/feeds/api/videos/KD1NTfTF21I?v=2&alt=json') {
        callback(null, { statusCode: 200 }, fs.readFileSync('fixtures/youtubeResponses/teed.garden.json').toString());
      } else {
        callback(null, { statusCode: 400 }, '<errors xmlns=\'http://schemas.google.com/g/2005\'><error><domain>GData</domain><code>InvalidRequestUriException</code><internalReason>Invalid id</internalReason></error></errors>');
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
      complete: function () {
        test.equal(song.get('url'), 'https://www.youtube.com/watch?v=KD1NTfTF21I&feature=youtube_gdata', 'Url should be valid');
        test.equal(song.get('title'), 'Totally Enormous Extinct Dinosaurs - "Garden": SXSW 2011 Showcasing Artist', 'Title should be valid');
        test.equal(song.get('thumb'), 'http://i.ytimg.com/vi/KD1NTfTF21I/default.jpg', 'Thumbnail should be valid');
        test.done();    
      }
    });

  },

  invalidVideo: function (test) {
    var song = new Song({ ytId: 'KD1NTfTF21' });
    song.fetch({
      error: function () {
        test.ok(true);
        test.done();
      }
    });
  }
};