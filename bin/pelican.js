#!/usr/bin/env node

var exec = require('child_process').exec;
var optimist = require('optimist')
  .usage('$0 [start|stop|list]')
  .demand(1);
var argv = optimist.argv;

process.chdir(__dirname);
var foreverPath = '../node_modules/forever/bin/forever ';
var action = argv._[0];
if (action === 'start') {
  
  exec(foreverPath + 'start ../server.js', [], function (err, stdout, stderr) {
    console.log(stdout);
  });

} else if (action === 'stop') {
  
  exec(foreverPath + 'stopall', [], function (err, stdout, stderr) {
    console.log(stdout);
  });

} else if (action === 'list') {
  
  exec(foreverPath + 'list', [], function (err, stdout, stderr) {
    console.log(stdout);
  });

} else {
  optimist.showHelp();
}