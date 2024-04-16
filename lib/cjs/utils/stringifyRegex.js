"use strict";
// deps
Object.defineProperty(exports, "__esModule", { value: true });
// locals
const validators_1 = require("./validators");
// module
function stringifyRegex(regex) {
    if ((0, validators_1.isString)(regex) || (0, validators_1.isRegExp)(regex)) {
        let stringified = (0, validators_1.isString)(regex) ? regex : String(regex);
        if (stringified.length && stringified.startsWith("/")) {
            stringified = stringified.slice(1, stringified.length);
        }
        if (stringified.length && stringified.endsWith("/")) {
            stringified = stringified.slice(0, stringified.length - 1);
        }
        return stringified;
    }
    else {
        return "";
    }
}
exports.default = stringifyRegex;
