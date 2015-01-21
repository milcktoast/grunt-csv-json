'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'lib/*.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		csvjson: {
			test: {
				src: 'test/src/*.csv',
				dest: 'test/dest'
			}
		},

		clean: {
			tests: [
				'test/dest'
			]
		},

		nodeunit: {
			tests: ['test/*-test.js'],
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('test', ['clean', 'csvjson', 'nodeunit', 'clean']);
	grunt.registerTask('default', ['jshint', 'test']);
};
