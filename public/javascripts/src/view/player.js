
define(['backbone', 'mustache', 'text!/templates/player.tmpl', 'plugin/jquery.tubeplayer'], function(Backbone, Mustache, tmpl) {
  return Backbone.View.extend({
    initialize: function(options) {
      var _this = this;
      this.ready = false;
      $.tubeplayer.defaults.afterReady = function() {
        _this.$yt.hide();
        _this.ready = true;
        return _this.trigger('ready');
      };
      return this.model.on('change:song', function(song) {
        return _this.render();
      });
    },
    end: function() {
      return this.model.next();
    },
    error: function() {
      return this.model.next();
    },
    update: function() {
      var song, title;
      song = this.model.get('song');
      title = this.$el.find('.title');
      if (song) {
        this.$yt.show();
        this.$yt.tubeplayer('play', song.ytId);
        return title.html(song.title);
      } else {
        this.$yt.tubeplayer('stop');
        this.$yt.hide();
        return title.html('');
      }
    },
    $yt: null,
    render: function() {
      if (this.ready) {
        this.update();
        return;
      }
      this.ready = true;
      this.$el.html(Mustache.render(tmpl, {}));
      this.$yt = this.$el.find('.yt');
      return this.$yt.tubeplayer({
        allowFullscreen: true,
        iframed: true,
        width: 860,
        height: 500,
        showControls: true,
        modestbranding: false,
        onPlayerEnded: this.end.bind(this),
        onErrorNotEmbeddable: this.error.bind(this)
      });
    }
  });
});
