'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    app: {
      src: '.',
      dest: '_site',
      bower: 'bower_components'
    },
    timestamp: Date.now(),
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dest: ['<%= app.dest %>/*'],
      options: {
        'no-write': false
      }
    },
    copy: {
	  main: {
		expand: true,
		cwd: '<%= app.bower %>/bootstrap-css-only/css',
		src: ['*.css', '!*.min.css'],
		dest: '<%= app.src %>/css',
		flatten: true,
		filter: 'isFile',
	  },
	},
    cssmin: {
      options: {
        debug: true,
        rebase: false,
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
			files: [{
			  expand: true,
			  cwd: '<%= app.src %>/css',
			  src: ['*.css', '!*.min.css'],
			  dest: '<%= app.src %>/css',
			  ext: '.min.css'
			}]
      }
    },
    exec: {
		build: {
		  cmd: 'bundle exec jekyll build'
		},
		serve: {
		  cmd: 'bundle exec jekyll serve'
		}
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js'
      ]
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.registerTask('default', ['clean:dest', 'jshint']);
  grunt.registerTask('jekyllBuild', ['default','exec:build']);
  grunt.registerTask('jekyllServe', ['default','exec:serve']);
};
