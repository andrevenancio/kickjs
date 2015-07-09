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
		},

		// grunt-contrib-cssmin
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'<%= settings.deploy %>css/style.min.css': [ '<%= settings.deploy %>css/style.css' ]
				}
			}
		},

		// grunt-contrib-uglify
		uglify: {
			options: {
				banner: '<%= settings.credits %>',
				compress: {
					drop_console: true
				}
			},
			my_target: {
				files: {
					'<%= settings.deploy %>js/app.min.js': [ '<%= settings.deploy %>js/app.js' ]
				}
			}
		},

		// grunt-targethtml
		targethtml: {
			deploy: {
				options: {
					curlyTags: {
						rlsdate: '<%= grunt.template.today("yyyymmdd ") %>'
					}
				},
				files: {
					'<%= settings.deploy %>index.html': '<%= settings.source %>static/index.html'
				}
			},
			dev: {
				files: {
					'<%= settings.deploy %>index.html': '<%= settings.source %>static/index.html'
				}
			}
		}

	} );

	// Load the plugin(s).
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-targethtml' );

	// task(s).
	grunt.registerTask( 'default', [ 'targethtml:dev', 'concat', 'uglify', 'sass:dev', 'cssmin' ] );
	grunt.registerTask( 'dev', [ 'targethtml:dev', 'concat', 'sass:dev', 'connect', 'watch:dev' ] );

};