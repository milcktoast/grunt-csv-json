'use strict';

var path = require('path');
var csvjson = require('../lib/index');

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
			csvjson.process(grunt.file.read(src), function (err, sets) {
				sets.forEach(function (set) {
					var name = (set.name || path.basename(src, '.csv'));
					var fileName = path.join(dest, name + '.json');
					var data = JSON.stringify(set.data);

					grunt.log.ok('Generated ' + fileName);
					grunt.file.write(fileName, data);
				});

				end();
			});
		}

		this.files.forEach(function (files) {
			files.src.forEach(processFile.bind(null, files.dest));
		});
	});
};
