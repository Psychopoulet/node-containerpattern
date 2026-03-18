// deps

    // locals
    import { isString, isRegExp } from "./validators";

// module

export default function stringifyRegex (regex: RegExp | string): string {

    if (isString(regex) || isRegExp(regex)) {

        let stringified: string = isString(regex) ? regex as string : String(regex);

        if (stringified.length && stringified.startsWith("/")) {
            stringified = stringified.slice(1, stringified.length);
        }

        if (stringified.length && stringified.endsWith("/")) {
            stringified = stringified.slice(0, stringified.length - 1);
        }

        return stringified;

    }
    else {
        return "";
    }

}
