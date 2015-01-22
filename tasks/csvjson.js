'use strict';

var path = require('path');
var csvjson = require('../lib/index');

var defaultOptions = {
	/*jshint camelcase:false*/
	parserOptions : {
		auto_parse : true
	}
};

module.exports = function(grunt) {
	grunt.registerMultiTask('csvjson', 'Generate static JSON from CSV data', function() {
		var options = this.options(defaultOptions);
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
			csvjson.process(grunt.file.read(src), options, function (err, sets) {
				sets.forEach(function (set) {
					var name = (set.name || path.basename(src, '.csv'));
					var fileName = path.join(dest, name + '.json');
					var data = JSON.stringify(set.data);

					grunt.file.write(fileName, data);
					grunt.log.writeln('File ' + fileName.cyan + ' created.');
				});

				end();
			});
		}

		this.files.forEach(function (files) {
			files.src.forEach(processFile.bind(null, files.dest));
		});
	});
};
