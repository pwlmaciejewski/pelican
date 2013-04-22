(function() {
  var app, express, flash, path, routes;

  express = require('express');

  routes = require('./route');

  path = require('path');

  flash = require('connect-flash');

  app = express();

  app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/view');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
      secret: 'sasadffd'
    }));
    app.use(flash());
    app.use(express.methodOverride());
    app.use(express["static"](path.join(__dirname, '/../public')));
    return app.use(app.router);
  });

  app.configure('development', function() {
    return app.use(express.errorHandler());
  });

  app.get('/songs', routes.web.songs);

  app.get('/player', function(req, res, next) {
    if (req.connection.remoteAddress !== '127.0.0.1') {
      return res.send('');
    } else {
      return next();
    }
  }, routes.web.player);

  app.get('/add', routes.web.add);

  app.post('/add', routes.web.postAdd);

  app.get('/api/songs', routes.api.getSongs);

  app.get('/api/songs/:id', routes.api.getSong);

  app.post('/api/songs', routes.api.postSong);

  app.get('/api/nowPlaying', routes.api.getNowPlaying);

  app.get('*', function(req, res) {
    return res.redirect('/songs');
  });

  app.set('songs', routes.api.songs);

  module.exports = app;

}).call(this);
