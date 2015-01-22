var csvParse = require('csv-parse');

/**
	@class CsvDoc
	@constructor
*/
module.exports = CsvDoc;
function CsvDoc() {}

/**
	@method create
*/
CsvDoc.create = function () {
	return new CsvDoc();
};

/**
	CSV parser options

	@property parserOptions
	@type Object
*/
CsvDoc.prototype.parserOptions = {
	/*jshint camelcase:false*/
	auto_parse : true
};

/**
	Parse CSV and format into resource data

	@method parse
	@param {Buffer}   contents CSV file contents
	@param {Function} cb       Callback
	@param {mixed}    cb.err   Resolution
	@param {Array}    cb.data  Document data
*/
CsvDoc.prototype.parse = function(contents, cb) {
	csvParse(contents, this.parserOptions, function (err, rows) {
		var data = this.formatRows(rows);
		cb(null, data);
	}.bind(this));
};

/**
	Format CSV rows into resource data

	@method formatRows
	@params {Array} rows Document rows
	@return {Object}     Resource data
*/
CsvDoc.prototype.formatRows = function (rows) {
	var names = [];
	var keys = [];
	var sets = [];

	this._createSets(sets, rows);

	rows.forEach(function (row, i) {
		var isFirstRow = i === 0;

		row.forEach(function (col, k) {
			var isFirstCol = k === 0;

			if (isFirstRow && !isFirstCol) {
				names.push(col);
			}
			else if (isFirstCol && !isFirstRow) {
				keys.push(col);
			}
			else if (!isFirstRow) {
				sets[k - 1].push(col);
			}
		});
	});

	return {
		keys : keys,
		names : names,
		sets : sets
	};
};

/**
	@method _createSets
	@private
*/
CsvDoc.prototype._createSets = function(sets, rows) {
	var firstRow = rows[0];

	for (var i = 0, il = firstRow.length - 1; i < il; i ++) {
		sets.push([]);
	}
};
