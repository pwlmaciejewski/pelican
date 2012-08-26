var api = require('../routes/api.js');

exports.set = function (test) {
	var req = {
		body: {
			url: 'http://www.youtube.com/watch?v=AyggY_R3jU8'
		}
	};

	var res = {
		send: function (resText) {
			var json = JSON.parse(resText);
			test.ok(json.ok);
			test.ok(api.songss.where({ url: req.body.url }).length === 1);
			test.done();
		}
	};

	api.postSong(req, res);
};