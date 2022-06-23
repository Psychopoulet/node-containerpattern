"use strict";

// deps

	// natives
	import { isIPv4, isIPv6 } from "net";

	// locals
	import { patternColor, patternEmail, patternUrl } from "./patterns";

// module

export function isDefined (obj: any): boolean {
	return "undefined" !== typeof obj;
};

	export function isNumber (obj: any): boolean {
		return isDefined(obj) && "number" === typeof obj;
	}

		export function isInteger (obj: any): boolean {
			return isNumber(obj) && Number.isInteger(obj);
		}

	export function isString (obj: any): boolean {
		return isDefined(obj) && "string" === typeof obj;
	}

		export function isEmptyString (obj: any): boolean {
			return isString(obj) && "" === obj.trim();
		}

		export function isNotEmptyString (obj: any): boolean {
			return isString(obj) && "" !== obj.trim();
		}

			export function isColor (obj: any): boolean {
				return isNotEmptyString(obj) && patternColor.test(obj);
			}

			export function isEmail (obj: any): boolean {
				return isNotEmptyString(obj) && patternEmail.test(obj);
			}

			export function isIPV4 (obj: any): boolean {
				return isNotEmptyString(obj) && isIPv4(obj);
			}

			export function isIPV6 (obj: any): boolean {
				return isNotEmptyString(obj) && isIPv6(obj);
			}

			export function isUrl (obj: any): boolean {
				return isNotEmptyString(obj) && patternUrl.test(obj);
			}

	export function isObject (obj: any): boolean {
		return isDefined(obj) && null !== obj && "object" === typeof obj;
	}

		export function isRegExp (obj: any): boolean {
			return isObject(obj) && obj instanceof RegExp;
		}

		export function isArray (obj: any): boolean {
			return isObject(obj) && obj instanceof Array;
		}

			export function isEmptyArray (obj: any): boolean {
				return isArray(obj) && !obj.length;
			}

			export function isNotEmptyArray (obj: any): boolean {
				return isArray(obj) && 0 < obj.length;
			}

			export function inArray (searchIn: any, obj: any): boolean {
				return isNotEmptyArray(searchIn) && isDefined(obj) && (searchIn as Array<any>).includes(obj);
			}

		export function isPlainObject (obj: any): boolean {
			return isObject(obj) && Object === obj.constructor;
		}

			export function isEmptyPlainObject (obj: any): boolean {
				return isPlainObject(obj) && !Object.keys(obj).length;
			}
