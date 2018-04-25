
"use strict";

// deps

	const { isPlainObject, isString } = require(require("path").join(__dirname, "validators"));

// module

module.exports = (key, skeleton, value) => {

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
