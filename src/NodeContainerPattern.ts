// deps

    // locals

    import {
        isDefined,
        isString, isEmptyString, isNotEmptyString,
        isObject, isRegExp, isPlainObject, isEmptyPlainObject, isArray, isEmptyArray, inArray,
        isNumber, isInteger
    } from "./utils/validators";

    import getTypeValue from "./utils/getTypeValue";
    import ensureKey from "./utils/ensureKey";
    import ensureDataArray from "./utils/ensureDataArray";
    import ensureDataBasic from "./utils/ensureDataBasic";
    import ensureDataObject from "./utils/ensureDataObject";
    import ensureDataSpecific from "./utils/ensureDataSpecific";
    import stringifyRegex from "./utils/stringifyRegex";
    import { patternColor, patternEmail, patternUrl, patternIPV4, patternIPV6 } from "./utils/patterns";

// types & interfaces

    import type {
        tValidSkeleton, tMinMaxValidSkeleton, tRegexValidSkeleton,
        tValidType,
        iDocumentationFunction, iDocumentationObjectOrArray, iDocumentationValue
    } from "./utils/_interfaces";

    export type {
        tValidSkeleton, tMinMaxValidSkeleton, tRegexValidSkeleton,
        tValidType,
        iDocumentationFunction, iDocumentationObjectOrArray, iDocumentationValue
    };

// consts

    const VALID_SKELETONS: tValidSkeleton[] = [
        "array",
        "boolean",
        "color",
        "email",
        "float",
        "ipv4",
        "ipv6",
        "integer",
        "object",
        "string",
        "url",
        "serial"
    ];

    const MIN_MAX_SKELETONS: tMinMaxValidSkeleton[] = [
        "array",
        "color",
        "email",
        "float",
        "ipv4",
        "ipv6",
        "integer",
        "string",
        "url",
        "serial"
    ];

    const REGEX_SKELETONS: tRegexValidSkeleton[] = [
        "color",
        "email",
        "ipv4",
        "ipv6",
        "string",
        "url",
        "serial"
    ];

// module

export default class NodeContainerPattern extends Map {

    // attributes

        // public

        public documentations: Record<string, any>;
        public limits: Record<string, Array<string | number>>;
        public mins: Record<string, number>;
        public maxs: Record<string, number>;
        public recursionSeparator: string;
        public regexs: Record<string, RegExp>;
        public skeletons: Record<string, tValidSkeleton>;

    // constructor

    public constructor (recursionSeparator: string = ".") {

        super();

        this.documentations = {};
        this.limits = {};
        this.mins = {};
        this.maxs = {};
        this.recursionSeparator = isNotEmptyString(recursionSeparator) ? recursionSeparator : ".";
        this.regexs = {};
        this.skeletons = {};

    }

    // private

        private _ensureData (key: string, value: any): any {

            // check existance
            if (!isDefined(value)) {
                throw new ReferenceError("The \"" + key + "\" value is undefined");
            }

            // check limits
            else if (isArray(this.limits[key]) && !inArray(this.limits[key], value)) {
                throw new Error("The \"" + key + "\" value (" + value + ") does not correspond to the limits (" + JSON.stringify(this.limits[key]) + ")");
            }

            // check skeleton
            else if (isDefined(this.skeletons[key])) {

                const skeleton: tValidSkeleton = this.skeletons[key];

                if ("object" === skeleton) {
                    return ensureDataObject(key, skeleton, value);
                }
                else if (inArray([
                    "color",
                    "email",
                    "ipv4",
                    "ipv6",
                    "url",
                    "serial"
                ], skeleton)) {
                    return ensureDataSpecific(key, skeleton, value);
                }
                else if (inArray([ "array", "string" ], skeleton)) {

                    const result: any[] | string = "array" === skeleton ? ensureDataArray(key, skeleton, value) : ensureDataBasic(key, skeleton, value) as string;

                    if (isNumber(this.mins[key]) && result.length < this.mins[key]) {

                        throw new RangeError(
                            "The \"" + key + "\" data length (" + result.length + ") is lower than the min allowed (" + this.mins[key] + ")"
                        );

                    }
                    else if (isNumber(this.maxs[key]) && result.length > this.maxs[key]) {

                        throw new RangeError(
                            "The \"" + key + "\" data length (" + result.length + ") is higher than the max allowed (" + this.maxs[key] + ")"
                        );

                    }
                    else if ("string" === skeleton && isDefined(this.regexs[key]) && !this.regexs[key].test(result as string)) {

                        throw new Error(
                            "The \"" + key + "\" data (" + (result as string) + ") does not match with its pattern (" + this.regexs[key] + ")"
                        );

                    }
                    else {
                        return result;
                    }

                }
                else if (inArray([ "integer", "float" ], skeleton)) {

                    const result: number = ensureDataBasic(key, skeleton, value) as number;

                    if (isNumber(this.mins[key]) && result < this.mins[key]) {

                        throw new RangeError(
                            "The \"" + key + "\" data (" + result + ") is lower than the min allowed (" + this.mins[key] + ")"
                        );

                    }
                    else if (isNumber(this.maxs[key]) && result > this.maxs[key]) {

                        throw new RangeError(
                            "The \"" + key + "\" data (" + result + ") is higher than the max allowed (" + this.maxs[key] + ")"
                        );

                    }
                    else {
                        return result;
                    }

                }
                else {
                    return ensureDataBasic(key, skeleton, value);
                }

            }
            else {
                return value;
            }

        }

        private _ensureDataRecursive (key: string, value: Record<string, any>): Record<string, any> {

            for (const i in value) {

                value[i] = this._ensureData(key + this.recursionSeparator + i, value[i]);

                if (isPlainObject(value[i])) {
                    value[i] = this._ensureDataRecursive(key + this.recursionSeparator + i, value[i]);
                }

            }

            return value;

        }

        private _createBaseObject (parentKey: string, _parentValue: any, keys: string[], value: any): any {

            const parentValue: any = this._ensureData(parentKey, _parentValue);

                const key: string = keys.shift() as string;

                if (keys.length) {

                    type tDefaultValue = Record<string, any> | [];

                    const nextKey: string = parentKey + this.recursionSeparator + key;
                    const defaultValue: tDefaultValue = isDefined(this.skeletons[nextKey]) && "array" === this.skeletons[nextKey] ? [] : {};

                    parentValue[key] = this._createBaseObject(
                        parentKey + this.recursionSeparator + key,
                        !parentValue[key] ? defaultValue : parentValue[key] as tDefaultValue, keys, value
                    );

                }
                else {

                    parentValue[key] = this._ensureData(parentKey + this.recursionSeparator + key, value);

                }

            return parentValue;

        }

        private _extractDocumentation (previousKeys: string, object: any): Record<string, any> {

            const result: Record<string, any> = {};

            const toExtract: any[] = [];

            if (isPlainObject(object)) {

                Object.keys(object).forEach((key): void => {

                    toExtract.push({
                        key,
                        "value": (object as Record<string, any>)[key]
                    });

                });

            }
            else if (this === object || isArray(object)) {

                (object as any[]).forEach((value: any, key: number): void => {

                    toExtract.push({
                        key,
                        value
                    });

                });

            }

            toExtract.forEach(({ value, key }): void => {

                const fullKey: string = !isEmptyString(previousKeys) ? previousKeys + this.recursionSeparator + key : key;

                const type: tValidType = isNotEmptyString(this.skeletons[fullKey]) ? this.skeletons[fullKey] as tValidSkeleton : getTypeValue(value);

                const documentation: iDocumentationFunction | iDocumentationObjectOrArray | iDocumentationValue = {
                    "fullkey": fullKey,
                    type
                };

                if ("undefined" !== typeof this.documentations[fullKey]) {
                    documentation.documentation = this.documentations[fullKey];
                }

                if (isDefined(this.mins[fullKey])) {
                    documentation.min = this.mins[fullKey];
                }
                else if ("array" === type) {
                    documentation.min = 0;
                }

                if (isDefined(this.maxs[fullKey])) {
                    documentation.max = this.maxs[fullKey];
                }

                if (isArray(this.limits[fullKey])) {
                    documentation.limits = this.limits[fullKey];
                }

                if (isDefined(this.regexs[fullKey])) {
                    documentation.regex = stringifyRegex(this.regexs[fullKey]);
                }

                if ("array" === type) {
                    (documentation as iDocumentationObjectOrArray).content = isEmptyArray(value) ? {} : this._extractDocumentation(fullKey, value);
                }
                else if ("object" === type) {
                    (documentation as iDocumentationObjectOrArray).content = isEmptyPlainObject(value) ? {} : this._extractDocumentation(fullKey, value);
                }
                else if ("function" !== type) {
                    (documentation as iDocumentationValue).value = value;
                }

                result[key] = documentation;

            });

            return result;

        }

    // public

        // clearData & clearDocumentations & clearLimits & clearSkeletons
        public clear (): void {
            this.clearData().clearDocumentations().clearLimits().clearMinsMaxs().clearRegexs().clearSkeletons();
        }

        // forget all the keys and there values and documentations (=> Map.clear)
        public clearData (): this {
            super.clear();
            return this;
        }

        // forget all the skeletons
        public clearDocumentations (): this {
            this.documentations = {};
            return this;
        }

        // forget all the limits
        public clearLimits (): this {
            this.limits = {};
            return this;
        }

        // forget all the min & max limits
        public clearMinsMaxs (): this {
            this.mins = {};
            this.maxs = {};
            return this;
        }

        // forget all the regexs
        public clearRegexs (): this {
            this.regexs = {};
            return this;
        }

        // forget all the skeletons
        public clearSkeletons (): this {
            this.skeletons = {};
            return this;
        }

        // forget a key and its value
        public delete (_key: string): boolean {

            const key: string = ensureKey(_key);

            if (this.has(key)) {

                if (-1 < key.indexOf(this.recursionSeparator)) {

                    const keys: string[] = key.split(this.recursionSeparator);
                    const lastKey: string = keys.pop() as string;
                    const parentKey: string = keys.join(this.recursionSeparator);

                    const parent = this.get(parentKey);

                    delete parent[lastKey];

                    this.set(parentKey, parent);

                }
                else {
                    super.delete(key);
                }

                if (isDefined(this.documentations[key])) {
                    delete this.documentations[key];
                }

                if (isDefined(this.limits[key])) {
                    delete this.limits[key];
                }

                if (isDefined(this.mins[key])) {
                    delete this.mins[key];
                }

                if (isDefined(this.maxs[key])) {
                    delete this.maxs[key];
                }

                if (isDefined(this.regexs[key])) {
                    delete this.regexs[key];
                }

                if (isDefined(this.skeletons[key])) {
                    delete this.skeletons[key];
                }

                return true;

            }
            else {
                return false;
            }

        }

        // attach a documentation on the data. only visible if "set" method is applied with this key
        public document (_key: string, documentation: string): this {

            const key: string = ensureKey(_key);

            if (!isDefined(documentation)) {
                throw new ReferenceError("The \"" + key + "\" data has not any \"documentation\" attribute");
            }
            else if (!isString(documentation)) {
                throw new TypeError("The \"" + key + "\" data has an invalid \"documentation\" attribute");
            }
            else if (isEmptyString(documentation)) {
                throw new RangeError("The \"" + key + "\" data has an empty \"documentation\" attribute");
            }

            else {
                this.documentations[key] = documentation;
            }

            return this;

        }

        // generate a documentation for all the stored data
        public documentation (): Record<string, any> {
            return this._extractDocumentation("", this);
        }

        // the value in association with this key (may be recursive)
        public get (_key: string): any {

            const key: string = ensureKey(_key);

            if (!this.has(key)) {
                throw new Error("Unknown key \"" + key + "\"");
            }
            else if (-1 < key.indexOf(this.recursionSeparator)) {

                const keys: string[] = key.split(this.recursionSeparator);

                let value = this.get(keys[0]);

                    for (let i: number = 1; i < keys.length; ++i) {
                        value = value[keys[i]];
                    }

                return value;

            }
            else {
                return super.get(key);
            }

        }

        // check if a key is used (may be recursive)
        public has (_key: string): boolean {

            const key: string = ensureKey(_key);

            if (-1 >= key.indexOf(this.recursionSeparator)) {
                return super.has(key);
            }
            else {

                const keys: string[] = key.split(this.recursionSeparator);

                if (!super.has(keys[0])) {
                    return false;
                }
                else {

                    let exists: boolean = false;

                        for (let i: number = 1, value = super.get(keys[0]); i < keys.length; ++i) {

                            if (!isObject(value) || !isDefined(value[keys[i]])) {
                                break;
                            }
                            else if (i === keys.length - 1) {
                                exists = true;
                                break;
                            }
                            else {
                                value = value[keys[i]];
                            }

                        }

                    return exists;

                }

            }

        }

        // associate a key with a limit
        public limit (_key: string, limit: any[]): this {

            const key: string = ensureKey(_key);

            if (!isDefined(limit)) {
                throw new ReferenceError("The \"" + key + "\" data has not any \"limit\" attribute");
            }
            else if (!isArray(limit)) {
                throw new TypeError("The \"" + key + "\" data has an invalid \"limit\" attribute");
            }

            else {
                this.limits[key] = limit;
            }

            return this;

        }

        // associate a key with a min value (min length for string & array)
        // (MUST have a valid skeleton : [ "array", "color", "email", "float", "ipv4", "ipv6, "integer", "string", "url", "serial" ])
        public min (_key: string, min: number): this {

            const key: string = ensureKey(_key);

            if (!isDefined(min)) {
                throw new ReferenceError("The \"" + key + "\" data has not any \"min\" attribute");
            }

            else if (!isNotEmptyString(this.skeletons[key])) {
                throw new ReferenceError("The \"" + key + "\" data has not any skeleton");
            }
            else if (!MIN_MAX_SKELETONS.includes(this.skeletons[key] as tMinMaxValidSkeleton)) {

                throw new RangeError(
                    "The \"" + key + "\" data \"" + this.skeletons[key] + "\" skeleton is not in [ \"" + MIN_MAX_SKELETONS.join("\", \"") + "\" ]"
                );

            }
            else if ("float" === this.skeletons[key] && !isNumber(min)) {
                throw new TypeError("The \"" + key + "\" data has an invalid \"min\" attribute");
            }
            else if ([
                "array",
                "color",
                "email",
                "integer",
                "ipv4",
                "ipv6",
                "string",
                "url",
                "serial"
            ].includes(this.skeletons[key]) && !isInteger(min)) {
                throw new TypeError("The \"" + key + "\" data has an invalid \"min\" attribute");
            }

            else {
                this.mins[key] = min;
            }

            return this;

        }

        // associate a key with a max value (max length for string & array)
        // (MUST have a valid skeleton)
        public max (_key: string, max: number): this {

            const key: string = ensureKey(_key);

            if (!isDefined(max)) {
                throw new ReferenceError("The \"" + key + "\" data has not any \"max\" attribute");
            }

            else if (!isNotEmptyString(this.skeletons[key])) {
                throw new ReferenceError("The \"" + key + "\" data has not any skeleton");
            }
            else if (!MIN_MAX_SKELETONS.includes(this.skeletons[key] as tMinMaxValidSkeleton)) {

                throw new RangeError(
                    "The \"" + key + "\" data \"" + this.skeletons[key] + "\" skeleton is not in [ \"" + MIN_MAX_SKELETONS.join("\", \"") + "\" ]"
                );

            }
            else if ("float" === this.skeletons[key] && !isNumber(max)) {
                throw new TypeError("The \"" + key + "\" data has an invalid \"max\" attribute");
            }
            else if ([
                "array",
                "color",
                "email",
                "integer",
                "ipv4",
                "ipv6",
                "string",
                "url",
                "serial"
            ].includes(this.skeletons[key]) && !isInteger(max)) {
                throw new TypeError("The \"" + key + "\" data has an invalid \"max\" attribute");
            }

            else {
                this.maxs[key] = max;
            }

            return this;

        }

        // associate a key with a pattern
        // (MUST have a valid skeleton : [ "color", "email", "ipv4", "ipv6", "string", "url", "serial" ])
        // (useless with "color", "email", "ipv4", "ipv6", & "url", tested with natives checkers. more usefull with "string")
        public regex (_key: string, regex: RegExp): this {

            const key: string = ensureKey(_key);

            if (!isDefined(regex)) {
                throw new ReferenceError("The \"" + key + "\" data has not any \"regex\" attribute");
            }
            else if (!isRegExp(regex)) {
                throw new TypeError("The \"" + key + "\" data has an invalid \"regex\" attribute");
            }

            else if (!isNotEmptyString(this.skeletons[key])) {
                throw new ReferenceError("The \"" + key + "\" data has not any skeleton");
            }
            else if (!REGEX_SKELETONS.includes(this.skeletons[key] as tRegexValidSkeleton)) {

                throw new RangeError(
                    "The \"" + key + "\" data \"" + this.skeletons[key] + "\" skeleton is not in [ \"" + REGEX_SKELETONS.join("\", \"") + "\" ]"
                );

            }

            else {

                this.regexs[key] = regex;

            }

            return this;

        }

        // associate and remember a key with a value (may be recursive)
        public set (_key: string, _value: any): this {

            const key: string = ensureKey(_key);
            const value: any = this._ensureData(key, _value);

            // check key recursivity
            if (-1 < key.indexOf(this.recursionSeparator)) {

                const keys: string[] = key.split(this.recursionSeparator);

                // if no more constraints, set
                if (!isPlainObject(value) || isEmptyPlainObject(value)) {

                    const firstKey: string = keys.shift() as string;
                    const defaultParentValue: Record<string, any> | [] = isDefined(this.skeletons[firstKey]) && "array" === this.skeletons[firstKey] ? [] : {};

                    super.set(firstKey,
                        this._createBaseObject(firstKey,
                            super.has(firstKey) ? super.get(firstKey) : defaultParentValue,
                            keys, value
                        )
                    );

                }

                // check content recursivity
                else {

                    const firstKey: string = keys.shift() as string;
                    const defaultParentValue: Record<string, any> | [] = isDefined(this.skeletons[firstKey]) && "array" === this.skeletons[firstKey] ? [] : {};

                    super.set(firstKey,
                        this._createBaseObject(firstKey,
                            super.has(firstKey) ? super.get(firstKey) : defaultParentValue,
                            keys, this._ensureDataRecursive(key, value)
                        )
                    );

                }

            }

            else if (!isPlainObject(value)) {
                super.set(key, value);
            }
            else if (isEmptyPlainObject(value)) {
                super.set(key, {});
            }

            // check content recursivity
            else {
                super.set(key, this._ensureDataRecursive(key, value));
            }

            return this;

        }

        // associate a key with a skeleton
        // (MUST have a valid skeleton : [ "array", "boolean", "color", "email", "float", "ipv4", "ipv6, "integer", "object", "string", "url", "serial" ])
        public skeleton (_key: string, _skeleton: tValidSkeleton): this {

            const key: string = ensureKey(_key);

            if (!isDefined(_skeleton)) {
                throw new ReferenceError("The \"" + key + "\" data has not any \"skeleton\" attribute");
            }
            else if (!isString(_skeleton)) {
                throw new TypeError("The \"" + key + "\" data has an invalid \"skeleton\" attribute");
            }
            else if (isEmptyString(_skeleton)) {
                throw new RangeError("The \"" + key + "\" data has an empty \"skeleton\" attribute");
            }

            else {

                const skeleton: tValidSkeleton = _skeleton.trim().toLowerCase() as tValidSkeleton;

                if (!inArray(VALID_SKELETONS, skeleton)) {

                    throw new RangeError(
                        "The \"" + key + "\" data \"" + skeleton + "\" skeleton is not in [ \"" + VALID_SKELETONS.join("\", \"") + "\" ]"
                    );

                }
                else {

                    this.skeletons[key] = skeleton;

                    if ("array" === skeleton || "string" === skeleton) {
                        this.min(key, 0);
                    }

                    // #000 -> #000000
                    else if ("color" === skeleton) {
                        this.min(key, 4).max(key, 7).regex(key, patternColor);
                    }

                    // a@a.tv
                    else if ("email" === skeleton) {
                        this.min(key, 6).regex(key, patternEmail);
                    }

                    // 0.0.0.0 -> 256.256.256.256
                    else if ("ipv4" === skeleton) {
                        this.min(key, 7).max(key, 15).regex(key, patternIPV4);
                    }

                    // ::::::: -> ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff
                    else if ("ipv6" === skeleton) {
                        this.min(key, 7).max(key, 39).regex(key, patternIPV6);
                    }

                    // www.s.tv, ftp://s.tv, https://thisisatest.com?req=sort_desc
                    else if ("url" === skeleton) {
                        this.min(key, 8).regex(key, patternUrl);
                    }

                    // COMx => /dev/tty???
                    else if ("serial" === skeleton) {
                        this.min(key, 4);
                    }

                }

            }

            return this;

        }

}
