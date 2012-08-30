define(['backbone', 'plugin/jquery.tubeplayer'], function (Backbone) {
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

    initializePlayer: function () {
      this.$el.tubeplayer({
        initialVideo: '',
        width: 600,
        height: 450,
        showControls: true,
        modestbranding: false,
        autoPlay: true,
        onPlayerEnded: this.end.bind(this)
      });
    },

    render: function () {
      if (!this.ready) {
        this.initializePlayer();
        return;
      }

      var song = this.model.get('song');
      this.$el.tubeplayer('play', song ? song.ytId : 'xxx');
    }
	});
});