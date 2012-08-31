define(['backbone', 'mustache', 'text!/templates/player.tmpl', 'plugin/jquery.tubeplayer'], function (Backbone, Mustache, tmpl) {
	return Backbone.View.extend({
    initialize: function (options) {
      this.ready = false;

      // When player is initialized
      $.tubeplayer.defaults.afterReady = function () {
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
      song = song || {
        title: '',
        ytId: 'xxx'
      };

      this.$el.find('.yt').tubeplayer('play', song.ytId);
      this.$el.find('.title').html(song.title);
    },

    render: function () {
      // If view is renered, update it
      if (this.ready) {
        this.update();
        return;
      }

      this.$el.html(Mustache.render(tmpl, {}));
      this.$el.find('.yt').tubeplayer({
        initialVideo: 'xxx',
        width: 860,
        height: 500,
        showControls: true,
        modestbranding: false,
        autoPlay: true,
        onPlayerEnded: this.end.bind(this),
        onErrorNotEmbeddable: this.error.bind(this)
      });
    }
	});
});