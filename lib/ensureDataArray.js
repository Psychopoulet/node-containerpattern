"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const { isArray, isString } = require(join(__dirname, "validators"));

// module

module.exports = (key, skeleton, value) => {

	let result = value;

		if ("array" === skeleton && !isArray(value)) {

			if (!isString(value) || "[" !== value[0] || "]" !== value[value.length - 1]) {
				throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
			}
			else {
				result = JSON.parse(value);
			}

		}

	return result;

};
