module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    watch: {
      coffee: {
        files: '<config:coffee.all.src>',
        tasks: 'coffeeReset'
      }
    },

    coffee: {
      all: {
        src: [
          'models/**/*.coffee', 
          'routes/**/*.coffee', 
          'public/javascripts/src/init/**/*.coffee',
          'public/javascripts/src/model/**/*.coffee',
          'public/javascripts/src/view/**/*.coffee',
          'tests/api.coffee',
          'tests/models/**/*.coffee',
          'tests/mocks/**/*.coffee',
          'app.coffee',
          'server.coffee',
          'socket.coffee'
        ],
        dest: '<%= grunt.task.current.target %>'
      }
    },

    rm: {
      models: 'models/**/*.js',
      routes: 'routes/**/*.js',
      clientInit: 'public/javascripts/src/init/**/*.js',
      clientModel: 'public/javascripts/src/model/**/*.js',
      clientView: 'public/javascripts/src/view/**/*.js',
      testApi: 'tests/api.js',
      testModels: 'tests/models/**/*.js',
      testMocks: 'tests/mocks/*.js',
      app: 'app.js',
      server: 'server.js',
      socket: 'socket.js'
    }
  });

  // External tasks
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-rm');

  // Tasks
  grunt.registerTask('coffeeReset', 'rm coffee');
};