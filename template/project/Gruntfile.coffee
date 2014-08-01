module.exports = (grunt) ->
  grunt.initConfig

    #watch for changes in files
    watch:
      app:
        files: ['Gruntfile.coffee', 'coffee/app/*coffee', 'coffee/app/**/*.coffee']
        tasks: ['percolator:app']

    #compile coffee files
    percolator:
      app:
        source: 'coffee'
        output: 'website/js/app.js'
        main: 'App.coffee'
        compile: true
        opts: "--bare"

  grunt.loadNpmTasks 'grunt-coffee-percolator-v2'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ->
    console.log 'failing gracefully. please specify grunt task needed'

  grunt.registerTask 'app', ['percolator:app', 'watch:app']
