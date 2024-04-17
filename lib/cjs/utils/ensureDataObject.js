"use strict";
// deps
Object.defineProperty(exports, "__esModule", { value: true });
// locals
const validators_1 = require("./validators");
// module
function ensureDataObject(key, skeleton, value) {
    if ("object" === skeleton && !(0, validators_1.isPlainObject)(value)) {
        if (!(0, validators_1.isString)(value) || "{" !== value[0] || "}" !== value[value.length - 1]) {
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
exports.default = ensureDataObject;
