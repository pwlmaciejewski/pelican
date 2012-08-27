require.config({
  paths: {
    jquery: 'lib/jquery-1.8.0',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    mustache: 'lib/mustache',
    socketio: '/socket.io/socket.io.js'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    socketio: {
      exports: 'io'
    },
    'plugin/jquery.tubeplayer': ['jquery']
  }
});

require.config({
  baseUrl: '/javascripts/src'
});

if (window['init']) {
  require(['init/' + init]);
}