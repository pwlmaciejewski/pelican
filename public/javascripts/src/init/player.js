define(['jquery', 'socketio', 'plugin/jquery.tubeplayer'], function ($, io) {
	var socket = io.connect('localhost');
	var player = $('#player');

	var init = function () {
		console.log('xxx');

		// Song change
		socket.on('songChange', function (song) {
			console.log(song);
			if (!song) {
				player.tubeplayer('play', '');
			} else {
				player.tubeplayer('play', song.ytId);
			}
		});
		
		// Ask what is we should play right now
		socket.emit('whatsPlaying?');	
	}

	$.tubeplayer.defaults.afterReady = init;

	// Initialize player
	player.tubeplayer({
		initialVideo: '',
		width: 600,
		height: 450,
		showControls: true,
		modestbranding: false,
		autoPlay: true
	});


});