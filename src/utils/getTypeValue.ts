// deps

    // locals
    import { isArray, isInteger, isObject, isNumber } from "./validators";

// types & interfaces

    import type { tValidType } from "./_interfaces";

// module

export default function getTypeValue (value: any): tValidType {

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
        return typeof value as "boolean" | "string" | "function";
    }

}
