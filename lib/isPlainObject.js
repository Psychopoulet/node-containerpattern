
"use strict";

// module

module.exports = (obj) => {
	return obj && "object" === typeof obj && Object === obj.constructor;
};
