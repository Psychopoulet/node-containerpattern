
"use strict";

// module

module.exports = (obj) => {
	return obj && "object" === typeof obj && obj instanceof Array;
};
