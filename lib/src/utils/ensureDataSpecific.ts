// deps

    // locals
    import { isEmptyString, isColor, isEmail, isIPV4, isIPV6, isUrl, isSerial } from "./validators";

// types & interfaces

    import type { tValidSkeleton } from "./_interfaces";

// module

export default function ensureDataSpecific (key: string, skeleton: tValidSkeleton, value: string): string {

    if (isEmptyString(value)) {
        return "";
    }
    else if (![
        "color",
        "email",
        "ipv4",
        "ipv6",
        "url",
        "serial"
    ].includes(skeleton)) {
        return value;
    }
    else {

        let data: string = value.trim();

        if ("serial" === skeleton) {

            if (!isSerial(data)) {
                throw new TypeError("The \"" + key + "\" data does not correspond to the \"serial\" skeleton");
            }
            else {
                return data;
            }

        }
        else {

            data = data.toLowerCase();

            if ("color" === skeleton && !isColor(data)) {
                throw new TypeError("The \"" + key + "\" data does not correspond to the \"color\" skeleton");
            }
            else if ("email" === skeleton && !isEmail(data)) {
                throw new TypeError("The \"" + key + "\" data does not correspond to the \"email\" skeleton");
            }
            else if ("ipv4" === skeleton && !isIPV4(data)) {
                throw new TypeError("The \"" + key + "\" data does not correspond to the \"ipv4\" skeleton");
            }
            else if ("ipv6" === skeleton && !isIPV6(data)) {
                throw new TypeError("The \"" + key + "\" data does not correspond to the \"ipv6\" skeleton");
            }
            else if ("url" === skeleton && !isUrl(data)) {
                throw new TypeError("The \"" + key + "\" data does not correspond to the \"url\" skeleton");
            }
            else {
                return data;
            }

        }

    }

}
