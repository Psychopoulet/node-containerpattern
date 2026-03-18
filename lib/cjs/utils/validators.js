"use strict";
// deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefined = isDefined;
exports.isNumber = isNumber;
exports.isInteger = isInteger;
exports.isString = isString;
exports.isEmptyString = isEmptyString;
exports.isNotEmptyString = isNotEmptyString;
exports.isColor = isColor;
exports.isEmail = isEmail;
exports.isIPV4 = isIPV4;
exports.isIPV6 = isIPV6;
exports.isUrl = isUrl;
exports.isSerial = isSerial;
exports.isObject = isObject;
exports.isRegExp = isRegExp;
exports.isArray = isArray;
exports.isEmptyArray = isEmptyArray;
exports.isNotEmptyArray = isNotEmptyArray;
exports.inArray = inArray;
exports.isPlainObject = isPlainObject;
exports.isEmptyPlainObject = isEmptyPlainObject;
// natives
const node_net_1 = require("node:net");
// locals
const patterns_1 = require("./patterns");
// module
function isDefined(obj) {
    return "undefined" !== typeof obj;
}
function isNumber(obj) {
    return isDefined(obj) && "number" === typeof obj;
}
function isInteger(obj) {
    return isNumber(obj) && Number.isInteger(obj);
}
function isString(obj) {
    return isDefined(obj) && "string" === typeof obj;
}
function isEmptyString(obj) {
    return isString(obj) && "" === obj.trim();
}
function isNotEmptyString(obj) {
    return isString(obj) && "" !== obj.trim();
}
function isColor(obj) {
    return isNotEmptyString(obj) && patterns_1.patternColor.test(obj);
}
function isEmail(obj) {
    return isNotEmptyString(obj) && patterns_1.patternEmail.test(obj);
}
function isIPV4(obj) {
    return isNotEmptyString(obj) && (0, node_net_1.isIPv4)(obj);
}
function isIPV6(obj) {
    return isNotEmptyString(obj) && (0, node_net_1.isIPv6)(obj);
}
function isUrl(obj) {
    return isNotEmptyString(obj) && patterns_1.patternUrl.test(obj);
}
function isSerial(obj) {
    return isNotEmptyString(obj) && (patterns_1.patternSerialWindows.test(obj)
        || patterns_1.patternSerialUnix.test(obj));
}
function isObject(obj) {
    return isDefined(obj) && null !== obj && "object" === typeof obj;
}
function isRegExp(obj) {
    return isObject(obj) && obj instanceof RegExp;
}
function isArray(obj) {
    return isObject(obj) && obj instanceof Array;
}
function isEmptyArray(obj) {
    return isArray(obj) && 0 >= obj.length;
}
function isNotEmptyArray(obj) {
    return isArray(obj) && 0 < obj.length;
}
function inArray(searchIn, obj) {
    return isNotEmptyArray(searchIn) && isDefined(obj) && searchIn.includes(obj);
}
function isPlainObject(obj) {
    return isObject(obj) && Object === obj.constructor;
}
function isEmptyPlainObject(obj) {
    return isPlainObject(obj) && !Object.keys(obj).length;
}
