
"use strict";

// deps

	const isArray = require(require("path").join(__dirname, "isArray.js"));

// module

module.exports = (key, skeleton, value) => {

	let result = value;

		if ("array" === skeleton && !isArray(value)) {

			if ("string" !== typeof value || "[" !== value[0] || "]" !== value[value.length - 1]) {
				throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
			}
			else {
				result = JSON.parse(value);
			}

		}

	return result;

};
