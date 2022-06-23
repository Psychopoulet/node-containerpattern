"use strict";

// deps

	// locals
	import { isArray, isString } from "./validators";

// types & interfaces

	import { tValidSkeleton } from "./_interfaces";

// module

export default function ensureDataArray (key: string, skeleton: tValidSkeleton, value: Array<any> | string): Array<any> {

	if ("array" === skeleton && !isArray(value)) {

		if (!isString(value) || "[" !== value[0] || "]" !== value[value.length - 1]) {
			throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
		}
		else {
			return JSON.parse(value as string);
		}

	}
	else {
		return value as Array<any>;
	}

};
