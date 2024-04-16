// deps

    // locals
    import { isPlainObject, isString } from "./validators";

// types & interfaces

    import type { tValidSkeleton } from "./_interfaces";

// module

export default function ensureDataObject (key: string, skeleton: tValidSkeleton, value: Record<string, any> | string): Record<string, any> {

    if ("object" === skeleton && !isPlainObject(value)) {

        if (!isString(value) || "{" !== (value as string)[0] || "}" !== (value as string)[(value as string).length - 1]) {
            throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
        }
        else {
            return JSON.parse(value as string);
        }

    }
    else {
        return value as { [key:string]: any };
    }

}
