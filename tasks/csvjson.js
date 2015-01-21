'use strict';

var path = require('path');
var csvjson = require('../lib/csvjson');

module.exports = function(grunt) {
	grunt.registerMultiTask('csvjson', 'Generate static JSON from CSV data', function() {
		var done = this.async();
		var inProgress = 0;

		function start() {
			inProgress ++;
		}

		function end() {
			if (-- inProgress === 0) {
				done();
			}
		}

		function processFile(dest, src) {
			start();
			csvjson.process(grunt.file.read(src), function (err, tree) {
				var name = path.basename(src, '.csv') + '.json';
				var fileName = path.join(dest, name);
				var data = JSON.stringify(tree);

				grunt.file.write(fileName, data);
				end();
			});
		}

		this.files.forEach(function (files) {
			files.src.forEach(processFile.bind(null, files.dest));
		});
	});
};
