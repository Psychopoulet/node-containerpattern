/*
	eslint-disable max-lines, complexity, no-extra-parens
*/

"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

	const {
		isDefined,
		isString, isEmptyString, isNotEmptyString,
		isObject, isRegExp, isPlainObject, isEmptyPlainObject, isArray, isEmptyArray, inArray,
		isNumber, isInteger
	} = require(join(__dirname, "validators"));

	const getTypeValue = require(join(__dirname, "getTypeValue.js"));
	const ensureKey = require(join(__dirname, "ensureKey.js"));
	const ensureDataArray = require(join(__dirname, "ensureDataArray.js"));
	const ensureDataObject = require(join(__dirname, "ensureDataObject.js"));
	const ensureDataSpecific = require(join(__dirname, "ensureDataSpecific.js"));
	const ensureDataBasic = require(join(__dirname, "ensureDataBasic.js"));
	const stringifyRegex = require(join(__dirname, "stringifyRegex.js"));
	const { patternColor, patternEmail, patternUrl, patternIPV4, patternIPV6 } = require(join(__dirname, "patterns.js"));

// consts

	const VALID_SKELETONS = [ "array", "boolean", "color", "email", "float", "ipv4", "ipv6", "integer", "object", "string", "url" ];
	const MIN_MAX_SKELETONS = [ "array", "color", "email", "float", "ipv4", "ipv6", "integer", "string", "url" ];
	const REGEX_SKELETONS = [ "color", "email", "ipv4", "ipv6", "string", "url" ];

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
			else if (inArray([ "color", "email", "ipv4", "ipv6", "url" ], skeleton)) {
				return ensureDataSpecific(key, skeleton, value);
			}
			else if (inArray([ "array", "string" ], skeleton)) {

				const result = "array" === skeleton ? ensureDataArray(key, skeleton, value) : ensureDataBasic(key, skeleton, value);

				if (isNumber(this.mins[key]) && result.length < this.mins[key]) {

					throw new RangeError(
						"The \"" + key + "\" data length (" + result.length + ") is lower than the min allowed (" + this.mins[key] + ")"
					);

				}
				else if (isNumber(this.maxs[key]) && result.length > this.maxs[key]) {

					throw new RangeError(
						"The \"" + key + "\" data length (" + result.length + ") is higher than the max allowed (" + this.maxs[key] + ")"
					);

				}
				else if ("string" === skeleton && isDefined(this.regexs[key]) && !this.regexs[key].test(result)) {

					throw new Error(
						"The \"" + key + "\" data (" + result + ") does not match with its pattern (" + this.regexs[key] + ")"
					);

				}
				else {
					return result;
				}

			}
			else if (inArray([ "integer", "float" ], skeleton)) {

				const result = ensureDataBasic(key, skeleton, value);

				if (isNumber(this.mins[key]) && result < this.mins[key]) {

					throw new RangeError(
						"The \"" + key + "\" data (" + result + ") is lower than the min allowed (" + this.mins[key] + ")"
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

			value[i] = this._ensureData(key + this.recursionSeparator + i, value[i]);

			if (isPlainObject(value[i])) {
				value[i] = this._ensureDataRecursive(key + this.recursionSeparator + i, value[i]);
			}

		}

		return value;

	}

	_createBaseObject (parentKey, _parentValue, keys, value) {

		const parentValue = this._ensureData(parentKey, _parentValue);

			const key = keys.shift();

			if (keys.length) {

				const nextKey = parentKey + this.recursionSeparator + key;
				const defaultValue = isDefined(this.skeletons[nextKey]) && "array" === this.skeletons[nextKey] ? [] : {};

				parentValue[key] = this._createBaseObject(
					parentKey + this.recursionSeparator + key,
					!parentValue[key] ? defaultValue : parentValue[key], keys, value
				);

			}
			else {

				parentValue[key] = this._ensureData(parentKey + this.recursionSeparator + key, value);

			}

		return parentValue;

	}

	_extractDocumentation (previousKeys, object) {

		const result = {};

		const toExtract = [];

		if (isPlainObject(object)) {

			Object.keys(object).forEach((key) => {

				toExtract.push({
					key,
					"value": object[key]
				});

			});

		}
		else if (this === object || isArray(object)) {

			object.forEach((value, key) => {

				toExtract.push({
					key,
					value
				});

			});

		}

		toExtract.forEach(({ value, key }) => {

			const fullKey = !isEmptyString(previousKeys) ? previousKeys + this.recursionSeparator + key : key;

			const type = isNotEmptyString(this.skeletons[fullKey]) ? this.skeletons[fullKey] : getTypeValue(value);

			let min = null;
			if (isDefined(this.mins[fullKey])) {
				min = this.mins[fullKey];
			}
			else if ("array" === type) {
				min = 0;
			}

			let regex = null;
			if (isDefined(this.regexs[fullKey])) {
				regex = stringifyRegex(this.regexs[fullKey]);
			}

			result[key] = {
				"documentation": this.documentations[fullKey] ? this.documentations[fullKey] : "",
				"fullkey": fullKey,
				min,
				"max": isDefined(this.maxs[fullKey]) ? this.maxs[fullKey] : null,
				"limits": isArray(this.limits[fullKey]) ? this.limits[fullKey] : null,
				regex,
				type
			};

			if ("array" === result[key].type) {
				result[key].content = isEmptyArray(value) ? {} : this._extractDocumentation(fullKey, value);
			}
			else if ("object" === result[key].type) {
				result[key].content = isEmptyPlainObject(value) ? {} : this._extractDocumentation(fullKey, value);
			}

			else if ("function" !== result[key].type) {
				result[key].value = value;
			}

		});

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
		else if ("float" === this.skeletons[key] && !isNumber(min)) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"min\" attribute");
		}
		else if ([ "array", "color", "email", "integer", "ipv4", "ipv6", "string", "url" ].includes(this.skeletons[key]) && !isInteger(min)) {
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
		else if ("float" === this.skeletons[key] && !isNumber(max)) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"max\" attribute");
		}
		else if ([ "array", "color", "email", "integer", "ipv4", "ipv6", "string", "url" ].includes(this.skeletons[key]) && !isInteger(max)) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"max\" attribute");
		}

		else {
			this.maxs[key] = max;
		}

		return this;

	}

	regex (_key, regex) {

		const key = ensureKey(_key);

		if (!isDefined(regex)) {
			throw new ReferenceError("The \"" + key + "\" data has not any \"regex\" attribute");
		}
		else if (!isRegExp(regex)) {
			throw new TypeError("The \"" + key + "\" data has an invalid \"regex\" attribute");
		}

		else if (!isNotEmptyString(this.skeletons[key])) {
			throw new ReferenceError("The \"" + key + "\" data has not any skeleton");
		}
		else if (!REGEX_SKELETONS.includes(this.skeletons[key])) {

			throw new RangeError(
				"The \"" + key + "\" data \"" + this.skeletons[key] + "\" skeleton is not in [ \"" + REGEX_SKELETONS.join("\", \"") + "\" ]"
			);

		}

		else {

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
				const defaultParentValue = isDefined(this.skeletons[firstKey]) && "array" === this.skeletons[firstKey] ? [] : {};

				super.set(firstKey,
					this._createBaseObject(firstKey,
						super.has(firstKey) ? super.get(firstKey) : defaultParentValue,
						keys, value
					)
				);

			}

			// check content recursivity
			else {

				const firstKey = keys.shift();
				const defaultParentValue = isDefined(this.skeletons[firstKey]) && "array" === this.skeletons[firstKey] ? [] : {};

				super.set(firstKey,
					this._createBaseObject(firstKey,
						super.has(firstKey) ? super.get(firstKey) : defaultParentValue,
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

				if ("array" === skeleton || "string" === skeleton) {
					this.min(key, 0);
				}

				// #000 -> #000000
				else if ("color" === skeleton) {
					this.min(key, 4).max(key, 7).regex(key, patternColor);
				}

				// a@a.tv
				else if ("email" === skeleton) {
					this.min(key, 6).regex(key, patternEmail);
				}

				// 0.0.0.0 -> 256.256.256.256
				else if ("ipv4" === skeleton) {
					this.min(key, 7).max(key, 15).regex(key, patternIPV4);
				}

				// ::::::: -> ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff
				else if ("ipv6" === skeleton) {
					this.min(key, 7).max(key, 39).regex(key, patternIPV6);
				}

				// www.s.tv, ftp://s.tv, https://thisisatest.com?req=sort_desc
				else if ("url" === skeleton) {
					this.min(key, 8).regex(key, patternUrl);
				}

			}

		}

		return this;

	}

};
