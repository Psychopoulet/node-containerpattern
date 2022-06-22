"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// locals
const validators_1 = require("./validators");
// module
function ensureKey(key) {
    if (!(0, validators_1.isDefined)(key)) {
        throw new ReferenceError("The key does not exist");
    }
    else if (!(0, validators_1.isString)(key)) {
        throw new TypeError("The key is not a string");
    }
    else if ((0, validators_1.isEmptyString)(key)) {
        throw new Error("The key is empty");
    }
    else {
        return key.trim();
    }
}
exports.default = ensureKey;
;
