var express = require('express'), 
    routes = require('./routes'), 
    http = require('http'), 
    path = require('path'),
    flash = require('connect-flash');

var app = express();

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

// API Routes
app.get('/api/songs', routes.api.getSongs);
app.get('/api/songs/:id', routes.api.getSong);
app.post('/api/songs', routes.api.postSong);

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
