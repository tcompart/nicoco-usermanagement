module.exports = function (grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		bower: grunt.file.readJSON('.bowerrc'),
		config: {
			base: '.',
			src: '<%= config.base %>/src',
			test: '<%= config.base %>/test',
			srcJs: ['<%= config.src %>/app/**/module.js', '<%= config.src %>/app/**/*.js'],
			testJs: '<%= config.test %>/**/*.spec.js',
			dist: 'dist',
			temp: '.tmp',
			templateName: 'index.html',
			htmlTemplate: '<%= config.src %>/<%= config.templateName %>'
		},
		jshint: {
			files: ['Gruntfile.js', '<%= config.srcJs %>', '<%= config.testJs %>']
		},
		injector: {
			app: {
				options: {
					addRootSlash: false,
					relative: false,
					ignorePath: './src/'
				},
				files: {'<%= config.htmlTemplate %>': ['<%= config.srcJs %>']}
			},
			css: {
				options: {
					addRootSlash: false,
					relative: false,
					ignorePath: './tmp/'
				},
				files: {'<%= config.htmlTemplate %>': ['<%= config.temp %>/**/*.css']}
			}
		},
		wiredep: {
			options: {
				cwd: '.'
			},
			app: {
				src: ['<%= config.htmlTemplate %>'],
				ignorePath: /\.\.\//
			}
		},
		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			app: {
				files: [
					{
						expand: true,
						src: ['<%= config.srcJs %>'],
						dest: '<%= config.temp %>'
					}
				]
			}
		},
		ngtemplates: {
			options: {
				module: 'SourceClear',
				url: function (templateString) {
					return '/' + templateString;
				}
			},
			serve: {
				cwd: '<%= config.src %>/',
				src: [
					'**/*.html',
					'!index.html',
					'!404.html'
				],
				dest: '<%= config.temp %>/scripts/templates.js'
			},
			dist: {
				cwd: '<%= config.src %>',
				src: [
					'**/*.html',
					'!index.html',
					'!404.html'
				],
				dest: '<%= config.temp %>/scripts/templates.js',
				options: {
					usemin: 'scripts/app.js' // <~~ This came from the <!-- build:js --> block
				}
			}
		},
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					'<%= config.temp %>/styles/main.css': '<%= config.src %>/less/main.less'
				}
			}
		},
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer-core')({
						browsers: ['last 3 versions']
					})
				]
			},
			dist: {
				src: '<%= config.temp %>/**/*.css'
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.src %>',
					dest: '<%= config.dist %>',
					src: [
						'*.{ico,png,txt}',
						'index.html',
						'404.html',
						'images/{,*/}*.{webp}',
						'fonts/**/*'
					]
				}, {
					expand: true,
					cwd: '<%= config.temp %>/images',
					dest: '<%= config.dist %>/images',
					src: ['generated/*']
				}, {
					expand: true,
					cwd: '<%= bower.directory %>/components-font-awesome/fonts',
					src: '*',
					dest: '<%= config.dist %>/fonts'
				}]
			}
		},
		filerev: {
			dist: {
				src: [
					'<%= config.temp %>/scripts/templates.js',
					'<%= config.dist %>/scripts/{,*/}*.js',
					'<%= config.dist %>/styles/{,*/}*.css',
					'<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= config.dist %>/styles/fonts/*'
				]
			}
		},
		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			dist: {
				options: {
					base: '<%= config.dist %>',
					livereload: true
				}
			}
		},
		useminPrepare: {
			html: ['<%= config.htmlTemplate %>'],
			options: {
				dest: '<%= config.dist %>',
				flow: {steps: {'js': ['concat', 'uglifyjs'], 'css': ['concat']}, post: {}}
			}
		},
		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin: {
			options: {
				dirs: ['<%= config.dist %>', '<%= config.dist %>/images']
			},
			html: ['<%= config.dist %>/**/*.html'],
			js: ['<%= config.dist %>/**/*.js'],
			css: ['<%= config.dist %>/**/*.css']
		},
		uglify: {
			options: {
				mangle: false
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= config.dist %>/images'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/images',
					src: '{,*/}*.svg',
					dest: '<%= config.dist %>/images'
				}]
			}
		},
		cssmin: {
			dist: {
				files: {
					'<%= config.dist %>/styles/main.css': [
						'<%= config.temp %>/styles/{,*/}*.css'
					]
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					src: ['*.html', 'views/{,*/}*.html'],
					dest: '<%= config.dist %>'
				}]
			}
		},
		concurrent: {
			server: [],
			test: [],
			dist: [
				'imagemin',
				'svgmin'
			]
		},
		karma: {
			unit: {
				configFile: '<%= config.test %>/karma.conf.js',
				singleRun: true
			}
		},
		watch: {
			options: {
				dateFormat: function (time) {
					grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
					grunt.log.writeln('Waiting for more changes...');
				}
			},
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			configFiles: {
				files: ['Gruntfile.js', 'config/*.js'],
				options: {
					reload: true
				}
			},
			styles: {
				files: '<%= config.src %>/**/*.less',
				tasks: ['buildStyles']
			},
			htmls: {
				files: ['<%= config.src %>/**/*.html'],
				tasks: ['injector', 'buildHtml']
			},
			scripts: {
				files: ['<%= config.src %>/**/*.js'],
				tasks: ['buildScripts']
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'<%= config.temp %>',
						'<%= config.dist %>'
					]
				}]
			},
			server: '<%= config.temp %>'
		}
	});

	grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'package',
			'connect',
			'watch'
		]);
	});


	grunt.registerTask('default', ['package']);
	grunt.registerTask('buildHtml', [
		'clean:server',
		'injector',
		'ngtemplates:dist',
		'useminPrepare',
		'copy:dist',
		'usemin',
		'htmlmin'
	]);
	grunt.registerTask('buildStyles', [
		'clean:server',
		'package'
	]);
	grunt.registerTask('buildScripts', [
		'clean:server',
		'ngAnnotate',
		'injector',
		'ngtemplates:dist',
		'useminPrepare',
		'concat',
		'uglify',
		'copy:dist',
		'filerev',
		'usemin:js'
	]);
	grunt.registerTask('package', [
		'clean',
		'wiredep',
		'ngAnnotate',
		'injector',
		'ngtemplates:dist',
		'concurrent:dist',
		'useminPrepare',
		'concat',
		'uglify',
		'less',
		'postcss',
		'copy:dist',
		'cssmin',
		'filerev',
		'usemin',
		'htmlmin']);
	grunt.registerTask('build', [
		'clean:dist',
		'package',
		'clean:server'
	]);


};
