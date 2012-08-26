var Backbone = require('backbone');
var request = require('request');

var Song = Backbone.Model.extend({
  defaults: {
    id: 0,
    url: '',
    ytId: '',
    title: '',
    thumbnail: ''
  },

  initialize: function () {
    if (!this.get('ytId')) {
      this.set('ytId', Song.ytId(this.get('url')));      
    }
  },

  fetchInfo: function (callback) {
    request({
      uri: 'https://gdata.youtube.com/feeds/api/videos/' + this.get('ytId') + '?v=2&alt=json'
    }, function (err, res, body) {
      if (res.statusCode !== 200) {
        callback(new Error('Invalid YouTube id'));
        return;
      }

      var entry = JSON.parse(body).entry;

      this.set('url', entry.link[0].href);
      this.set('title', entry.title.$t);
      this.set('thumb', entry.media$group.media$thumbnail[0].url);

      callback();
    }.bind(this));
  }
}, {
  ytId: function (url) {
    return url.match(/v=([^&]*)/)[1];
  }
});

module.exports = Song;