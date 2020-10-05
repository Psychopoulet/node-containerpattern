/*
	eslint-disable max-lines
*/

"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

	const {
		isDefined,
		isString, isEmptyString, isNotEmptyString,
		isObject, isPlainObject, isEmptyPlainObject, isArray, isEmptyArray, inArray,
		isNumber, isInteger
	} = require(join(__dirname, "validators"));

	const ensureKey = require(join(__dirname, "ensureKey.js"));

	const ensureDataArray = require(join(__dirname, "ensureDataArray.js"));
	const ensureDataObject = require(join(__dirname, "ensureDataObject.js"));
	const ensureDataSpecific = require(join(__dirname, "ensureDataSpecific.js"));
	const ensureDataBasic = require(join(__dirname, "ensureDataBasic.js"));
	const { patternEmail, patternUrl } = require(join(__dirname, "patterns.js"));

// consts

	const VALID_SKELETONS = [ "array", "boolean", "email", "float", "integer", "ipv4", "ipv6", "number", "object", "string", "url" ];
	const MIN_MAX_SKELETONS = [ "array", "email", "float", "integer", "ipv4", "ipv6", "number", "string", "url" ];

// module

module.exports = class NodeContainerPattern extends Map {

	constructor (recursionSeparator = ".") {

		super();

		this.documentations = {};
		this.limits = {};
		this.mins = {};
		this.maxs = {};
		this.recursionSeparator = isNotEmptyString(recursionSeparator) ? recursionSeparator : ".";
		this.regexs = {};
		this.skeletons = {};

	}

	// private

	_ensureData (key, value) {

		// check existance
		if (!isDefined(value)) {
			throw new ReferenceError("The \"" + key + "\" value is undefined");
		}

		// check limits
		else if (isArray(this.limits[key]) && !inArray(this.limits[key], value)) {
			throw new Error("The \"" + key + "\" data does not correspond to the limits (" + JSON.stringify(this.limits[key]) + ")");
		}

		// check skeleton
		else if (isDefined(this.skeletons[key])) {

			const skeleton = this.skeletons[key];

			if ("object" === skeleton) {
				return ensureDataObject(key, skeleton, value);
			}
			else if (inArray([ "email", "ipv4", "ipv6", "url" ], skeleton)) {
				return ensureDataSpecific(key, skeleton, value);
			}
			else if (inArray([ "array", "string" ], skeleton)) {

				const result = "array" === skeleton ? ensureDataArray(key, skeleton, value) : ensureDataBasic(key, skeleton, value);

				if (isNumber(this.mins[key]) && result.length < this.mins[key]) {

					throw new RangeError(
						"The \"" + key + "\" data length (" + result.length + ") is lower than the max allowed (" + this.mins[key] + ")"
					);

				}
				else if (isNumber(this.maxs[key]) && result.length > this.maxs[key]) {

					throw new RangeError(
						"The \"" + key + "\" data length (" + result.length + ") is lower than the max allowed (" + this.maxs[key] + ")"
					);

				}
				else {
					return result;
				}

			}
			else if (inArray([ "integer", "number", "float" ], skeleton)) {

				const result = ensureDataBasic(key, skeleton, value);

				if (isNumber(this.mins[key]) && result < this.mins[key]) {

					throw new RangeError(
						"The \"" + key + "\" data (" + result + ") is higher than the max allowed (" + this.mins[key] + ")"
					);

				}
				else if (isNumber(this.maxs[key]) && result > this.maxs[key]) {

					throw new RangeError(
						"The \"" + key + "\" data (" + result + ") is higher than the max allowed (" + this.maxs[key] + ")"
					);

				}
				else {
					return result;
				}

			}
			else {
				return ensureDataBasic(key, skeleton, value);
			}

		}
		else {
			return value;
		}

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

	_createBaseObject (parentKey, _parentValue, keys, value) {

		const parentValue = this._ensureData(parentKey, _parentValue);

			const key = keys.shift();

			if (keys.length) {

				parentValue[key] = this._createBaseObject(
					parentKey + this.recursionSeparator + key,
					!parentValue[key] ? {} : parentValue[key], keys, value
				);

			}
			else {

				parentValue[key] = this._ensureData(parentKey + this.recursionSeparator + key, value);

			}

		return parentValue;

	}

	_extractDocumentation (previousKeys, object) {

		const result = {};

			if (isPlainObject(object)) {

				Object.keys(object).forEach((key) => {

					const value = object[key];
					const fullkey = !isEmptyString(previousKeys) ? previousKeys + this.recursionSeparator + key : key;
					const documentation = this.documentations[fullkey] ? this.documentations[fullkey] : "";

					if (isObject(value)) {

						result[key] = {
							documentation,
							fullkey
						};

						if (isArray(value)) {
							result[key].type = "array";
							result[key].content = isEmptyArray(value) ? [] : value;
						}
						else {
							result[key].type = "object";
							result[key].content = isEmptyPlainObject(value) ? {} : this._extractDocumentation(fullkey, value);
						}

					}
					else if (isInteger(value)) {

						result[key] = {
							documentation,
							fullkey,
							"type": "integer"
						};

					}
					else if (isNumber(value)) {

						result[key] = {
							documentation,
							fullkey,
							"type": "float"
						};

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
			else if (this === object || isArray(object)) {

				object.forEach((value, key) => {

					const fullkey = !isEmptyString(previousKeys) ? previousKeys + this.recursionSeparator + key : key;
					const documentation = this.documentations[fullkey] ? this.documentations[fullkey] : "";

					if (isObject(value)) {

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
					else if (isInteger(value)) {

						result[key] = {
							documentation,
							fullkey,
							"type": "integer"
						};

					}
					else if (isNumber(value)) {

						result[key] = {
							documentation,
							fullkey,
							"type": "float"
						};

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

	clear () {
		return this.clearData().clearDocumentations().clearLimits().clearMinsMaxs().clearRegexs().clearSkeletons();
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

	clearMinsMaxs () {
		this.mins = {};
		this.maxs = {};
		return this;
	}

	clearRegexs () {
		this.regexs = {};
		return this;
	}

	clearSkeletons () {
		this.skeletons = {};
		return this;
	}

	delete (_key) {

		const key = ensureKey(_key);

		if (this.has(key)) {

			if (-1 < key.indexOf(this.recursionSeparator)) {

				const keys = key.split(this.recursionSeparator);
				const lastKey = keys.pop();
				const parentKey = keys.join(this.recursionSeparator);

				const parent = this.get(parentKey);

				delete parent[lastKey];

				this.set(parentKey, parent);

			}
			else {
				super.delete(key);
			}

			if (isDefined(this.documentations[key])) {
				delete this.documentations[key];
			}

			if (isDefined(this.limits[key])) {
				delete this.limits[key];
			}

			if (isDefined(this.mins[key])) {
				delete this.mins[key];
			}

			if (isDefined(this.maxs[key])) {
				delete this.maxs[key];
			}

			if (isDefined(this.regexs[key])) {
				delete this.regexs[key];
			}

			if (isDefined(this.skeletons[key])) {
				delete this.skeletons[key];
			}

		}

		return this;

	}

	document (_key, documentation) {

		const key = ensureKey(_key);

		if (!isDefined(documentation)) {
			throw new ReferenceError("The \"" + key + "\" data has not any \"documentation\" attribute");
		}
		else if (!isString(documentation)) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"documentation\" attribute");
		}
		else if (isEmptyString(documentation)) {
			throw new RangeError("The \"" + key + "\" data has an empty \"documentation\" attribute");
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

						if (!isObject(value) || !isDefined(value[keys[i]])) {
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

		if (!isDefined(limit)) {
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

	min (_key, min) {

		const key = ensureKey(_key);

		if (!isDefined(min)) {
			throw new ReferenceError("The \"" + key + "\" data has not any \"min\" attribute");
		}

		else if (!isNotEmptyString(this.skeletons[key])) {
			throw new ReferenceError("The \"" + key + "\" data has not any skeleton");
		}
		else if (!MIN_MAX_SKELETONS.includes(this.skeletons[key])) {

			throw new RangeError(
				"The \"" + key + "\" data \"" + this.skeletons[key] + "\" skeleton is not in [ \"" + MIN_MAX_SKELETONS.join("\", \"") + "\" ]"
			);

		}
		else if ([ "float", "number" ].includes(this.skeletons[key]) && !isNumber(min)) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"min\" attribute");
		}
		else if ([ "integer", "string", "array" ].includes(this.skeletons[key]) && !isInteger(min)) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"min\" attribute");
		}

		else if (!isNumber(min)) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"min\" attribute");
		}

		else {
			this.mins[key] = min;
		}

		return this;

	}

	max (_key, max) {

		const key = ensureKey(_key);

		if (!isDefined(max)) {
			throw new ReferenceError("The \"" + key + "\" data has not any \"max\" attribute");
		}

		else if (!isNotEmptyString(this.skeletons[key])) {
			throw new ReferenceError("The \"" + key + "\" data has not any skeleton");
		}
		else if (!MIN_MAX_SKELETONS.includes(this.skeletons[key])) {

			throw new RangeError(
				"The \"" + key + "\" data \"" + this.skeletons[key] + "\" skeleton is not in [ \"" + MIN_MAX_SKELETONS.join("\", \"") + "\" ]"
			);

		}
		else if ([ "float", "number" ].includes(this.skeletons[key]) && !isNumber(max)) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"max\" attribute");
		}
		else if ([ "integer", "string", "array" ].includes(this.skeletons[key]) && !isInteger(max)) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"max\" attribute");
		}

		else if (!isNumber(max)) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"max\" attribute");
		}

		else {
			this.maxs[key] = max;
		}

		return this;

	}

	regex (_key, _regex) {

		const key = ensureKey(_key);

		if (!isDefined(_regex)) {
			throw new ReferenceError("The \"" + key + "\" data has not any \"regex\" attribute");
		}
		else if (!isString(_regex)) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"regex\" attribute");
		}
		else if (isEmptyString(_regex)) {
			throw new RangeError("The \"" + key + "\" data has an empty \"regex\" attribute");
		}

		else {

			const regex = _regex.trim().toLowerCase();

			this.regexs[key] = regex;

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
			if (!isPlainObject(value) || isEmptyPlainObject(value)) {

				const firstKey = keys.shift();

				super.set(firstKey,
					this._createBaseObject(firstKey,
						super.has(firstKey) ? super.get(firstKey) : {},
						keys, value
					)
				);

			}

			// check content recursivity
			else {

				const firstKey = keys.shift();

				super.set(firstKey,
					this._createBaseObject(firstKey,
						super.has(firstKey) ? super.get(firstKey) : {},
						keys, this._ensureDataRecursive(key, value)
					)
				);

			}

		}

		else if (!isPlainObject(value)) {
			super.set(key, value);
		}
		else if (isEmptyPlainObject(value)) {
			super.set(key, {});
		}

		// check content recursivity
		else {
			super.set(key, this._ensureDataRecursive(key, value));
		}

		return this;

	}

	skeleton (_key, _skeleton) {

		const key = ensureKey(_key);

		if (!isDefined(_skeleton)) {
			throw new ReferenceError("The \"" + key + "\" data has not any \"skeleton\" attribute");
		}
		else if (!isString(_skeleton)) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"skeleton\" attribute");
		}
		else if (isEmptyString(_skeleton)) {
			throw new RangeError("The \"" + key + "\" data has an empty \"skeleton\" attribute");
		}

		else {

			const skeleton = _skeleton.trim().toLowerCase();

			if (!inArray(VALID_SKELETONS, skeleton)) {

				throw new RangeError(
					"The \"" + key + "\" data \"" + skeleton + "\" skeleton is not in [ \"" + VALID_SKELETONS.join("\", \"") + "\" ]"
				);

			}
			else {

				this.skeletons[key] = skeleton;

				if ("email" === skeleton) {
					this.min(key, 6).regex(key, String(patternEmail));
				}
				else if ("url" === skeleton) {
					this.min(key, 11).regex(key, String(patternUrl));
				}

			}

		}

		return this;

	}

};
