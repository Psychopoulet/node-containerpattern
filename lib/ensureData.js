
"use strict";

// deps

	const { join } = require("path");

	const { isDefined, isArray, inArray } = require(join(__dirname, "validators.js"));
	const ensureDataArray = require(join(__dirname, "ensureDataArray.js"));
	const ensureDataObject = require(join(__dirname, "ensureDataObject.js"));
	const ensureDataSpecific = require(join(__dirname, "ensureDataSpecific.js"));
	const ensureDataBasic = require(join(__dirname, "ensureDataBasic.js"));

// module

module.exports = (key, limits, skeleton, value) => {

	// check existance
	if (!isDefined(value)) {
		throw new ReferenceError("The \"" + key + "\" value is undefined");
	}

	// check limits
	else if (isArray(limits) && !inArray(limits, value)) {
		throw new Error("The \"" + key + "\" data does not correspond to the limits (" + JSON.stringify(limits) + ")");
	}

	// check skeleton
	else if (skeleton) {

		if ("object" === skeleton) {
			return ensureDataObject(key, skeleton, value);
		}
		else if ("array" === skeleton) {
			return ensureDataArray(key, skeleton, value);
		}
		else if (inArray([ "email", "ipv4", "ipv6" ], skeleton)) {
			return ensureDataSpecific(key, skeleton, value);
		}
		else {
			return ensureDataBasic(key, skeleton, value);
		}

	}
	else {
		return value;
	}

};
