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

	'walk delimiter' : function (t) {
		var tree = DataTree.create();
		var root = tree.getRoot();

		tree.delimiter = '/';

		tree.addValue('some/nested/item', 0);
		tree.addValue('some/other/deeper/item', 1);

		t.equal(root.some.nested.item, 0);
		t.equal(root.some.other.deeper.item, 1);

		t.done();
	},

	'implicit array' : function (t) {
		var tree = DataTree.create();
		var root = tree.getRoot();
		var key = 'some.array.path';

		tree.addValue(key, 0);
		tree.addValue(key, 1);
		tree.addValue(key, 2);

		t.ok(Array.isArray(root.some.array.path));

		t.equal(root.some.array.path[0], 0);
		t.equal(root.some.array.path[1], 1);
		t.equal(root.some.array.path[2], 2);

		t.done();
	},

	'explicit array' : function (t) {
		var tree = DataTree.create();
		var root = tree.getRoot();

		tree.addValue('item.0', 0);
		tree.addValue('item.1', 1);
		tree.addValue('item.2', 2);

		t.ok(Array.isArray(root.item));

		t.equal(root.item[0], 0);
		t.equal(root.item[1], 1);
		t.equal(root.item[2], 2);

		t.done();
	},

	'explicit nested array' : function (t) {
		var tree = DataTree.create();
		var root = tree.getRoot();

		tree.addValue('item.0.0', 0);
		tree.addValue('item.0.1', 1);
		tree.addValue('item.0.2', 2);

		tree.addValue('item.1.0', 3);
		tree.addValue('item.1.1', 4);
		tree.addValue('item.1.2', 5);

		t.ok(Array.isArray(root.item));
		t.ok(Array.isArray(root.item[0]));
		t.ok(Array.isArray(root.item[1]));

		t.equal(root.item[0][0], 0);
		t.equal(root.item[0][1], 1);
		t.equal(root.item[0][2], 2);

		t.equal(root.item[1][0], 3);
		t.equal(root.item[1][1], 4);
		t.equal(root.item[1][2], 5);

		t.done();
	}
};
