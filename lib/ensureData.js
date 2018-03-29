
"use strict";

// deps

	const { join } = require("path");

	const ensureDataArray = require(join(__dirname, "ensureDataArray.js"));
	const ensureDataObject = require(join(__dirname, "ensureDataObject.js"));
	const ensureDataSpecific = require(join(__dirname, "ensureDataSpecific.js"));
	const ensureDataBasic = require(join(__dirname, "ensureDataBasic.js"));

// module

module.exports = (key, limit, skeleton, value) => {

	let result = value;

		// check existance
		if ("undefined" === typeof value) {
			throw new ReferenceError("The \"" + key + "\" value is undefined");
		}

		// check limits
		else if (limit && -1 >= limit.indexOf(value)) {
			throw new Error("The \"" + key + "\" data does not correspond to the limits (" + JSON.stringify(limit) + ")");
		}

		// check skeleton
		else if (skeleton) {

			if ("object" === skeleton) {
				result = ensureDataObject(key, skeleton, result);
			}
			else if ("array" === skeleton) {
				result = ensureDataArray(key, skeleton, result);
			}
			else if ([ "email", "ipv4", "ipv6" ].includes(skeleton)) {
				result = ensureDataSpecific(key, skeleton, result);
			}
			else {
				result = ensureDataBasic(key, skeleton, result);
			}

		}

	return result;

};
