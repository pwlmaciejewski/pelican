#!/usr/bin/env node

var reporter = require('nodeunit').reporters.default;

process.chdir(__dirname);
reporter.run(['./models/song.js', './models/songCollection.js']);