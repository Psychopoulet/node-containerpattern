/*
	eslint no-extra-parens: 0
*/

"use strict";

// deps

	const { isEmail, isEmptyString, isIPV4, isIPV6 } = require(require("path").join(__dirname, "validators"));

// module

module.exports = (key, skeleton, value) => {

	if (isEmptyString(value)) {
		return value.trim();
	}
	else if (
		("email" === skeleton && !isEmail(value)) ||
		("ipv4" === skeleton && !isIPV4(value)) ||
		("ipv6" === skeleton && !isIPV6(value))
	) {
		throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
	}
	else {
		return value;
	}

};
