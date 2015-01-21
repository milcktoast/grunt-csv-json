var DataTree = require('../lib/DataTree');

exports.tree = {
	'walk tree' : function (t) {
		var tree = DataTree.create();
		var root = tree.getRoot();

		tree.addValue('some.nested.item', 0);
		tree.addValue('some.other.deeper.item', 1);

		t.equal(root.some.nested.item, 0);
		t.equal(root.some.other.deeper.item, 1);

		t.done();
	},

	'add array values' : function (t) {
		var tree = DataTree.create();
		var root = tree.getRoot();
		var key = 'some.array.path';

		tree.addValue(key, 0);
		tree.addValue(key, 1);
		tree.addValue(key, 2);

		t.equal(root.some.array.path[0], 0);
		t.equal(root.some.array.path[1], 1);
		t.equal(root.some.array.path[2], 2);

		t.done();
	}
};
