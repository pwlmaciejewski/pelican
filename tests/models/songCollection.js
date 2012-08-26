var SongCollection = require('../../models/songCollection.js');

module.exports = {
	addingNewModel: function (test) {
		var songs = new SongCollection();
		songs.add({ ytId: '8ZcmTl_1ER8' });
		test.done();
	}
};