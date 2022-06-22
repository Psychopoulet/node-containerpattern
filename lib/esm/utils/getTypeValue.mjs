"use strict";
// deps
// locals
import { isArray, isInteger, isObject, isNumber } from "./validators";
// module
export default function getTypeValue(value) {
    if (isArray(value)) {
        return "array";
    }
    else if (isObject(value)) {
        return "object";
    }
    else if (isInteger(value)) {
        return "integer";
    }
    else if (isNumber(value)) {
        return "float";
    }
    else {
        return typeof value;
    }
}
;
