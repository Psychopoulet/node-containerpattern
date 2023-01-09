"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// locals
const validators_1 = require("./utils/validators");
const getTypeValue_1 = __importDefault(require("./utils/getTypeValue"));
const ensureKey_1 = __importDefault(require("./utils/ensureKey"));
const ensureDataArray_1 = __importDefault(require("./utils/ensureDataArray"));
const ensureDataBasic_1 = __importDefault(require("./utils/ensureDataBasic"));
const ensureDataObject_1 = __importDefault(require("./utils/ensureDataObject"));
const ensureDataSpecific_1 = __importDefault(require("./utils/ensureDataSpecific"));
const stringifyRegex_1 = __importDefault(require("./utils/stringifyRegex"));
const patterns_1 = require("./utils/patterns");
// consts
const VALID_SKELETONS = ["array", "boolean", "color", "email", "float", "ipv4", "ipv6", "integer", "object", "string", "url"];
const MIN_MAX_SKELETONS = ["array", "color", "email", "float", "ipv4", "ipv6", "integer", "string", "url"];
const REGEX_SKELETONS = ["color", "email", "ipv4", "ipv6", "string", "url"];
// module
class NodeContainerPattern extends Map {
    // constructor
    constructor(recursionSeparator = ".") {
        super();
        this.documentations = {};
        this.limits = {};
        this.mins = {};
        this.maxs = {};
        this.recursionSeparator = (0, validators_1.isNotEmptyString)(recursionSeparator) ? recursionSeparator : ".";
        this.regexs = {};
        this.skeletons = {};
    }
    // private
    _ensureData(key, value) {
        // check existance
        if (!(0, validators_1.isDefined)(value)) {
            throw new ReferenceError("The \"" + key + "\" value is undefined");
        }
        // check limits
        else if ((0, validators_1.isArray)(this.limits[key]) && !(0, validators_1.inArray)(this.limits[key], value)) {
            throw new Error("The \"" + key + "\" value (" + value + ") does not correspond to the limits (" + JSON.stringify(this.limits[key]) + ")");
        }
        // check skeleton
        else if ((0, validators_1.isDefined)(this.skeletons[key])) {
            const skeleton = this.skeletons[key];
            if ("object" === skeleton) {
                return (0, ensureDataObject_1.default)(key, skeleton, value);
            }
            else if ((0, validators_1.inArray)(["color", "email", "ipv4", "ipv6", "url"], skeleton)) {
                return (0, ensureDataSpecific_1.default)(key, skeleton, value);
            }
            else if ((0, validators_1.inArray)(["array", "string"], skeleton)) {
                const result = "array" === skeleton ? (0, ensureDataArray_1.default)(key, skeleton, value) : (0, ensureDataBasic_1.default)(key, skeleton, value);
                if ((0, validators_1.isNumber)(this.mins[key]) && result.length < this.mins[key]) {
                    throw new RangeError("The \"" + key + "\" data length (" + result.length + ") is lower than the min allowed (" + this.mins[key] + ")");
                }
                else if ((0, validators_1.isNumber)(this.maxs[key]) && result.length > this.maxs[key]) {
                    throw new RangeError("The \"" + key + "\" data length (" + result.length + ") is higher than the max allowed (" + this.maxs[key] + ")");
                }
                else if ("string" === skeleton && (0, validators_1.isDefined)(this.regexs[key]) && !this.regexs[key].test(result)) {
                    throw new Error("The \"" + key + "\" data (" + result + ") does not match with its pattern (" + this.regexs[key] + ")");
                }
                else {
                    return result;
                }
            }
            else if ((0, validators_1.inArray)(["integer", "float"], skeleton)) {
                const result = (0, ensureDataBasic_1.default)(key, skeleton, value);
                if ((0, validators_1.isNumber)(this.mins[key]) && result < this.mins[key]) {
                    throw new RangeError("The \"" + key + "\" data (" + result + ") is lower than the min allowed (" + this.mins[key] + ")");
                }
                else if ((0, validators_1.isNumber)(this.maxs[key]) && result > this.maxs[key]) {
                    throw new RangeError("The \"" + key + "\" data (" + result + ") is higher than the max allowed (" + this.maxs[key] + ")");
                }
                else {
                    return result;
                }
            }
            else {
                return (0, ensureDataBasic_1.default)(key, skeleton, value);
            }
        }
        else {
            return value;
        }
    }
    _ensureDataRecursive(key, value) {
        for (const i in value) {
            value[i] = this._ensureData(key + this.recursionSeparator + i, value[i]);
            if ((0, validators_1.isPlainObject)(value[i])) {
                value[i] = this._ensureDataRecursive(key + this.recursionSeparator + i, value[i]);
            }
        }
        return value;
    }
    _createBaseObject(parentKey, _parentValue, keys, value) {
        const parentValue = this._ensureData(parentKey, _parentValue);
        const key = keys.shift();
        if (keys.length) {
            const nextKey = parentKey + this.recursionSeparator + key;
            const defaultValue = (0, validators_1.isDefined)(this.skeletons[nextKey]) && "array" === this.skeletons[nextKey] ? [] : {};
            parentValue[key] = this._createBaseObject(parentKey + this.recursionSeparator + key, !parentValue[key] ? defaultValue : parentValue[key], keys, value);
        }
        else {
            parentValue[key] = this._ensureData(parentKey + this.recursionSeparator + key, value);
        }
        return parentValue;
    }
    _extractDocumentation(previousKeys, object) {
        const result = {};
        const toExtract = [];
        if ((0, validators_1.isPlainObject)(object)) {
            Object.keys(object).forEach((key) => {
                toExtract.push({
                    key,
                    "value": object[key]
                });
            });
        }
        else if (this === object || (0, validators_1.isArray)(object)) {
            object.forEach((value, key) => {
                toExtract.push({
                    key,
                    value
                });
            });
        }
        toExtract.forEach(({ value, key }) => {
            const fullKey = !(0, validators_1.isEmptyString)(previousKeys) ? previousKeys + this.recursionSeparator + key : key;
            const type = (0, validators_1.isNotEmptyString)(this.skeletons[fullKey]) ? this.skeletons[fullKey] : (0, getTypeValue_1.default)(value);
            const documentation = {
                "fullkey": fullKey,
                type
            };
            if (this.documentations[fullKey]) {
                documentation.documentation = this.documentations[fullKey];
            }
            if ((0, validators_1.isDefined)(this.mins[fullKey])) {
                documentation.min = this.mins[fullKey];
            }
            else if ("array" === type) {
                documentation.min = 0;
            }
            if ((0, validators_1.isDefined)(this.maxs[fullKey])) {
                documentation.max = this.maxs[fullKey];
            }
            if ((0, validators_1.isArray)(this.limits[fullKey])) {
                documentation.limits = this.limits[fullKey];
            }
            if ((0, validators_1.isDefined)(this.regexs[fullKey])) {
                documentation.regex = (0, stringifyRegex_1.default)(this.regexs[fullKey]);
            }
            if ("array" === type) {
                documentation.content = (0, validators_1.isEmptyArray)(value) ? {} : this._extractDocumentation(fullKey, value);
            }
            else if ("object" === type) {
                documentation.content = (0, validators_1.isEmptyPlainObject)(value) ? {} : this._extractDocumentation(fullKey, value);
            }
            else if ("function" !== type) {
                documentation.value = value;
            }
            result[key] = documentation;
        });
        return result;
    }
    // public
    // clearData & clearDocumentations & clearLimits & clearSkeletons
    clear() {
        this.clearData().clearDocumentations().clearLimits().clearMinsMaxs().clearRegexs().clearSkeletons();
    }
    // forget all the keys and there values and documentations (=> Map.clear)
    clearData() {
        super.clear();
        return this;
    }
    // forget all the skeletons
    clearDocumentations() {
        this.documentations = {};
        return this;
    }
    // forget all the limits
    clearLimits() {
        this.limits = {};
        return this;
    }
    // forget all the min & max limits
    clearMinsMaxs() {
        this.mins = {};
        this.maxs = {};
        return this;
    }
    // forget all the regexs
    clearRegexs() {
        this.regexs = {};
        return this;
    }
    // forget all the skeletons
    clearSkeletons() {
        this.skeletons = {};
        return this;
    }
    // forget a key and its value
    delete(_key) {
        const key = (0, ensureKey_1.default)(_key);
        if (this.has(key)) {
            if (-1 < key.indexOf(this.recursionSeparator)) {
                const keys = key.split(this.recursionSeparator);
                const lastKey = keys.pop();
                const parentKey = keys.join(this.recursionSeparator);
                const parent = this.get(parentKey);
                delete parent[lastKey];
                this.set(parentKey, parent);
            }
            else {
                super.delete(key);
            }
            if ((0, validators_1.isDefined)(this.documentations[key])) {
                delete this.documentations[key];
            }
            if ((0, validators_1.isDefined)(this.limits[key])) {
                delete this.limits[key];
            }
            if ((0, validators_1.isDefined)(this.mins[key])) {
                delete this.mins[key];
            }
            if ((0, validators_1.isDefined)(this.maxs[key])) {
                delete this.maxs[key];
            }
            if ((0, validators_1.isDefined)(this.regexs[key])) {
                delete this.regexs[key];
            }
            if ((0, validators_1.isDefined)(this.skeletons[key])) {
                delete this.skeletons[key];
            }
            return true;
        }
        else {
            return false;
        }
    }
    // attach a documentation on the data. only visible if "set" method is applied with this key
    document(_key, documentation) {
        const key = (0, ensureKey_1.default)(_key);
        if (!(0, validators_1.isDefined)(documentation)) {
            throw new ReferenceError("The \"" + key + "\" data has not any \"documentation\" attribute");
        }
        else if (!(0, validators_1.isString)(documentation)) {
            throw new TypeError("The \"" + key + "\" data has an invalid \"documentation\" attribute");
        }
        else if ((0, validators_1.isEmptyString)(documentation)) {
            throw new RangeError("The \"" + key + "\" data has an empty \"documentation\" attribute");
        }
        else {
            this.documentations[key] = documentation;
        }
        return this;
    }
    // generate a documentation for all the stored data
    documentation() {
        return this._extractDocumentation("", this);
    }
    // the value in association with this key (may be recursive)
    get(_key) {
        const key = (0, ensureKey_1.default)(_key);
        if (!this.has(key)) {
            throw new Error("Unknown key \"" + key + "\"");
        }
        else if (-1 < key.indexOf(this.recursionSeparator)) {
            const keys = key.split(this.recursionSeparator);
            let value = this.get(keys[0]);
            for (let i = 1; i < keys.length; ++i) {
                value = value[keys[i]];
            }
            return value;
        }
        else {
            return super.get(key);
        }
    }
    // check if a key is used (may be recursive)
    has(_key) {
        const key = (0, ensureKey_1.default)(_key);
        if (-1 >= key.indexOf(this.recursionSeparator)) {
            return super.has(key);
        }
        else {
            const keys = key.split(this.recursionSeparator);
            if (!super.has(keys[0])) {
                return false;
            }
            else {
                let exists = false;
                for (let i = 1, value = super.get(keys[0]); i < keys.length; ++i) {
                    if (!(0, validators_1.isObject)(value) || !(0, validators_1.isDefined)(value[keys[i]])) {
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
    limit(_key, limit) {
        const key = (0, ensureKey_1.default)(_key);
        if (!(0, validators_1.isDefined)(limit)) {
            throw new ReferenceError("The \"" + key + "\" data has not any \"limit\" attribute");
        }
        else if (!(0, validators_1.isArray)(limit)) {
            throw new TypeError("The \"" + key + "\" data has an invalid \"limit\" attribute");
        }
        else {
            this.limits[key] = limit;
        }
        return this;
    }
    // associate a key with a min value (min length for string & array)
    // (MUST have a valid skeleton : [ "array", "color", "email", "float", "ipv4", "ipv6, "integer", "string", "url" ])
    min(_key, min) {
        const key = (0, ensureKey_1.default)(_key);
        if (!(0, validators_1.isDefined)(min)) {
            throw new ReferenceError("The \"" + key + "\" data has not any \"min\" attribute");
        }
        else if (!(0, validators_1.isNotEmptyString)(this.skeletons[key])) {
            throw new ReferenceError("The \"" + key + "\" data has not any skeleton");
        }
        else if (!MIN_MAX_SKELETONS.includes(this.skeletons[key])) {
            throw new RangeError("The \"" + key + "\" data \"" + this.skeletons[key] + "\" skeleton is not in [ \"" + MIN_MAX_SKELETONS.join("\", \"") + "\" ]");
        }
        else if ("float" === this.skeletons[key] && !(0, validators_1.isNumber)(min)) {
            throw new TypeError("The \"" + key + "\" data has an invalid \"min\" attribute");
        }
        else if (["array", "color", "email", "integer", "ipv4", "ipv6", "string", "url"].includes(this.skeletons[key]) && !(0, validators_1.isInteger)(min)) {
            throw new TypeError("The \"" + key + "\" data has an invalid \"min\" attribute");
        }
        else {
            this.mins[key] = min;
        }
        return this;
    }
    // associate a key with a max value (max length for string & array)
    // (MUST have a valid skeleton)
    max(_key, max) {
        const key = (0, ensureKey_1.default)(_key);
        if (!(0, validators_1.isDefined)(max)) {
            throw new ReferenceError("The \"" + key + "\" data has not any \"max\" attribute");
        }
        else if (!(0, validators_1.isNotEmptyString)(this.skeletons[key])) {
            throw new ReferenceError("The \"" + key + "\" data has not any skeleton");
        }
        else if (!MIN_MAX_SKELETONS.includes(this.skeletons[key])) {
            throw new RangeError("The \"" + key + "\" data \"" + this.skeletons[key] + "\" skeleton is not in [ \"" + MIN_MAX_SKELETONS.join("\", \"") + "\" ]");
        }
        else if ("float" === this.skeletons[key] && !(0, validators_1.isNumber)(max)) {
            throw new TypeError("The \"" + key + "\" data has an invalid \"max\" attribute");
        }
        else if (["array", "color", "email", "integer", "ipv4", "ipv6", "string", "url"].includes(this.skeletons[key]) && !(0, validators_1.isInteger)(max)) {
            throw new TypeError("The \"" + key + "\" data has an invalid \"max\" attribute");
        }
        else {
            this.maxs[key] = max;
        }
        return this;
    }
    // associate a key with a pattern
    // (MUST have a valid skeleton : [ "color", "email", "ipv4", "ipv6", "string", "url" ])
    // (useless with "color", "email", "ipv4", "ipv6", & "url", tested with natives checkers. more usefull with "string")
    regex(_key, regex) {
        const key = (0, ensureKey_1.default)(_key);
        if (!(0, validators_1.isDefined)(regex)) {
            throw new ReferenceError("The \"" + key + "\" data has not any \"regex\" attribute");
        }
        else if (!(0, validators_1.isRegExp)(regex)) {
            throw new TypeError("The \"" + key + "\" data has an invalid \"regex\" attribute");
        }
        else if (!(0, validators_1.isNotEmptyString)(this.skeletons[key])) {
            throw new ReferenceError("The \"" + key + "\" data has not any skeleton");
        }
        else if (!REGEX_SKELETONS.includes(this.skeletons[key])) {
            throw new RangeError("The \"" + key + "\" data \"" + this.skeletons[key] + "\" skeleton is not in [ \"" + REGEX_SKELETONS.join("\", \"") + "\" ]");
        }
        else {
            this.regexs[key] = regex;
        }
        return this;
    }
    // associate and remember a key with a value (may be recursive)
    set(_key, _value) {
        const key = (0, ensureKey_1.default)(_key);
        const value = this._ensureData(key, _value);
        // check key recursivity
        if (-1 < key.indexOf(this.recursionSeparator)) {
            const keys = key.split(this.recursionSeparator);
            // if no more constraints, set
            if (!(0, validators_1.isPlainObject)(value) || (0, validators_1.isEmptyPlainObject)(value)) {
                const firstKey = keys.shift();
                const defaultParentValue = (0, validators_1.isDefined)(this.skeletons[firstKey]) && "array" === this.skeletons[firstKey] ? [] : {};
                super.set(firstKey, this._createBaseObject(firstKey, super.has(firstKey) ? super.get(firstKey) : defaultParentValue, keys, value));
            }
            // check content recursivity
            else {
                const firstKey = keys.shift();
                const defaultParentValue = (0, validators_1.isDefined)(this.skeletons[firstKey]) && "array" === this.skeletons[firstKey] ? [] : {};
                super.set(firstKey, this._createBaseObject(firstKey, super.has(firstKey) ? super.get(firstKey) : defaultParentValue, keys, this._ensureDataRecursive(key, value)));
            }
        }
        else if (!(0, validators_1.isPlainObject)(value)) {
            super.set(key, value);
        }
        else if ((0, validators_1.isEmptyPlainObject)(value)) {
            super.set(key, {});
        }
        // check content recursivity
        else {
            super.set(key, this._ensureDataRecursive(key, value));
        }
        return this;
    }
    // associate a key with a skeleton
    // (MUST have a valid skeleton : [ "array", "boolean", "color", "email", "float", "ipv4", "ipv6, "integer", "object", "string", "url" ])
    skeleton(_key, _skeleton) {
        const key = (0, ensureKey_1.default)(_key);
        if (!(0, validators_1.isDefined)(_skeleton)) {
            throw new ReferenceError("The \"" + key + "\" data has not any \"skeleton\" attribute");
        }
        else if (!(0, validators_1.isString)(_skeleton)) {
            throw new TypeError("The \"" + key + "\" data has an invalid \"skeleton\" attribute");
        }
        else if ((0, validators_1.isEmptyString)(_skeleton)) {
            throw new RangeError("The \"" + key + "\" data has an empty \"skeleton\" attribute");
        }
        else {
            const skeleton = _skeleton.trim().toLowerCase();
            if (!(0, validators_1.inArray)(VALID_SKELETONS, skeleton)) {
                throw new RangeError("The \"" + key + "\" data \"" + skeleton + "\" skeleton is not in [ \"" + VALID_SKELETONS.join("\", \"") + "\" ]");
            }
            else {
                this.skeletons[key] = skeleton;
                if ("array" === skeleton || "string" === skeleton) {
                    this.min(key, 0);
                }
                // #000 -> #000000
                else if ("color" === skeleton) {
                    this.min(key, 4).max(key, 7).regex(key, patterns_1.patternColor);
                }
                // a@a.tv
                else if ("email" === skeleton) {
                    this.min(key, 6).regex(key, patterns_1.patternEmail);
                }
                // 0.0.0.0 -> 256.256.256.256
                else if ("ipv4" === skeleton) {
                    this.min(key, 7).max(key, 15).regex(key, patterns_1.patternIPV4);
                }
                // ::::::: -> ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff
                else if ("ipv6" === skeleton) {
                    this.min(key, 7).max(key, 39).regex(key, patterns_1.patternIPV6);
                }
                // www.s.tv, ftp://s.tv, https://thisisatest.com?req=sort_desc
                else if ("url" === skeleton) {
                    this.min(key, 8).regex(key, patterns_1.patternUrl);
                }
            }
        }
        return this;
    }
}
exports.default = NodeContainerPattern;
;
