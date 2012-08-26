var api = require('./api');

var web = {
  songs: function (req, res) {
    res.render('songs');
  },

  player: function (req, res) {
    res.render('player');
  },

  add: function (req, res) {
    res.render('add', { info: req.flash('info') });
  },

  postAdd: function (req, res) {
    var url = req.body.url;

    if (!url) {
      req.flash('info', 'Invalid input');
      web.add(req, res);
      return;
    }

    api.postSong(req, res);
    res.redirect('/songs');
  }
};

module.exports = web;