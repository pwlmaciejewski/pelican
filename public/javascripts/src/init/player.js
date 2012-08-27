define(['jquery', 'plugin/jquery.tubeplayer'], function ($) {

	$('#player').tubeplayer({
		width: 600,
		height: 450,
		showControls: true,
		modestbranding: false,
		autoPlay: true
	});

});