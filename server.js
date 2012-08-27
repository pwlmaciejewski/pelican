var http = require('http');
var app = require('./app.js');
var socket = require('./socket.js');

// Run HTTP server
var server = http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});

// Run WS server
var io = require('socket.io').listen(server);
socket(io, app.get('songs'));