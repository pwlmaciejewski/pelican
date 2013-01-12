var app, http, io, server, socket;

http = require('http');

app = require('./app.js');

socket = require('./socket.js');

server = http.createServer(app).listen(app.get('port'), function() {
  return console.log("Express server listening on port " + app.get('port'));
});

io = require('socket.io').listen(server);

socket(io, app.get('songs'));
