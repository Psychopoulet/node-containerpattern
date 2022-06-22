"use strict";
// deps
// natives
import { isIPv4, isIPv6 } from "net";
// locals
import { patternColor, patternEmail, patternUrl } from "./patterns";
// module
export function isDefined(obj) {
    return "undefined" !== typeof obj;
}
;
export function isNumber(obj) {
    return isDefined(obj) && "number" === typeof obj;
}
export function isInteger(obj) {
    return isNumber(obj) && Number.isInteger(obj);
}
export function isString(obj) {
    return isDefined(obj) && "string" === typeof obj;
}
export function isEmptyString(obj) {
    return isString(obj) && "" === obj.trim();
}
export function isNotEmptyString(obj) {
    return isString(obj) && "" !== obj.trim();
}
export function isColor(obj) {
    return isNotEmptyString(obj) && patternColor.test(obj);
}
export function isEmail(obj) {
    return isNotEmptyString(obj) && patternEmail.test(obj);
}
export function isIPV4(obj) {
    return isNotEmptyString(obj) && isIPv4(obj);
}
export function isIPV6(obj) {
    return isNotEmptyString(obj) && isIPv6(obj);
}
export function isUrl(obj) {
    return isNotEmptyString(obj) && patternUrl.test(obj);
}
export function isObject(obj) {
    return isDefined(obj) && null !== obj && "object" === typeof obj;
}
export function isRegExp(obj) {
    return isObject(obj) && obj instanceof RegExp;
}
export function isArray(obj) {
    return isObject(obj) && obj instanceof Array;
}
export function isEmptyArray(obj) {
    return isArray(obj) && !obj.length;
}
export function isNotEmptyArray(obj) {
    return isArray(obj) && 0 < obj.length;
}
export function inArray(searchIn, obj) {
    return isNotEmptyArray(searchIn) && isDefined(obj) && searchIn.includes(obj);
}
export function isPlainObject(obj) {
    return isObject(obj) && Object === obj.constructor;
}
export function isEmptyPlainObject(obj) {
    return isPlainObject(obj) && !Object.keys(obj).length;
}
