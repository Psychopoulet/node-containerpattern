
"use strict";

// deps

	const { join } = require("path");

	const isPlainObject = require(join(__dirname, "isPlainObject.js"));
	const isArray = require(join(__dirname, "isArray.js"));

	const ensureKey = require(join(__dirname, "ensureKey.js"));
	const ensureData = require(join(__dirname, "ensureData.js"));

// module

module.exports = class NodeContainerPattern extends Map {

	constructor (recursionSeparator) {

		super();

		this.documentations = {};
		this.limits = {};
		this.recursionSeparator = "string" === typeof recursionSeparator ? recursionSeparator : ".";
		this.skeletons = {};

	}

	// private

	_ensureData (key, value) {
		return ensureData(key, this.limits[key], this.skeletons[key], value);
	}

	_ensureDataRecursive (key, value) {

		for (const i in value) {

			if (Object.prototype.hasOwnProperty.call(value, i)) {

				value[i] = this._ensureData(key + this.recursionSeparator + i, value[i]);

				if (isPlainObject(value[i])) {
					value[i] = this._ensureDataRecursive(key + this.recursionSeparator + i, value[i]);
				}

			}

		}

		return value;

	}

	_createBaseObject (parentKey, _parentValue, keys, i, value) {

		const parentValue = this._ensureData(parentKey, _parentValue);

			if (i < keys.length - 1) {

				parentValue[keys[i]] = this._createBaseObject(
					parentKey + this.recursionSeparator + keys[i],
					!parentValue[keys[i]] ? {} : parentValue[keys[i]], keys, i + 1, value
				);

			}
			else {
				parentValue[keys[i]] = this._ensureData(parentKey + this.recursionSeparator + keys[i], value);
			}

		return parentValue;

	}

	_extractDocumentation (previousKeys, object) {

		const result = {};

			if (isPlainObject(object)) {

				for (const key in object) {

					if (Object.prototype.hasOwnProperty.call(object, key)) {

						const value = object[key];
						const fullkey = "" !== previousKeys ? previousKeys + this.recursionSeparator + key : key;
						const documentation = this.documentations[fullkey] ? this.documentations[fullkey] : "";

						if ("object" === typeof value) {

							result[key] = {
								documentation,
								fullkey
							};

							if (isArray(value)) {
								result[key].type = "array";
								result[key].content = 0 === value.length ? [] : value;
							}
							else {
								result[key].type = "object";
								result[key].content = 0 === Object.keys(value).length ? {} : this._extractDocumentation(fullkey, value);
							}

						}
						else if ("number" === typeof value) {

							if (Number.isInteger(value)) {

								result[key] = {
									documentation,
									fullkey,
									"type": "integer"
								};

							}
							else {

								result[key] = {
									documentation,
									fullkey,
									"type": "float"
								};

							}

						}
						else {

							result[key] = {
								documentation,
								fullkey,
								"type": typeof value
							};

						}

					}

				}

			}
			else if (this === object || isArray(object)) {

				object.forEach((value, key) => {

					const fullkey = "" !== previousKeys ? previousKeys + this.recursionSeparator + key : key;
					const documentation = this.documentations[fullkey] ? this.documentations[fullkey] : "";

					if ("object" === typeof value) {

						result[key] = {
							documentation,
							fullkey
						};

						if (isArray(value)) {
							result[key].type = "array";
							result[key].content = 0 === value.length ? [] : value;
						}
						else {
							result[key].type = "object";
							result[key].content = 0 === Object.keys(value).length ? {} : this._extractDocumentation(fullkey, value);
						}

					}
					else if ("number" === typeof value) {

						if (Number.isInteger(value)) {

							result[key] = {
								documentation,
								fullkey,
								"type": "integer"
							};

						}
						else {

							result[key] = {
								documentation,
								fullkey,
								"type": "float"
							};

						}

					}
					else {

						result[key] = {
							documentation,
							fullkey,
							"type": typeof value
						};

					}

				});

			}

		return result;

	}

	// public

	skeleton (_key, _skeleton) {

		const key = ensureKey(_key);

		if ("undefined" === typeof _skeleton) {
			throw new ReferenceError("The \"" + key + "\" data has not any \"skeleton\" attribute");
		}
		else if ("string" !== typeof _skeleton) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"skeleton\" attribute");
		}
		else {

			const skeleton = _skeleton.trim().toLowerCase();

			if (-1 >= [ "array", "boolean", "email", "float", "integer", "ipv4", "ipv6", "number", "object", "string" ].indexOf(skeleton)) {
				throw new TypeError("The \"" + key + "\" data has an invalid \"skeleton\" attribute");
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
		super.delete(ensureKey(key));
		return this;
	}

	document (_key, documentation) {

		const key = ensureKey(_key);

		if ("undefined" === typeof documentation) {
			throw new ReferenceError("The \"" + key + "\" data has not any \"documentation\" attribute");
		}
		else if ("string" !== typeof documentation) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"documentation\" attribute");
		}
		else {
			this.documentations[key] = documentation;
		}

		return this;

	}

	documentation () {
		return this._extractDocumentation("", this);
	}

	get (_key) {

		const key = ensureKey(_key);

		if (!this.has(key)) {
			throw new Error("Unknown key \"" + key + "\"");
		}
		else if (-1 < key.indexOf(this.recursionSeparator)) {

			const keys = key.split(this.recursionSeparator);

			let value = this.get(keys[0]);

				for (let i = 1; i < keys.length; ++i) {
					value = value[keys[i]];
				}

			return value;

		}
		else {
			return super.get(key);
		}

	}

	has (_key) {

		const key = ensureKey(_key);

		if (-1 >= key.indexOf(this.recursionSeparator)) {
			return super.has(key);
		}
		else {

			const keys = key.split(this.recursionSeparator);

			if (!super.has(keys[0])) {
				return false;
			}
			else {

				let exists = false;

					for (let i = 1, value = super.get(keys[0]); i < keys.length; ++i) {

						if ("object" !== typeof value || "undefined" === typeof value[keys[i]]) {
							break;
						}
						else if (i === keys.length - 1) {
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

	limit (_key, limit) {

		const key = ensureKey(_key);

		if ("undefined" === typeof limit) {
			throw new ReferenceError("The \"" + key + "\" data has not any \"limit\" attribute");
		}
		else if (!isArray(limit)) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"limit\" attribute");
		}
		else {
			this.limits[key] = limit;
		}

		return this;

	}

	set (_key, _value) {

		const key = ensureKey(_key);
		const value = this._ensureData(key, _value);

		// check key recursivity
		if (-1 < key.indexOf(this.recursionSeparator)) {

			const keys = key.split(this.recursionSeparator);

			// if no more constraints, set
			if (!isPlainObject(value) || 1 > Object.keys(value).length) {

				const firstKey = keys.shift();

				super.set(
					firstKey,
					this._createBaseObject(
						firstKey,
						super.has(firstKey) ? super.get(firstKey) : {},
						keys, 0, value
					)
				);

			}

			// check content recursivity
			else {

				const firstKey = keys.shift();

				super.set(firstKey, this._createBaseObject(
					firstKey,
					super.has(firstKey) ? super.get(firstKey) : {},
					keys, 0, this._ensureDataRecursive(key, value)
				));
			}

		}

		else if (!isPlainObject(value)) {
			super.set(key, value);
		}
		else if (1 > Object.keys(value).length) {
			super.set(key, {});
		}

		// check content recursivity
		else {
			super.set(key, this._ensureDataRecursive(key, value));
		}

		return this;

	}

};
