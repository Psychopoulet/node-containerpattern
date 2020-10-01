"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const { isDefined, isString, isEmptyString } = require(join(__dirname, "validators"));

// module

module.exports = (key) => {

	if (!isDefined(key)) {
		throw new ReferenceError("The key does not exist");
	}
	else if (!isString(key)) {
		throw new TypeError("The key is not a string");
	}
	else if (isEmptyString(key)) {
		throw new Error("The key is empty");
	}
	else {
		return key.trim();
	}

};
