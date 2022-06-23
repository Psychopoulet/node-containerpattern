export declare type tValidSkeleton = "array" | "boolean" | "color" | "email" | "float" | "ipv4" | "ipv6" | "integer" | "object" | "string" | "url";
export declare type tMinMaxValidSkeleton = "array" | "color" | "email" | "float" | "ipv4" | "ipv6" | "integer" | "string" | "url";
export declare type tRegexValidSkeleton = "color" | "email" | "ipv4" | "ipv6" | "string" | "url";
export declare type tValidType = tValidSkeleton | "function";
export interface iDocumentationFunction {
    "fullkey": string;
    "type": tValidType;
    "documentation"?: string;
    "min"?: number;
    "max"?: number;
    "regex"?: string;
    "limits"?: Array<any>;
}
export interface iDocumentationObjectOrArray extends iDocumentationFunction {
    "content": {
        [key: string]: iDocumentationFunction | iDocumentationObjectOrArray | iDocumentationValue;
    };
}
export interface iDocumentationValue extends iDocumentationFunction {
    "value": string | number | boolean;
}
