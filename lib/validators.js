/*
	eslint-disable max-len, no-useless-escape
*/

"use strict";

// deps

	// locals
	const { isIPv4, isIPv6 } = require("net");

// consts

	const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// module

class Validators {

	static isDefined (obj) {
		return "undefined" !== typeof obj;
	}

		static isNumber (obj) {
			return Validators.isDefined(obj) && "number" === typeof obj;
		}

			static isInteger (obj) {
				return Validators.isNumber(obj) && Number.isInteger(obj);
			}

		static isString (obj) {
			return Validators.isDefined(obj) && "string" === typeof obj;
		}

			static isEmptyString (obj) {
				return Validators.isString(obj) && "" === obj.trim();
			}

			static isNotEmptyString (obj) {
				return Validators.isString(obj) && "" !== obj.trim();
			}

				static isEmail (obj) {
					return Validators.isNotEmptyString(obj) && EMAIL_PATTERN.test(obj);
				}

				static isIPV4 (obj) {
					return Validators.isNotEmptyString(obj) && isIPv4(obj);
				}

				static isIPV6 (obj) {
					return Validators.isNotEmptyString(obj) && isIPv6(obj);
				}

		static isObject (obj) {
			return Validators.isDefined(obj) && null !== obj && "object" === typeof obj;
		}

			static isArray (obj) {
				return Validators.isObject(obj) && obj instanceof Array;
			}

				static isEmptyArray (obj) {
					return Validators.isArray(obj) && !obj.length;
				}

				static isNotEmptyArray (obj) {
					return Validators.isArray(obj) && 0 < obj.length;
				}

				static inArray (searchIn, obj) {
					return Validators.isNotEmptyArray(searchIn) && Validators.isDefined(obj) && searchIn.includes(obj);
				}

			static isPlainObject (obj) {
				return Validators.isObject(obj) && Object === obj.constructor;
			}

				static isEmptyPlainObject (obj) {
					return Validators.isPlainObject(obj) && !Object.keys(obj).length;
				}

}

module.exports = Validators;
