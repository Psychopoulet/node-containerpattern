"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const { isEmail, isEmptyString, isIPV4, isIPV6 } = require(join(__dirname, "validators"));

// module

module.exports = (key, skeleton, value) => {

	if (isEmptyString(value)) {
		return value.trim();
	}
	else if ("email" === skeleton && !isEmail(value)) {
		throw new TypeError("The \"" + key + "\" data does not correspond to the \"email\" skeleton");
	}
	else if ("ipv4" === skeleton && !isIPV4(value)) {
		throw new TypeError("The \"" + key + "\" data does not correspond to the \"ipv4\" skeleton");
	}
	else if ("ipv6" === skeleton && !isIPV6(value)) {
		throw new TypeError("The \"" + key + "\" data does not correspond to the \"ipv6\" skeleton");
	}
	else {
		return value;
	}

};
