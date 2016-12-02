
"use strict";

// consts

	var EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// private

	// methods

	function _isPlainObject(obj) {
		return (obj && "object" == typeof obj && Object == obj.constructor);
	}

	function _isArray(obj) {
		return (obj && "object" == typeof obj && obj instanceof Array);
	}

	function _checkData(that, key, value) {

		// check existance
		if ("undefined" === typeof value) {
			throw new Error("The \"" + key + "\" value is undefined");
		}

		// check limits
		else if (that.limits[key] && -1 >= that.limits[key].indexOf(value)) {
			throw new Error("The \"" + key + "\" data does not correspond to the limits (" + JSON.stringify(that.limits[key]) + ")");
		}
		else {

			// check skeleton
			if (that.skeletons[key]) {

				if ("object" === that.skeletons[key]) {

					if (!_isPlainObject(value)) {

						if ("string" !== typeof value) {
							throw new Error("The \"" + key + "\" data does not correspond to the skeleton");
						}
						else if ("{" === value[0] && "}" === value[value.length-1]) {
							value = JSON.parse(value);
						}
						else {
							throw new Error("The \"" + key + "\" data does not correspond to the skeleton");
						}

					}

				}
				else if ("array" === that.skeletons[key]) {

					if (!_isArray(value)) {

						if ("string" !== typeof value) {
							throw new Error("The \"" + key + "\" data does not correspond to the skeleton");
						}
						else if ("[" === value[0] && "]" === value[value.length-1]) {
							value = JSON.parse(value);
						}
						else {
							throw new Error("The \"" + key + "\" data does not correspond to the skeleton");
						}
						
					}

				}
				else if (-1 < ["string", "email", "boolean", "number", "float", "integer"].indexOf(that.skeletons[key])) {

					if (that.skeletons[key] !== typeof value) {

						switch(that.skeletons[key]) {

							case "string":
								value = value + "";
							break;

							case "email":

								if ("string" !== typeof value) {
									throw new Error("The \"" + key + "\" data does not correspond to the skeleton");
								}
								else if ("" !== value && !EMAIL_PATTERN.test(value)) {
									throw new Error("The \"" + key + "\" data does not correspond to the skeleton");
								}

							break;

							case "boolean":
								value = ("true" === value || "yes" === value || "y" === value || "1" === value || 1 === value || true === value);
							break;

							case "float": case "number":

								if (isNaN(parseFloat(value))) {
									throw new Error("The \"" + key + "\" data does not correspond to the skeleton");
								}
								else {
									value = parseFloat(value);
								}

							break;
							case "integer":

								if (isNaN(parseInt(value))) {
									throw new Error("The \"" + key + "\" data does not correspond to the skeleton");
								}
								else {
									value = parseInt(value);
								}

							break;

						}

					}

				}

			}

		}

		return value;

	}

	
	function _checkDataRecursive(that, key, value) {

		for (let i in value) {

			value[i] = _checkData(that, key + that.recursionSeparator + i, value[i]);

			if (_isPlainObject(value[i])) {
				value[i] = _checkDataRecursive(that, key + that.recursionSeparator + i, value[i]);
			}

		}

		return value;

	}

	function _createBaseObject(that, parentKey, parentValue, keys, i, value) {

		parentValue = _checkData(that, parentKey, parentValue);

		if (i < keys.length - 1) {
			parentValue[keys[i]] = _createBaseObject(that, parentKey + that.recursionSeparator + keys[i], (!parentValue[keys[i]]) ? {} : parentValue[keys[i]], keys, i + 1, value);
		}
		else {
			parentValue[keys[i]] = _checkData(that, parentKey + that.recursionSeparator + keys[i], value);
		}

		return parentValue;

	}

	function _extractDocumentation(that, previousKeys, object) {

		let result = {};

			if (_isPlainObject(object)) {

				for(var key in object) {

					let value = object[key],
						fullKey = ("" !== previousKeys) ? previousKeys + that.recursionSeparator + key : key,
						documentation = (that.documentations[fullKey]) ? that.documentations[fullKey] : "";

					if ("object" === typeof value) {

						result[key] = {
							fullkey: fullKey,
							documentation: documentation
						};

						if (_isArray(value)) {
							result[key].type = "array";
							result[key].content = (0 === value.length) ? [] : value;
						}
						else {
							result[key].type = "object";
							result[key].content = (0 === Object.keys(value).length) ? {} : _extractDocumentation(that, fullKey, value);
						}
						
					}
					else if ("number" === typeof value) {

						if (Number.isInteger(value)) {
							result[key] = { fullkey: fullKey, type: "integer", documentation: documentation };
						}
						else {
							result[key] = { fullkey: fullKey, type: "float", documentation: documentation };
						}
						
					}
					else {
						result[key] = { fullkey: fullKey, type: typeof value, documentation: documentation };
					}

				}

			}
			else if (that === object || _isArray(object)) {

				object.forEach((value, key) => {

					let fullKey = ("" !== previousKeys) ? previousKeys + that.recursionSeparator + key : key,
						documentation = (that.documentations[fullKey]) ? that.documentations[fullKey] : "";

					if ("object" === typeof value) {

						result[key] = {
							fullkey: fullKey,
							documentation: documentation
						};

						if (_isArray(value)) {
							result[key].type = "array";
							result[key].content = (0 === value.length) ? [] : value;
						}
						else {
							result[key].type = "object";
							result[key].content = (0 === Object.keys(value).length) ? {} : _extractDocumentation(that, fullKey, value);
						}
						
					}
					else if ("number" === typeof value) {

						if (Number.isInteger(value)) {
							result[key] = { fullkey: fullKey, type: "integer", documentation: documentation };
						}
						else {
							result[key] = { fullkey: fullKey, type: "float", documentation: documentation };
						}
						
					}
					else {
						result[key] = { fullkey: fullKey, type: typeof value, documentation: documentation };
					}

				});

			}

		return result;

	}

	function _formateKey(key) {

		if ("string" !== typeof key) {
			throw new Error("The key is not a string");
		}
		else {

			key = key.trim();

			if ("" === key) {
				throw new Error("The key is empty");
			}
			else {
				return key;
			}

		}

	}

// module

module.exports = class NodeContainerPattern extends Map {

	constructor (recursionSeparator) {

		super();

		this.documentations = {};
		this.limits = {};
		this.recursionSeparator = ("string" === typeof recursionSeparator) ? recursionSeparator : ".";
		this.skeletons = {};

	}

	bindSkeleton (key, skeleton) {

		key = _formateKey(key);

		if ("string" !== typeof skeleton) {
			throw new Error("The \"" + key + "\" data has an invalid \"skeleton\" attribute");
		}
		else {

			skeleton = skeleton.trim().toLowerCase();

			if (-1 >= ["string", "email", "object", "array", "boolean", "integer", "float", "number"].indexOf(skeleton)) {
				throw new Error("The \"" + key + "\" data has an invalid \"skeleton\" attribute");
			}
			else {
				this.skeletons[key] = skeleton;
			}

		}

		return this;

	}

	clear () {
		return this.clearData().clearDocumentations().clearLimits().clearSkeletons();
	}

	clearData () {
		super.clear();
		return this;

	}

	clearDocumentations () {
		this.documentations = {};
		return this;
	}

	clearLimits () {
		this.limits = {};
		return this;
	}

	clearSkeletons () {
		this.skeletons = {};
		return this;
	}

	delete (key) {
		super.delete(_formateKey(key));
		return this;
	}

	document (key, documentation) {
		
		key = _formateKey(key);

		if ("undefined" === typeof documentation) {
			throw new Error("The \"" + key + "\" documentation is undefined");
		}
		else if ("string" !== typeof documentation) {
			throw new Error("The \"" + key + "\" documentation is not a string");
		}
		else {
			this.documentations[key] = documentation;
		}

		return this;

	}

	documentation () {
		return _extractDocumentation(this, "", this);
	}

	get (key) {

		key = _formateKey(key);

		if (!this.has(key)) {
			throw new Error("Unknown key \"" + key + "\"");
		}
		else if (-1 < key.indexOf(this.recursionSeparator)) {

			let keys = key.split(this.recursionSeparator), value = this.get(keys[0]);

				for (let i = 1; i < keys.length; ++i) {
					value = value[keys[i]];
				}

			return value;

		}
		else {
			return super.get(key);
		}

	}

	has (key) {

		key = _formateKey(key);

		if (-1 >= key.indexOf(this.recursionSeparator)) {
			return super.has(key);
		}
		else {

			let keys = key.split(this.recursionSeparator);

			if (!super.has(keys[0])) {
				return false;
			}
			else {

				let exists = false;

					for (let i = 1, value = super.get(keys[0]); i < keys.length; ++i) {

						if ("object" !== typeof value || "undefined" === typeof value[keys[i]]) {
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

	}

	limit (key, limit) {

		key = _formateKey(key);

		if (!_isArray(limit)) {
			throw new Error("The \"" + key + "\" data has an invalid \"limit\" attribute");
		}
		else {
			this.limits[key] = limit;
		}

		return this;

	}

	set (key, value) {

		key = _formateKey(key);
		value = _checkData(this, key, value);

		// check key recursivity
		if (-1 < key.indexOf(this.recursionSeparator)) {

			let keys = key.split(this.recursionSeparator);

			// if no more constraints, set
			if (!_isPlainObject(value) || 1 > Object.keys(value).length) {

				let firstKey = keys.shift();

				super.set(
					firstKey,
					_createBaseObject(
						this, firstKey,
						(super.has(firstKey)) ? super.get(firstKey) : {},
						keys, 0, value
					)
				);

			}

			// check content recursivity
			else {

				let firstKey = keys.shift();

				super.set(firstKey, _createBaseObject(
					this, firstKey,
					(super.has(firstKey)) ? super.get(firstKey) : {},
					keys, 0, _checkDataRecursive(this, key, value)
				));
			}

		}
		else {

			if (!_isPlainObject(value)) {
				super.set(key, value);
			}
			else if (1 > Object.keys(value).length) {
				super.set(key, {});
			}

			// check content recursivity
			else {
				super.set(key, _checkDataRecursive(this, key, value));
			}

		}

		return this;

	}

};
