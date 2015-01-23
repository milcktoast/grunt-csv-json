var CsvDoc = require('../lib/CsvDoc');

exports.doc = {
	'format single resource' : function (t) {
		var doc = CsvDoc.create();
		var data = doc.formatRows([
			['key', 'resource'],
			['key-one', 'one'],
			['key-two', 'two']
		]);

		t.deepEqual(data.names, ['resource']);
		t.deepEqual(data.keys, ['key-one', 'key-two']);
		t.deepEqual(data.sets, [['one', 'two']]);

		t.done();
	},

	'format multiple resources' : function (t) {
		var doc = CsvDoc.create();
		var data = doc.formatRows([
			['key', 'resource-a', 'resource-b'],
			['key-one', 'one-a', 'one-b'],
			['key-two', 'two-a', 'two-b']
		]);

		t.deepEqual(data.names, ['resource-a', 'resource-b']);
		t.deepEqual(data.keys, ['key-one', 'key-two']);
		t.deepEqual(data.sets, [['one-a', 'two-a'], ['one-b', 'two-b']]);

		t.done();
	},

	'process field values' : function (t) {
		var doc = CsvDoc.create({
			processValue : function (key, value) {
				return value.replace(/\_(\w+)\_/g, '<em>$1</em>');
			}
		});

		var data = doc.formatRows([
			['key', 'resource'],
			['copy', 'Something with _emphasis_.']
		]);

		t.equal(data.sets[0][0], 'Something with <em>emphasis</em>.');

		t.done();
	}
};
