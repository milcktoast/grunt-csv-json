var CsvDoc = require('../lib/CsvDoc');

exports.doc = {
	'format single resource' : function (t) {
		var doc = CsvDoc.create();
		var data = doc.formatRows([
			['key', 'resource'],
			['a', 'one'],
			['b', 'two']
		]);

		t.deepEqual(data.names, ['resource']);
		t.deepEqual(data.keys, ['a', 'b']);
		t.deepEqual(data.sets, [['one', 'two']]);

		t.done();
	},

	'format multiple resources' : function (t) {
		var doc = CsvDoc.create();
		var data = doc.formatRows([
			['key', 'resource-a', 'resource-b'],
			['a', 'one-a', 'one-b'],
			['b', 'two-a', 'two-b']
		]);

		t.deepEqual(data.names, ['resource-a', 'resource-b']);
		t.deepEqual(data.keys, ['a', 'b']);
		t.deepEqual(data.sets, [['one-a', 'two-a'], ['one-b', 'two-b']]);

		t.done();
	}
};
