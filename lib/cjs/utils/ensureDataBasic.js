"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// locals
const validators_1 = require("./validators");
// module
function ensureDataBasic(key, skeleton, value) {
    if ("string" === skeleton) {
        return String(value);
    }
    else if ("boolean" === skeleton) {
        return "true" === value || "yes" === value || "y" === value || "1" === value || 1 === value || true === value;
    }
    else if ("float" === skeleton) {
        if ((0, validators_1.isNumber)(value)) {
            return value;
        }
        else {
            const parsed = parseFloat(value);
            if (isNaN(parsed)) {
                throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
            }
            else {
                return parsed;
            }
        }
    }
    else if ("integer" === skeleton && !(0, validators_1.isInteger)(value)) {
        const parsed = parseInt(value, 10);
        if (isNaN(parsed)) {
            throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
        }
        else {
            return parsed;
        }
    }
    else {
        return value;
    }
}
exports.default = ensureDataBasic;
;
