"use strict";

// deps

	// natives
	import { join } from "path";

	// locals
	const { isPlainObject, isString } = require(join(__dirname, "validators"));

// module

module.exports = function ensureDataObject (key, skeleton, value) {

	let result = value;

		if ("object" === skeleton && !isPlainObject(value)) {

			if (!isString(value) || "{" !== value[0] || "}" !== value[value.length - 1]) {
				throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
			}
			else {
				result = JSON.parse(value);
			}

		}

	return result;

};
