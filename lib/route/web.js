(function() {
  var api, web;

  api = require('./api');

  web = {
    songs: function(req, res) {
      return res.render('songs');
    },
    player: function(req, res) {
      return res.render('player');
    },
    add: function(req, res) {
      return res.render('add', {
        info: req.flash('info')
      });
    },
    postAdd: function(req, res) {
      var url;

      url = req.body.url;
      if (!url) {
        req.flash('info', 'Invalid input');
        web.add(req, res);
        return;
      }
      return api.postSong(req, {
        send: function(txt) {
          return res.redirect('/songs');
        }
      });
    }
  };

  module.exports = web;

}).call(this);
