"use strict";
// deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyPlainObject = exports.isPlainObject = exports.inArray = exports.isNotEmptyArray = exports.isEmptyArray = exports.isArray = exports.isRegExp = exports.isObject = exports.isSerial = exports.isUrl = exports.isIPV6 = exports.isIPV4 = exports.isEmail = exports.isColor = exports.isNotEmptyString = exports.isEmptyString = exports.isString = exports.isInteger = exports.isNumber = exports.isDefined = void 0;
// natives
const node_net_1 = require("node:net");
// locals
const patterns_1 = require("./patterns");
// module
function isDefined(obj) {
    return "undefined" !== typeof obj;
}
exports.isDefined = isDefined;
function isNumber(obj) {
    return isDefined(obj) && "number" === typeof obj;
}
exports.isNumber = isNumber;
function isInteger(obj) {
    return isNumber(obj) && Number.isInteger(obj);
}
exports.isInteger = isInteger;
function isString(obj) {
    return isDefined(obj) && "string" === typeof obj;
}
exports.isString = isString;
function isEmptyString(obj) {
    return isString(obj) && "" === obj.trim();
}
exports.isEmptyString = isEmptyString;
function isNotEmptyString(obj) {
    return isString(obj) && "" !== obj.trim();
}
exports.isNotEmptyString = isNotEmptyString;
function isColor(obj) {
    return isNotEmptyString(obj) && patterns_1.patternColor.test(obj);
}
exports.isColor = isColor;
function isEmail(obj) {
    return isNotEmptyString(obj) && patterns_1.patternEmail.test(obj);
}
exports.isEmail = isEmail;
function isIPV4(obj) {
    return isNotEmptyString(obj) && (0, node_net_1.isIPv4)(obj);
}
exports.isIPV4 = isIPV4;
function isIPV6(obj) {
    return isNotEmptyString(obj) && (0, node_net_1.isIPv6)(obj);
}
exports.isIPV6 = isIPV6;
function isUrl(obj) {
    return isNotEmptyString(obj) && patterns_1.patternUrl.test(obj);
}
exports.isUrl = isUrl;
function isSerial(obj) {
    return isNotEmptyString(obj) && (patterns_1.patternSerialWindows.test(obj)
        || patterns_1.patternSerialUnix.test(obj));
}
exports.isSerial = isSerial;
function isObject(obj) {
    return isDefined(obj) && null !== obj && "object" === typeof obj;
}
exports.isObject = isObject;
function isRegExp(obj) {
    return isObject(obj) && obj instanceof RegExp;
}
exports.isRegExp = isRegExp;
function isArray(obj) {
    return isObject(obj) && obj instanceof Array;
}
exports.isArray = isArray;
function isEmptyArray(obj) {
    return isArray(obj) && !obj.length;
}
exports.isEmptyArray = isEmptyArray;
function isNotEmptyArray(obj) {
    return isArray(obj) && 0 < obj.length;
}
exports.isNotEmptyArray = isNotEmptyArray;
function inArray(searchIn, obj) {
    return isNotEmptyArray(searchIn) && isDefined(obj) && searchIn.includes(obj);
}
exports.inArray = inArray;
function isPlainObject(obj) {
    return isObject(obj) && Object === obj.constructor;
}
exports.isPlainObject = isPlainObject;
function isEmptyPlainObject(obj) {
    return isPlainObject(obj) && !Object.keys(obj).length;
}
exports.isEmptyPlainObject = isEmptyPlainObject;
