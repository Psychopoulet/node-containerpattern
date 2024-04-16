"use strict";
// deps
Object.defineProperty(exports, "__esModule", { value: true });
// locals
const validators_1 = require("./validators");
// module
function ensureDataSpecific(key, skeleton, value) {
    if ((0, validators_1.isEmptyString)(value)) {
        return "";
    }
    else if (!["color", "email", "ipv4", "ipv6", "url"].includes(skeleton)) {
        return value;
    }
    else {
        const data = value.trim().toLowerCase();
        if ("color" === skeleton && !(0, validators_1.isColor)(data)) {
            throw new TypeError("The \"" + key + "\" data does not correspond to the \"color\" skeleton");
        }
        else if ("email" === skeleton && !(0, validators_1.isEmail)(data)) {
            throw new TypeError("The \"" + key + "\" data does not correspond to the \"email\" skeleton");
        }
        else if ("ipv4" === skeleton && !(0, validators_1.isIPV4)(data)) {
            throw new TypeError("The \"" + key + "\" data does not correspond to the \"ipv4\" skeleton");
        }
        else if ("ipv6" === skeleton && !(0, validators_1.isIPV6)(data)) {
            throw new TypeError("The \"" + key + "\" data does not correspond to the \"ipv6\" skeleton");
        }
        else if ("url" === skeleton && !(0, validators_1.isUrl)(data)) {
            throw new TypeError("The \"" + key + "\" data does not correspond to the \"url\" skeleton");
        }
        else {
            return data;
        }
    }
}
exports.default = ensureDataSpecific;
