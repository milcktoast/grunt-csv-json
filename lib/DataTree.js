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
	var pathParts = Array.isArray(path) ? path : path.split('.');
	var branch = root;
	var key;

	for (var i = 0, il = pathParts.length; i < il; i ++) {
		key = pathParts[i];
		if (!branch[key]) {
			branch[key] = {};
		}

		branch = branch[key];
	}

	return branch;
};

/**
	Add value to tree

	@method addValue
	@param {String} key    Defines object path in dot notation
	@param {String} value
*/
DataTree.prototype.addValue = function (key, value) {
	var root = this._root;
	var keyParts = key.split('.');
	var keyEnd = keyParts.pop();
	var branch = this.walkTree(root, keyParts);
	var isArray = branch[keyEnd] != null;

	return isArray ?
		this._addArrayValue(branch, keyEnd, value) :
		this._addValue(branch, keyEnd, value);
};

/**
	Create or add to `Array` value

	@method _addArrayValue
	@param {Object} branch
	@param {String} key
	@param {any}    value
	@private
*/
DataTree.prototype._addArrayValue = function (branch, key, value) {
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
