
"use strict";

// deps

	const { join } = require("path");

// consts

	const EMAIL_PATTERN = require(join(__dirname, "emailPattern.js"));
	const IPV4_PATTERN = require(join(__dirname, "IPV4Pattern.js"));
	const IPV6_PATTERN = require(join(__dirname, "IPV6Pattern.js"));

// module

module.exports = (key, skeleton, value) => {

	if ("email" === skeleton) {

		if ("string" !== typeof value) {
			throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
		}
		else if ("" !== value && !EMAIL_PATTERN.test(value)) {
			throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
		}

	}
	else if ("ipv4" === skeleton) {

		if ("string" !== typeof value) {
			throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
		}
		else if ("" !== value && !IPV4_PATTERN.test(value)) {
			throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
		}

	}
	else if ("ipv6" === skeleton) {

		if ("string" !== typeof value) {
			throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
		}
		else if ("" !== value && !IPV6_PATTERN.test(value)) {
			throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
		}

	}

	return value;

};
