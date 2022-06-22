"use strict";
// deps
// locals
import { isPlainObject, isString } from "./validators";
// module
export default function ensureDataObject(key, skeleton, value) {
    if ("object" === skeleton && !isPlainObject(value)) {
        if (!isString(value) || "{" !== value[0] || "}" !== value[value.length - 1]) {
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
