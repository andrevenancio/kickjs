// kickjs __TYPE__ template
module.exports = function( grunt ) {

	grunt.initConfig( {

		// package.json
		pkg: grunt.file.readJSON( 'package.json' ),

		// credits banner
		settings: {
			credits: '/**\n * kickjs __TYPE__ <%= grunt.template.today("yyyy") %>\n * @author: <%= pkg.authors %>\n **/\n',
			source: 'source/',
			deploy: 'deploy/'
		},

		// grunt-contrib-watch
		watch: {
			dev: {
				files: [ 'Gruntfile.js', '<%= settings.source %>sass/*.sass', '<%= settings.source %>coffee/*.coffee' ],
				tasks: [ 'sass:dev', 'percolator:dev' ]
			}
		},

		// grunt-coffee-percolator-v2
        percolator: {
            dev: {
                source: 'source/coffee',
                output: 'deploy/js/app.js',
                main: 'Main.coffee',
                compile: true,
                opts: '--bare',
            }
        },

		// grunt-contrib-sass
		sass: {
			dist: {
				options: {
					noCache: false,
					sourcemap: 'none'
				}
			},
			dev: {
				files: {
					'<%= settings.deploy %>css/style.css': '<%= settings.source %>sass/style.sass'
				}
			}
		},

		// grunt-contrib-connect
		connect: {
			server: {
				options: {
					port: 0,
					base: '<%= settings.deploy %>'
				}
			}
		}

	} );

	// Load the plugin(s).
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-coffee-percolator-v2' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );

	// task(s).
	grunt.registerTask( 'default', [] );
	grunt.registerTask( 'dev', [ 'percolator:dev', 'sass:dev', 'connect', 'watch:dev' ] );

};
