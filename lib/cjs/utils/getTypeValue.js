"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// locals
const validators_1 = require("./validators");
// module
function getTypeValue(value) {
    if ((0, validators_1.isArray)(value)) {
        return "array";
    }
    else if ((0, validators_1.isObject)(value)) {
        return "object";
    }
    else if ((0, validators_1.isInteger)(value)) {
        return "integer";
    }
    else if ((0, validators_1.isNumber)(value)) {
        return "float";
    }
    else {
        return typeof value;
    }
}
exports.default = getTypeValue;
;
