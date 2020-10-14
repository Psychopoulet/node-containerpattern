"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const { isNumber, isInteger } = require(join(__dirname, "validators"));

// module

module.exports = function ensureDataBasic (key, skeleton, value) {

	if ("string" === skeleton) {
		return String(value);
	}
	else if ("boolean" === skeleton) {
		return "true" === value || "yes" === value || "y" === value || "1" === value || 1 === value || true === value;
	}
	else if ("float" === skeleton || "number" === skeleton) {

		if (isNumber(value)) {
			return value;
		}
		else {

			const parsed = parseFloat(value);

			if (isNaN(parsed)) {
				throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
			}
			else {
				return parsed;
			}

		}

	}
	else if ("integer" === skeleton && !isInteger(value)) {

		const parsed = parseInt(value, 10);

		if (isNaN(parsed)) {
			throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
		}
		else {
			return parsed;
		}

	}
	else {
		return value;
	}

};
