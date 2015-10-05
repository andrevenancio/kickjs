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
				files: [ 'Gruntfile.js', '<%= settings.source %>sass/*.sass' ],
				tasks: [ 'sass:dev', 'concat' ]
			}
		},

		// grunt-contrib-concat
		concat: {
			options: {
				stripBanners: true,
				banner: '<%= settings.credits %>',
			},
			dist: {
				src: [ '<%= settings.source %>js/**/*.js' ],
				dest: '<%= settings.deploy %>js/app.js',
			},
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
					port: 8989,
					base: '<%= settings.deploy %>'
				}
			}
		}

	} );

	// Load the plugin(s).
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );

	// task(s).
	grunt.registerTask( 'default', [] );
	grunt.registerTask( 'dev', [ 'concat', 'sass:dev', 'connect', 'watch:dev' ] );

};
