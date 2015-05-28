var path = require('path');
var fs = require('fs');
var destBase = path.join(__dirname, 'dest');

function readJsonFile(name) {
	var contents = fs.readFileSync(path.join(destBase, name + '.json'));
	return JSON.parse(contents);
}

exports.generate = {
	'generate resources sheet-a' : function (t) {
		t.deepEqual(readJsonFile('resource-a'), {
			'some' : {
				'item' : 'value 1',
				'other' : {
					'item' : 'value 2'
				}
			},
			'an' : {
				'array' : [0, 1, 2]
			}
		});

		t.deepEqual(readJsonFile('resource-b'), {
			'some' : {
				'item' : 'value 3',
				'other' : {
					'item' : 'value 4'
				}
			},
			'an' : {
				'array' : [3, 4, 5.67]
			}
		});

		t.done();
	},

	'generate resources sheet-b' : function (t) {
		t.deepEqual(readJsonFile('product'), {
			'name' : 'apple',
			'description' : 'red and delicious',
			'price' : 1.09
		});

		t.done();
	}
};
