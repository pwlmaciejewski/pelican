http = require 'http'
app = require './app.js'
socket = require './socketServer.js'

# Run HTTP server
server = http.createServer(app).listen app.get('port'), ->
	console.log "Express server listening on port " + app.get('port')

# Run WS server
io = require('socket.io').listen(server)
socket io, app.get('songs')