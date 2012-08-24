require.config({
  paths: {
    jquery: 'lib/jquery-1.8.0',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    mustache: 'lib/mustache'
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
    }
  }
});

require.config({
  baseUrl: '/javascripts/src'
});

if (init) {
  require(['init/' + init]);
}