"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// locals
const validators_1 = require("./validators");
// module
function ensureDataArray(key, skeleton, value) {
    if ("array" === skeleton && !(0, validators_1.isArray)(value)) {
        if (!(0, validators_1.isString)(value) || "[" !== value[0] || "]" !== value[value.length - 1]) {
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
exports.default = ensureDataArray;
;
