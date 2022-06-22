"use strict";
// deps
// locals
import { isColor, isEmail, isEmptyString, isIPV4, isIPV6, isUrl } from "./validators";
// module
export default function ensureDataSpecific(key, skeleton, value) {
    if (isEmptyString(value)) {
        return "";
    }
    else if (!["color", "email", "ipv4", "ipv6", "url"].includes(skeleton)) {
        return value;
    }
    else {
        const data = value.trim().toLowerCase();
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
;
