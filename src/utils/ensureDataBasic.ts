// deps

    // locals
    import { isNumber, isInteger } from "./validators";

// types & interfaces

    import type { tValidSkeleton } from "./_interfaces";

// module

export default function ensureDataBasic (key: string, skeleton: tValidSkeleton, value: string | number | boolean): string | number | boolean {

    if ("string" === skeleton) {
        return String(value);
    }
    else if ("boolean" === skeleton) {
        return "true" === value || "yes" === value || "y" === value || "1" === value || 1 === value || true === value;
    }
    else if ("float" === skeleton) {

        if (isNumber(value)) {
            return value;
        }
        else {

            const parsed: number = parseFloat(value as string);

            if (isNaN(parsed)) {
                throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
            }
            else {
                return parsed;
            }

        }

    }
    else if ("integer" === skeleton && !isInteger(value)) {

        const parsed: number = parseInt(value as string, 10);

        if (isNaN(parsed)) {
            throw new TypeError("The \"" + key + "\" data does not correspond to the skeleton");
        }
        else {
            return parsed;
        }

    }
    else {
        return value;
    }

}
