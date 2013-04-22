express = require 'express'
routes = require './route'
path = require 'path'
flash = require 'connect-flash'
app = express()

# Configuration
app.configure ->
	app.set 'port', process.env.PORT || 3000
	app.set 'views', __dirname + '/view'
	app.set 'view engine', 'jade'
	app.use express.favicon()
	app.use express.logger('dev')
	app.use express.bodyParser()
	app.use express.cookieParser()
	app.use express.session({ secret: 'sasadffd'})
	app.use flash()
	app.use express.methodOverride()
	app.use express.static(path.join(__dirname, '/../public'))
	app.use app.router

app.configure 'development', ->
	app.use express.errorHandler()

# Web routes
app.get '/songs', routes.web.songs
app.get '/player', (req, res, next) ->
	if  req.connection.remoteAddress != '127.0.0.1' then res.send ''
	else next()
, routes.web.player
app.get '/add', routes.web.add
app.post '/add', routes.web.postAdd

# REST Routes
app.get '/api/songs', routes.api.getSongs
app.get '/api/songs/:id', routes.api.getSong
app.post '/api/songs', routes.api.postSong
app.get '/api/nowPlaying', routes.api.getNowPlaying

# Default route
app.get '*', (req, res) ->	res.redirect '/songs'

# Expose songs
app.set 'songs', routes.api.songs

module.exports = app