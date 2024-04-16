// deps

    // locals
    import { isDefined, isString, isEmptyString } from "./validators";

// module

export default function ensureKey (key: any): string {

    if (!isDefined(key)) {
        throw new ReferenceError("The key does not exist");
    }
    else if (!isString(key)) {
        throw new TypeError("The key is not a string");
    }
    else if (isEmptyString(key)) {
        throw new Error("The key is empty");
    }
    else {
        return key.trim();
    }

}
