(function() {
  var Backbone, Song, request, _,
    _this = this;

  Backbone = require('backbone');

  request = require('request');

  _ = require('underscore');

  Song = Backbone.Model.extend({
    defaults: {
      url: '',
      ytId: '',
      title: '',
      thumbnail: ''
    },
    initialize: (function() {
      var id;

      id = 0;
      return function() {
        this.set('id', id, {
          silent: true
        });
        id += 1;
        if (!this.get('ytId')) {
          return this.set('ytId', Song.ytId(this.get('url')));
        }
      };
    })(),
    url: function() {
      return 'https://gdata.youtube.com/feeds/api/videos/' + this.get('ytId') + '?v=2&alt=json';
    },
    parse: function(res) {
      return {
        url: res.entry.link[0].href,
        title: res.entry.title.$t,
        thumbnail: res.entry.media$group.media$thumbnail[0].url
      };
    },
    fetch: function(options) {
      var _this = this;

      options = options ? _.clone(options) : {};
      options.success = options.success || function() {};
      options.error = options.error || function() {};
      return request({
        uri: this.url()
      }, function(err, res, body) {
        if (res.statusCode !== 200) {
          options.error(_this);
          return;
        }
        _this.set(_this.parse(JSON.parse(body)));
        return options.success(_this);
      });
    },
    isFetched: function() {
      return this.get('title') !== '';
    }
  }, {
    ytId: function(url) {
      return url.match(/v=([^&]*)/)[1];
    }
  });

  module.exports = Song;

}).call(this);
