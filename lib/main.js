
"use strict";

// private

	// methods

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
				else if ("array" === that.skeletons[key]) {

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
				else if (-1 < ["string", "boolean", "number", "float", "integer"].indexOf(that.skeletons[key])) {

					if (that.skeletons[key] !== typeof value) {

						switch(that.skeletons[key]) {

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

		}

		return true;

	}

	function _createBaseObject(that, currentKey, currentObject, keys, i, value) {

		if (!currentObject[keys[i]]) {

			if (_checkData(that, currentKey, {})) {

				if (i < keys.length - 1) {
					currentObject[keys[i]] = _createBaseObject(that, currentKey + that.recursionSeparator + keys[i], {}, keys, i + 1, value);
				}
				else {
					currentObject[keys[i]] = value;
				}

			}

		}
		else {

			currentObject[keys[i]] = _createBaseObject(that, currentKey + that.recursionSeparator + keys[i], currentObject[keys[i]], keys, i + 1, value);

		}

		return currentObject;

	}

	function _extractDocumentation(that, previousKeys, object) {

		let result = {};

			if (!(object instanceof Array) && !(object instanceof Map)) {

				for(var key in object) {

					let value = object[key],
						fullKey = ("" !== previousKeys) ? previousKeys + that.recursionSeparator + key : key,
						documentation = (that.documentations[fullKey]) ? that.documentations[fullKey] : "";

					if ("object" === typeof value) {

						result[key] = {
							fullkey: fullKey,
							documentation: documentation
						};

						if (value instanceof Array) {
							result[key].type = "array";
							result[key].content = (0 === value.length) ? [] : _extractDocumentation(that, fullKey, value);
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
			else {

				object.forEach((value, key) => {

					let fullKey = ("" !== previousKeys) ? previousKeys + that.recursionSeparator + key : key,
						documentation = (that.documentations[fullKey]) ? that.documentations[fullKey] : "";

					if ("object" === typeof value) {

						result[key] = {
							fullkey: fullKey,
							documentation: documentation
						};

						if (value instanceof Array) {
							result[key].type = "array";
							result[key].content = (0 === value.length) ? [] : _extractDocumentation(that, fullKey, value);
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

		this.recursionSeparator = ("string" === typeof recursionSeparator) ? recursionSeparator : ".";
		this.skeletons = {};
		this.documentations = {};
		this.limits = {};

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
		return this.clearData().clearDocumentation().clearLimits().clearSkeleton();
	}

	clearData () {
		super.clear();
		return this;

	}

	clearDocumentation () {
		this.documentations = {};
		return this;
	}

	clearLimits () {
		this.limits = {};
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

		if (!(limit instanceof Array)) {
			throw new Error("The \"" + key + "\" data has an invalid \"limit\" attribute");
		}
		else {
			this.limits[key] = limit;
		}

		return this;

	}

	set (key, value) {

		key = _formateKey(key);

		if (_checkData(this, key, value)) {

			(0, console).log("");
			(0, console).log(" ==>", key, "==", value);
			(0, console).log("     -> skeletons : ", this.skeletons[key]);
			(0, console).log("     -> limits : ", this.limits[key]);

			// check key recursivity
			if (-1 < key.indexOf(this.recursionSeparator)) {

				let keys = key.split(this.recursionSeparator);

				// if no more constraints, set
				if ("object" !== typeof value || value instanceof Array || 1 > Object.keys(value).length) {

					super.set(
						keys[0],
						_createBaseObject(this, keys[0], (super.has(keys[0])) ? super.get(keys[0]) : {}, keys, 0, value)[keys[0]]
					);

				}

				// check content recursivity
				else {

					console.log("TODO : valider enfants de 'value' puis enregistrer");

				}

			}
			else {

				if ("object" !== typeof value || value instanceof Array) {
					super.set(key, value);
				}
				else if (1 > Object.keys(value).length) {
					super.set(key, {});
				}

				// check content recursivity
				else {

					if (!super.has(key)) {
						super.set(key, {});
					}

					console.log("TODO : valider enfants de 'value' puis enregistrer");

					/*for (let i in value) {

						let subKey = key + this.recursionSeparator + i,
							oldValue = (super.has(subKey)) ? super.get(subKey) : null;

						(0, console).log("subKey : ", subKey, " => ", value[i]);

						try {
							this.set(subKey, value[i]);
						}
						catch(e) {

							if (oldValue) {
								super.set(subKey, oldValue);
							}

							throw e;

						}

					}*/

				}
				
			}

		}

		return this;

	}

};
