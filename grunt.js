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
          'public/javascripts/src/model/**/*.coffee'
        ],
        dest: '<%= grunt.task.current.target %>'
      }
    },

    rm: {
      models: 'models/**/*.js',
      routes: 'routes/**/*.js',
      clientInit: 'public/javascripts/src/init/**/*.js',
      clientModel: 'public/javascripts/src/model/**/*.js'
    }
  });

  // External tasks
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-rm');

  // Tasks
  grunt.registerTask('coffeeReset', 'rm coffee');
};