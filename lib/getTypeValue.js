"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const { isArray, isInteger, isObject, isNumber } = require(join(__dirname, "validators"));

// module

module.exports = (value) => {

	if (isArray(value)) {
		return "array";
	}
	else if (isObject(value)) {
		return "object";
	}
	else if (isInteger(value)) {
		return "integer";
	}
	else if (isNumber(value)) {
		return "float";
	}
	else {
		return typeof value;
	}

};
