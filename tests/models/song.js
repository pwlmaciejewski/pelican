var Song;

Song = require('../mocks/song');

module.exports = {
  ytId: function(test) {
    test.equal(Song.ytId('http://www.youtube.com/watch?v=WrkWtJkuj0o'), 'WrkWtJkuj0o');
    test.equal(Song.ytId('http://www.youtube.com/watch?v=WrkWtJkuj0o&feature=g-vrec&foo=bar'), 'WrkWtJkuj0o');
    return test.done();
  },
  fetch: function(test) {
    var song;
    song = new Song({
      ytId: 'KD1NTfTF21I'
    });
    test.equal(song.url(), 'https://gdata.youtube.com/feeds/api/videos/KD1NTfTF21I?v=2&alt=json');
    return song.fetch({
      success: function() {
        test.equal(song.get('url'), 'https://www.youtube.com/watch?v=KD1NTfTF21I&feature=youtube_gdata', 'Url should be valid');
        test.equal(song.get('title'), 'Totally Enormous Extinct Dinosaurs - "Garden": SXSW 2011 Showcasing Artist', 'Title should be valid');
        test.equal(song.get('thumbnail'), 'http://i.ytimg.com/vi/KD1NTfTF21I/default.jpg', 'Thumbnail should be valid');
        return test.done();
      }
    });
  },
  invalidVideo: function(test) {
    var song;
    song = new Song({
      ytId: 'KD1NTfTF21'
    });
    return song.fetch({
      error: function(model) {
        test.equal(model, song, 'First argument should be a model');
        return test.done();
      }
    });
  },
  isFetched: function(test) {
    var song;
    song = new Song({
      ytId: 'KD1NTfTF21I'
    });
    test.ok(!song.isFetched());
    return song.fetch({
      success: function() {
        test.ok(song.isFetched());
        return test.done();
      }
    });
  },
  id: function(test) {
    var s1, s2;
    s1 = new Song({
      ytId: 'xxx'
    });
    s2 = new Song({
      ytId: 'xxx'
    });
    test.ok(s1.get('id') !== s2.get('id'), 'Songs should have unque id\'s');
    return test.done();
  }
};
