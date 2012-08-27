module.exports = function (io, model) {
	io.sockets.on('connection', function (socket) {
		socket.on('fetch', function () {
			socket.emit('reset', model.toJSON());
		});
	});

	model.on('add', function (song) {
		io.sockets.emit('add', song);
	});

	model.on('remove', function (song) {
		io.sockets.emit('remove', song);
	});

	model.on('change', function (song) {
		io.sockets.emit('change', song);
	});
};