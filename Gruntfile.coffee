module.exports = (grunt) ->
  grunt.initConfig
    watch:
      coffee:
        files: '<%= coffee.all.src %>'
        tasks: 'coffeeReset'

    coffee: 
      all:
        expand: true
        src: [
          'lib/**/*.coffee'
          'public/javascripts/src/init/**/*.coffee'
          'public/javascripts/src/model/**/*.coffee'
          'public/javascripts/src/view/**/*.coffee'
          'test/**/*.coffee'
        ]
        ext: '.js'

    clean: [
      'lib/*/**.js'
      'public/javascripts/src/init/**/*.js'
      'public/javascripts/src/model/**/*.js'
      'public/javascripts/src/view/**/*.js'
      'test/**/*.js'
    ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'coffeeReset', ['clean', 'coffee']
  grunt.registerTask 'default', ['coffeeReset', 'buster']