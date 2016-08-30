
"use strict";

// private

	// methods

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

	function _extractDocumentation(that, previousKeys, object) {

		let result = {};

			if (!(object instanceof Array) && !(object instanceof Map)) {

				for(var key in object) {

					let value = object[key],
						fullKey = ("" !== previousKeys) ? previousKeys + that.recursionSeparator + key : key,
						documentation = (that.documentations[fullKey]) ? that.documentations[fullKey] : "";

					if ("object" === typeof value) {

						if (object instanceof Array && 0 === object.length) {
							result[key] = { fullkey: fullKey, type: "array", documentation: documentation };
						}
						else if (0 === Object.keys(value).length) {
							result[key] = { fullkey: fullKey, type: "object", documentation: documentation };
						}
						else {
							result[key] = _extractDocumentation(that, fullKey, value);
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
			else {

				object.forEach((value, key) => {

					let fullKey = ("" !== previousKeys) ? previousKeys + that.recursionSeparator + key : key,
						documentation = (that.documentations[fullKey]) ? that.documentations[fullKey] : "";

					if ("object" === typeof value) {

						if (value instanceof Array && 0 === value.length) {
							result[key] = { fullkey: fullKey, type: "array", documentation: documentation };
						}
						else if (0 === Object.keys(value).length) {
							result[key] = { fullkey: fullKey, type: "object", documentation: documentation };
						}
						else {
							result[key] = _extractDocumentation(that, fullKey, value);
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

// module

module.exports = class NodeContainerPattern extends Map  {

	constructor (recursionSeparator) {

		super();

		this.recursionSeparator = ("string" === typeof recursionSeparator) ? recursionSeparator : ".";
		this.skeletons = {};
		this.documentations = {};

	}

	bindSkeleton (key, skeleton) {

		key = _formateKey(key);

		if ("string" !== typeof skeleton) {
			throw new Error("The \"" + key + "\" data has an invalid \"skeleton\" attribute");
		}
		else {

			skeleton = skeleton.trim().toLowerCase();

			if (-1 >= ["string", "object", "array", "boolean", "integer", "float", "number"].indexOf(skeleton)) {
				throw new Error("The \"" + key + "\" data has an invalid \"skeleton\" attribute");
			}
			else {
				this.skeletons[key] = skeleton;
			}

		}

		return this;

	}

	clear () {
		return this.clearData().clearDocumentation().clearSkeleton();
	}

	clearData () {
		super.clear();
		return this;

	}

	clearDocumentation () {
		this.documentations = {};
		return this;
	}

	clearSkeleton () {
		this.skeletons = {};
		return this;
	}

	delete (key) {
		super.delete(_formateKey(key));
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

	set (key, value, documentation) {

		if ("undefined" === typeof value) {
			throw new Error("The value is undefined");
		}
		else {

			key = _formateKey(key);

			if (this.skeletons[key]) {

				if ("object" === this.skeletons[key]) {

					if (!(value instanceof Object)) {

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
				else if ("array" === this.skeletons[key]) {

					if (!(value instanceof Array)) {

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
				else if (-1 < ["string", "boolean", "number", "float", "integer"].indexOf(this.skeletons[key])) {

					if (this.skeletons[key] !== typeof value) {

						switch(this.skeletons[key]) {

							case "string":
								value = value + "";
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

			if ("string" === typeof documentation) {
				this.documentations[key] = documentation;
			}

			if (-1 < key.indexOf(this.recursionSeparator)) {

				let keys = key.split(this.recursionSeparator);

				key = keys[0];
				value = _setRecursive(
					keys, 1, value, (super.has(key)) ? this.get(key) : {}
				);

			}

			super.set(key, value);

		}

		return this;

	}

};
