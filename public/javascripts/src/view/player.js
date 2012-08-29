define(['backbone', 'plugin/jquery.tubeplayer'], function (Backbone) {
	return Backbone.View.extend({
    initialize: function (options) {
      $.tubeplayer.defaults.afterReady = function () {
        this.ready();
      }.bind(this);

      this.ready = options.ready || function () {};

      this.model.on('change:song', function (song) {
        var song = this.model.get('song');
        console.log(song);
        this.$el.tubeplayer('play', song ? song.ytId : '');
      }, this);
    },

    render: function () {
      this.ready = false;
      this.$el.tubeplayer({
        initialVideo: '',
        width: 600,
        height: 450,
        showControls: true,
        modestbranding: false,
        autoPlay: true
      });
    }
	});
});