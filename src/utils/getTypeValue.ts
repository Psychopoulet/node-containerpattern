"use strict";

// deps

	// natives
	import { join } from "path";

	// locals
	const { isArray, isInteger, isObject, isNumber } = require(join(__dirname, "validators"));

// module

export default function getTypeValue (value: any): string {

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
