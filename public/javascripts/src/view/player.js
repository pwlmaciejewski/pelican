define(['backbone', 'mustache', 'text!/templates/player.tmpl', 'plugin/jquery.tubeplayer'], function (Backbone, Mustache, tmpl) {
	return Backbone.View.extend({
    initialize: function (options) {
      this.ready = false;

      // When player is initialized
      $.tubeplayer.defaults.afterReady = function () {
        this.$yt.hide();
        this.ready = true;
        this.trigger('ready');
      }.bind(this);

      // Song change
      this.model.on('change:song', function (song) {
        this.render();
      }, this);
    },

    end: function () {
      this.model.next();
    },

    error: function () {
      this.model.next();
    },

    update: function () {
      var song = this.model.get('song');
      var title = this.$el.find('.title');

      if (song) {
        this.$yt.show();
        this.$yt.tubeplayer('play', song.ytId);
        title.html(song.title);
      } else {
        this.$yt.tubeplayer('stop');
        this.$yt.hide();
        title.html('');
      }
    },

    // YouTube player node
    $yt: null,

    render: function () {
      // If view is renered, update it
      if (this.ready) {
        this.update();
        return;
      }
      this.ready = true;

      this.$el.html(Mustache.render(tmpl, {}));
      this.$yt = this.$el.find('.yt');
      this.$yt.tubeplayer({
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