var Backbone = require('backbone');
Backbone.setDomLibrary(require('jquery'));

var Song = Backbone.Model.extend({
  defaults: {
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

  url: function () {
    return 'https://gdata.youtube.com/feeds/api/videos/' + this.get('ytId') + '?v=2&alt=json';
  },

  parse: function (res) {
    return {
      url: res.entry.link[0].href,
      title: res.entry.title.$t,
      thumbnail: res.entry.media$group.media$thumbnail[0].url
    };
  }
}, {
  ytId: function (url) {
    return url.match(/v=([^&]*)/)[1];
  }
});

module.exports = Song;