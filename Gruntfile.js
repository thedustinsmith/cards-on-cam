module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			dev: {
				options: {
					port: 8000,
					base: 'dist/'
				}
			}
		},

		clean: {
			all: ['dist']
		},

		assemble: {
			options: {
				engine: 'swig',
				layout: false,
				partials: ['src/layouts/**/*.swig'],
				flatten: true,
				swig: {
					varControls: ["{%=", "%}"],
					cache: false
				},
			},
			dist: {
				files: {
					'dist/': ["src/pages/**/*.swig" ]
				}
			}
		},

		copy: {
			dist: {
				files: [
					{ expand: true, flatten: true, src: 'src/assets/static/js/**', dest: 'dist/js/', filter: 'isFile' },
					{ expand: true, flatten: true, src: 'src/assets/static/*.*', dest: 'dist/' }

				]
			},
			js: {
				files: [
					{ expand: true, cwd: 'src/assets/js', src:'**', dest: 'dist/js/', filter: 'isFile' }
				]
			}
		},

		less: {
			development: {
				options: {
					paths: ['assets/css'],
					cleancss: true
				},
				files: {
					'dist/css/all.min.css': ['src/assets/css/main.less']
				}
			}
		},

		uglify: {
			dist: {
				files: {
					'dist/js/all.min.js': ['dist/js/all.min.js']
				}
			}
		},

		watch: {
			assets: {
				files: ['src/assets/**/*'],
				tasks: ['copy', 'less' ]
			},
			src: {
				files: ['src/layouts/**/*', 'src/pages/**/*'],
				tasks: ['assemble']
			}
		}, 

		useminPrepare: {
			html: 'dist/**/*.html',
			options: {
				dest: 'dist',
				root: 'src/assets'
			}
		},

		usemin: {
			html: ['dist/{,*/}*.html'],
			// css: ['dist/css/{,*/}*.css'],
			options: {
				dirs: ['dist']
			}
		}
	});

	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-newer');

	/* grunt tasks */
	grunt.registerTask('default', [
		'clean', 
		'copy', 
		'less', 
		'assemble', 
		'connect', 
		'watch']);


	grunt.registerTask('prod', [
		'clean', 
		'assemble', 
		'useminPrepare', 
		'concat:generated', 
		'uglify:generated', 
		'less', 
		'usemin', 
		'connect::keepalive'
	]);
};