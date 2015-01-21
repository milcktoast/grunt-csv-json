module.exports = DataTree;

/**
	@class DataTree
	@constructor
*/
function DataTree() {
	this._root = {};
}

/**
	@method create
*/
DataTree.create = function () {
	return new DataTree();
};

/**
	Object path delimiter

	@property delimiter
	@type String
	@default '.'
*/
DataTree.prototype.delimiter = '.';

/**
	@method getRoot
	@return {Object}
*/
DataTree.prototype.getRoot = function () {
	return this._root;
};

/**
	Walk object tree to parent of defined path

	@method walkTree
	@param  {Object}       root  Tree root
	@param  {String|Array} path  Key path
	@return {Object} Parent branch
*/
DataTree.prototype.walkTree = function (root, path) {
	var pathParts = Array.isArray(path) ? path : path.split(this.delimiter);
	var branch = root;
	var key, keyNext, isArray;

	for (var i = 0, il = pathParts.length - 1; i < il; i ++) {
		key = pathParts[i];

		if (branch[key] == null) {
			keyNext = pathParts[i + 1];
			isArray = this._keyIsInt(keyNext);
			branch[key] = isArray ? [] : {};
		}

		branch = branch[key];
	}

	return branch;
};

/**
	@method _keyIsInt
	@return {Boolean}
	@private
*/
DataTree.prototype._keyIsInt = function (value) {
	return !isNaN(parseInt(value, 10));
};

/**
	Add value to tree

	@method addValue
	@param {String} key    Defines object path in dot notation
	@param {String} value
*/
DataTree.prototype.addValue = function (key, value) {
	var root = this._root;
	var keyParts = key.split(this.delimiter);
	var keyEnd = keyParts[keyParts.length - 1];

	var branch = this.walkTree(root, keyParts);
	var isImplicitArray = branch[keyEnd] != null;

	return isImplicitArray ?
		this._addImplicitArrayValue(branch, keyEnd, value) :
		this._addValue(branch, keyEnd, value);
};

/**
	Create or add to `Array` value for duplicate keys

	@method _addImplicitArrayValue
	@param {Object} branch
	@param {String} key
	@param {any}    value
	@private
*/
DataTree.prototype._addImplicitArrayValue = function (branch, key, value) {
	var existing = branch[key];

	if (Array.isArray(existing)) {
		existing.push(value);
	} else {
		branch[key] = [existing, value];
	}
};

/**
	Create value

	@method _addValue
	@param {Object} branch
	@param {String} key
	@param {any}    value
	@private
*/
DataTree.prototype._addValue = function (branch, key, value) {
	branch[key] = value;
};
