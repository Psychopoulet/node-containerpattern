
"use strict";

// module

module.exports = (key) => {

	if ("undefined" === typeof key) {
		throw new ReferenceError("The key does not exist");
	}
	else if ("string" !== typeof key) {
		throw new TypeError("The key is not a string");
	}
	else {

		const _key = key.trim();

		if ("" === _key) {
			throw new Error("The key is empty");
		}
		else {
			return _key;
		}

	}

};
