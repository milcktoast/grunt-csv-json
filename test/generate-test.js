var path = require('path');
var fs = require('fs');

exports.generate = {
	'generate json' : function (t) {
		var destBase = path.join(__dirname, 'dest');

		function readJsonFile(name) {
			var contents = fs.readFileSync(path.join(destBase, name + '.json'));
			return JSON.parse(contents);
		}

		t.deepEqual(readJsonFile('set-a'), {
			'some' : {
				'item' : 'value 1',
				'other' : {
					'item' : 'value 2'
				}
			},
			'an' : {
				'array' : ['0', '1', '2']
			}
		});

		t.done();
	}
};
