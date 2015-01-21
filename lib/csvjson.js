var DataTree = require('./DataTree');
var parse = require('csv-parse');

function process(contents, cb) {
	var tree = DataTree.create();

	parse(contents, function (err, rows) {
		rows.forEach(function (row) {
			tree.addValue(row[0], row[1]);
		});

		cb(null, tree.getRoot());
	});
}

module.exports = {
	process : process
};
