
"use strict";

// module

module.exports = (key, skeleton, value) => {

	let result = value;

		if ("string" === skeleton) {
			result = String(value);
		}
		else if ("boolean" === skeleton) {
			result = "true" === value || "yes" === value || "y" === value || "1" === value || 1 === value || true === value;
		}
		else if ("float" === skeleton || "number" === skeleton) {

			if (isNaN(parseFloat(value))) {
				throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
			}
			else {
				result = parseFloat(value);
			}

		}
		else if ("integer" === skeleton) {

			if (isNaN(parseInt(value, 10))) {
				throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
			}
			else {
				result = parseInt(value, 10);
			}

		}

	return result;

};
