var api = require('../routes/api.js');

exports.linkSet = function (test) {
	api.postSong({
		body: {
			url: 'http://www.youtube.com/watch?v=AyggY_R3jU8'
		}
	}, {
		send: function (resText) {
			var json = JSON.parse(resText);
			test.ok(json.ok);
			test.ok(api.songs.where({ url: req.body.url }).length === 1);
			test.done();
		}
	});
};