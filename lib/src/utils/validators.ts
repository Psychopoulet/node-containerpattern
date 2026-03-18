// deps

    // natives
    import { isIPv4, isIPv6 } from "node:net";

    // locals
    import { patternColor, patternEmail, patternUrl, patternSerialWindows, patternSerialUnix } from "./patterns";

// module

export function isDefined (obj: unknown): boolean {
    return "undefined" !== typeof obj;
}

    export function isNumber (obj: unknown): boolean {
        return isDefined(obj) && "number" === typeof obj;
    }

        export function isInteger (obj: unknown): boolean {
            return isNumber(obj) && Number.isInteger(obj);
        }

    export function isString (obj: unknown): boolean {
        return isDefined(obj) && "string" === typeof obj;
    }

        export function isEmptyString (obj: unknown): boolean {
            return isString(obj) && "" === (obj as string).trim();
        }

        export function isNotEmptyString (obj: unknown): boolean {
            return isString(obj) && "" !== (obj as string).trim();
        }

            export function isColor (obj: unknown): boolean {
                return isNotEmptyString(obj) && patternColor.test(obj as string);
            }

            export function isEmail (obj: unknown): boolean {
                return isNotEmptyString(obj) && patternEmail.test(obj as string);
            }

            export function isIPV4 (obj: unknown): boolean {
                return isNotEmptyString(obj) && isIPv4(obj as string);
            }

            export function isIPV6 (obj: unknown): boolean {
                return isNotEmptyString(obj) && isIPv6(obj as string);
            }

            export function isUrl (obj: unknown): boolean {
                return isNotEmptyString(obj) && patternUrl.test(obj as string);
            }

            export function isSerial (obj: unknown): boolean {

                return isNotEmptyString(obj) && (
                    patternSerialWindows.test(obj as string)
                    || patternSerialUnix.test(obj as string)
                );

            }

    export function isObject (obj: unknown): boolean {
        return isDefined(obj) && null !== obj && "object" === typeof obj;
    }

        export function isRegExp (obj: unknown): boolean {
            return isObject(obj) && obj instanceof RegExp;
        }

        export function isArray (obj: unknown): boolean {
            return isObject(obj) && obj instanceof Array;
        }

            export function isEmptyArray (obj: unknown): boolean {
                return isArray(obj) && 0 >= (obj as unknown[]).length;
            }

            export function isNotEmptyArray (obj: unknown): boolean {
                return isArray(obj) && 0 < (obj as unknown[]).length;
            }

            export function inArray (searchIn: unknown, obj: unknown): boolean {
                return isNotEmptyArray(searchIn) && isDefined(obj) && (searchIn as unknown[]).includes(obj);
            }

        export function isPlainObject (obj: unknown): boolean {
            return isObject(obj) && Object === (obj as object).constructor;
        }

            export function isEmptyPlainObject (obj: unknown): boolean {
                return isPlainObject(obj) && !Object.keys(obj as object).length;
            }
