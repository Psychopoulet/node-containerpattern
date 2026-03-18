// deps

    // locals
    import { isArray, isString } from "./validators";

// types & interfaces

    import type { tValidSkeleton } from "./_interfaces";

// module

export default function ensureDataArray (key: string, skeleton: tValidSkeleton, value: unknown[] | string): unknown[] {

    if ("array" === skeleton && !isArray(value)) {

        if (!isString(value) || "[" !== value[0] || "]" !== value[value.length - 1]) {
            throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
        }
        else {
            return JSON.parse(value as string) as unknown[];
        }

    }
    else {
        return value as unknown[];
    }

}
