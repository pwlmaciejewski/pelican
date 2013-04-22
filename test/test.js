(function() {
  var reporter;

  reporter = require('nodeunit').reporters["default"];

  process.chdir(__dirname);

  reporter.run(['./server/model/song.js', './server/model/songCollection.js', './server/model/playlist.js', './server/api.js']);

}).call(this);
