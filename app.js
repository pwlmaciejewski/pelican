var express = require('express');
var routes = require('./routes'); 
var path = require('path');
var flash = require('connect-flash');
var app = express();

// Configuration
app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'sasadffd'}));
  app.use(flash());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

// Web routes
app.get('/songs', routes.web.songs);
app.get('/player', routes.web.player);
app.get('/add', routes.web.add);
app.post('/add', routes.web.postAdd);

// REST Routes
app.get('/api/songs', routes.api.getSongs);
app.get('/api/songs/:id', routes.api.getSong);
app.post('/api/songs', routes.api.postSong);

// Expose songs
app.set('songs', routes.api.songs);

module.exports = app;