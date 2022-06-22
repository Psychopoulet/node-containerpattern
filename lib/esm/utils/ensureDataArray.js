"use strict";
// deps
// locals
import { isArray, isString } from "./validators";
// module
export default function ensureDataArray(key, skeleton, value) {
    if ("array" === skeleton && !isArray(value)) {
        if (!isString(value) || "[" !== value[0] || "]" !== value[value.length - 1]) {
            throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
        }
        else {
            return JSON.parse(value);
        }
    }
    else {
        return value;
    }
}
;
