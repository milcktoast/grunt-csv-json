var csvParse = require('csv-parse');

/**
	@class CsvDoc
	@constructor
*/
module.exports = CsvDoc;
function CsvDoc(options) {
	options = options || {};
	Object.keys(options).forEach(function (key) {
		this[key] = options[key];
	}.bind(this));
}

/**
	@method create
*/
CsvDoc.create = function (options) {
	return new CsvDoc(options);
};

/**
	CSV parser options

	@property parserOptions
	@type Object
*/
CsvDoc.prototype.parserOptions = null;

/**
	Hook to process field value

	@method processValue
	@param {String} key   Field key
	@param {Mixed}  value Field value
	@return {Mixed} value Processed value
*/
CsvDoc.prototype.processValue = function (key, value) {
	return value;
};

/**
	Parse CSV and format into resource data

	@method parse
	@param {Buffer}   contents CSV file contents
	@param {Function} cb       Callback
	@param {mixed}    cb.err   Resolution
	@param {Array}    cb.data  Resource data
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
	var processValue = this.processValue;
	var names = [];
	var keys = [];
	var sets = [];

	this._createSets(sets, rows);

	rows.forEach(function (row, i) {
		var isFirstRow = i === 0;

		row.forEach(function (col, k) {
			var isFirstCol = k === 0;
			var key, val;

			if (isFirstRow && !isFirstCol) {
				names.push(col);
			}
			else if (isFirstCol && !isFirstRow) {
				keys.push(col);
			}
			else if (!isFirstRow) {
				key = keys[i - 1];
				val = processValue(key, col);
				sets[k - 1].push(val);
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
