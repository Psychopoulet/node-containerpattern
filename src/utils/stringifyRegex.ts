"use strict";

// deps

	// natives
	import { join } from "path";

	// locals
	const { isString, isRegExp } = require(join(__dirname, "validators"));

// module

module.exports = function stringifyRegex (regex) {

	if (isString(regex) || isRegExp(regex)) {

		let stringified = isString(regex) ? regex : String(regex);

		if (stringified.length && stringified.startsWith("/")) {
			stringified = stringified.slice(1, stringified.length);
		}

		if (stringified.length && stringified.endsWith("/")) {
			stringified = stringified.slice(0, stringified.length - 1);
		}

		return stringified;

	}
	else {
		return null;
	}

};
