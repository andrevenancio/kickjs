module.exports = (grunt) ->
    grunt.initConfig

        #watch for changes in files
        watch:
            app:
                files: ['Gruntfile.coffee', 'coffee/*coffee', 'coffee/**/*.coffee', 'sass/*.sass']
                tasks: ['percolator:app', 'sass:app']

        #compile coffee files
        percolator:
            app:
                source: 'coffee'
                output: 'website/js/app.js'
                main: 'App.coffee'
                compile: true
                opts: "--bare"

        #compile sass files
        sass:
            dist:
                options:
                    noCache: false
            app:
                files:
                    'website/css/style.css': 'sass/style.sass'  

    grunt.loadNpmTasks 'grunt-coffee-percolator-v2'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-sass'

    grunt.registerTask 'default', ['percolator:app', 'sass:app']
    grunt.registerTask 'app', ['percolator:app', 'sass:app', 'watch:app']
