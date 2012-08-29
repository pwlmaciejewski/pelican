define(['backbone', 'plugin/jquery.tubeplayer'], function (Backbone) {
	return Backbone.View.extend({
    ready: false,

    initialize: function () {
      $.tubeplayer.defaults.afterReady = function () {
        this.read = true;
      }.bind(this);

      this.model.on('change:song', function () {
        console.log('change song', arguments);
        // player.tubeplayer('play', song.ytId);
      });
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