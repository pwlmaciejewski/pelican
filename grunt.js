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
        src: ['models/**/*.coffee', 'routes/**/*.coffee', 'public/javascripts/src/init/**/*.coffee'],
        dest: '<%= grunt.task.current.target %>'
      }
    },

    rm: {
      models: 'models/**/*.js',
      routes: 'routes/**/*.js',
      publicInit: 'public/javascripts/src/init/**/*.js'
    }
  });

  // External tasks
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-rm');

  // Tasks
  grunt.registerTask('coffeeReset', 'rm coffee');
};