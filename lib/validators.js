
"use strict";

// consts

	const { join } = require("path");

	const EMAIL_PATTERN = require(join(__dirname, "patterns", "email.js"));
	const IPV4_PATTERN = require(join(__dirname, "patterns", "IPV4.js"));
	const IPV6_PATTERN = require(join(__dirname, "patterns", "IPV6.js"));

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
					return Validators.isNotEmptyString(obj) && IPV4_PATTERN.test(obj);
				}

				static isIPV6 (obj) {
					return Validators.isNotEmptyString(obj) && IPV6_PATTERN.test(obj);
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
