
"use strict";


// private

	// attributes

	var _recursionSeparator = ".", _skeletons = {};

	// methods

	function _formateKey(method, key) {

		if ("string" !== typeof key) {
			throw new Error("NodeContainerPattern/" + method + " : the key is not a string");
		}
		else {

			key = key.trim().toLowerCase();

			if ("" === key) {
				throw new Error("NodeContainerPattern/" + method + " : empty key");
			}
			else {
				return key;
			}

		}

	}

	function _setRecursive(keys, i, value, object) {

		if (i === keys.length - 1) {
			object = ("object" === typeof object) ? object : {};
			object[keys[i]] = value;
		}
		else {
			object[keys[i]] = _setRecursive(
				keys, i+1, value, (object[keys[i]]) ? object[keys[i]] : {}
			);
		}

		return object;

	}

// module

module.exports = class NodeContainerPattern extends Map  {

	constructor (recursionSeparator) {
		super();
		_recursionSeparator = (recursionSeparator) ? recursionSeparator : _recursionSeparator;
		_skeletons = {};
	}

	bindSkeleton (key, skeleton) {

		key = _formateKey("bindSkeleton", key);

		if ("string" !== typeof skeleton) {
			throw new Error("NodeContainerPattern/bindSkeleton : the '" + key + "' data has an invalid 'skeleton' attribute");
		}
		else {

			skeleton = skeleton.trim().toLowerCase();

			if (-1 >= ["string", "object", "array", "boolean", "integer", "float", "number"].indexOf(skeleton)) {
				throw new Error("NodeContainerPattern/bindSkeleton : the '" + key + "' data has an invalid 'skeleton' attribute");
			}
			else {
				_skeletons[key] = skeleton;
			}

		}

		return this;

	}

	clearData () {
		super.clear();
		return this;
	}

	clearSkeleton () {
		_skeletons = {};
		return this;
	}

	clear () {
		return this.clearData().clearSkeleton();
	}

	has (key) {

		key = _formateKey("has", key);

		if (-1 < key.indexOf(_recursionSeparator)) {

			let keys = key.split(_recursionSeparator);

			if (!super.has(keys[0])) {
				return false;
			}
			else {

				let exists = false;

					for (let i = 1, value = super.get(keys[0]); i < keys.length; ++i) {

						if ("object" !== typeof value || !value[keys[i]]) {
							break;
						}
						else if (i === keys.length-1) {
							exists = true;
							break;
						}
						else {
							value = value[keys[i]];
						}

					}

				return exists;
				
			}

		}
		else {
			return super.has(key);
		}

	}

	get (key) {

		key = _formateKey("get", key);

		if (!this.has(key)) {
			throw new Error("NodeContainerPattern/get : unknown key '" + key + "'");
		}
		else if (-1 < key.indexOf(_recursionSeparator)) {

			let keys = key.split(_recursionSeparator), value = this.get(keys[0]);

				for (let i = 1; i < keys.length; ++i) {
					value = value[keys[i]];
				}

			return value;

		}
		else {
			return super.get(key);
		}

	}

	set (key, value) {

		if ("undefined" === typeof value) {
			throw new Error("NodeContainerPattern/set : the value is undefined");
		}
		else {

			key = _formateKey("set", key);

			if (_skeletons[key]) {

				if ("object" === _skeletons[key]) {

					if (!(value instanceof Object)) {

						if ("string" !== typeof value) {
							throw new Error("NodeContainerPattern/set : does not correspond to the skeleton");
						}
						else if ("{" === value[0] && "}" === value[value.length-1]) {
							value = JSON.parse(value);
						}
						else {
							throw new Error("NodeContainerPattern/set : does not correspond to the skeleton");
						}

					}

				}
				else if ("array" === _skeletons[key]) {

					if (!(value instanceof Array)) {

						if ("string" !== typeof value) {
							throw new Error("NodeContainerPattern/set : does not correspond to the skeleton");
						}
						else if ("[" === value[0] && "]" === value[value.length-1]) {
							value = JSON.parse(value);
						}
						else {
							throw new Error("NodeContainerPattern/set : does not correspond to the skeleton");
						}
						
					}

				}
				else if (-1 < ["string", "boolean", "number", "float", "integer"].indexOf(_skeletons[key])) {

					if (_skeletons[key] !== typeof value) {

						switch(_skeletons[key]) {

							case "string":
								value = value + "";
							break;

							case "boolean":
								value = ("true" === value || "yes" === value || "y" === value || "1" === value || 1 === value || true === value);
							break;

							case "float": case "number":

								if (isNaN(parseFloat(value))) {
									throw new Error("NodeContainerPattern/set : does not correspond to the skeleton");
								}
								else {
									value = parseFloat(value);
								}

							break;
							case "integer":

								if (isNaN(parseInt(value))) {
									throw new Error("NodeContainerPattern/set : does not correspond to the skeleton");
								}
								else {
									value = parseInt(value);
								}

							break;

						}

					}

				}

			}

			if (-1 < key.indexOf(_recursionSeparator)) {

				let keys = key.split(_recursionSeparator);

				key = keys[0];
				value = _setRecursive(
					keys, 1, value, (super.has(key)) ? this.get(key) : {}
				);

			}

			super.set(key, value);

		}

		return this;

	}

	delete (key) { super.delete(_formateKey("delete", key)); return this; }

};
