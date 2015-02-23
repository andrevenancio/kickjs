# https://www.npmjs.com/package/kickjs

module.exports = (grunt) ->
    grunt.initConfig

        # grunt-contrib-copy
        copy:
            main:
                files: [{expand: true, flatten: true, src: ['static/**'], dest: 'deploy/', filter: 'isFile'},]

        # grunt-contrib-watch
        watch:
            dev:
                files: ['Gruntfile.coffee', 'coffee/**/*coffee', 'sass/*.sass']
                tasks: ['percolator:dev', 'sass:dev']

        # grunt-coffee-percolator-v2
        percolator:
            dev:
                source: 'coffee'
                output: 'deploy/js/app.js'
                main: 'App.coffee'
                compile: true
                opts: "--bare"

        # grunt-contrib-sass
        sass:
            dist:
                options:
                    noCache: false
            dev:
                files:
                    'deploy/css/style.css': 'sass/style.sass'

        # grunt-contrib-connect
        connect:
            server:
                options:
                    port: 8989,
                    base: 'deploy/'
        
        # grunt-closure-compiler
        'closure-compiler':
            frontend:
                closurePath: 'utils/closure-compiler'
                js: 'deploy/js/app.js'
                jsOutputFile: 'deploy/js/app.min.js'
                maxBuffer: 500
                options:
                    compilation_level: 'ADVANCED_OPTIMIZATIONS'
                    language_in: 'ECMASCRIPT5_STRICT'

    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-coffee-percolator-v2'
    grunt.loadNpmTasks 'grunt-contrib-sass'
    grunt.loadNpmTasks 'grunt-contrib-connect'
    grunt.loadNpmTasks 'grunt-closure-compiler'

    grunt.registerTask 'default', ['copy', 'percolator:dev', 'sass:dev', 'closure-compiler']
    grunt.registerTask 'dev', ['copy', 'percolator:dev', 'sass:dev', 'connect', 'watch:dev']
