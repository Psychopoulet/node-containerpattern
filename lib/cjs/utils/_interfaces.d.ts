export type tValidSkeleton = "array" | "boolean" | "color" | "email" | "float" | "ipv4" | "ipv6" | "integer" | "object" | "string" | "url" | "serial";
export type tMinMaxValidSkeleton = "array" | "color" | "email" | "float" | "ipv4" | "ipv6" | "integer" | "string" | "url" | "serial";
export type tRegexValidSkeleton = "color" | "email" | "ipv4" | "ipv6" | "string" | "url" | "serial";
export type tValidType = tValidSkeleton | "function";
export interface iDocumentationFunction {
    "fullkey": string;
    "type": tValidType;
    "documentation"?: string;
    "min"?: number;
    "max"?: number;
    "regex"?: string;
    "limits"?: any[];
}
export interface iDocumentationObjectOrArray extends iDocumentationFunction {
    "content": Record<string, iDocumentationFunction | iDocumentationObjectOrArray | iDocumentationValue>;
}
export interface iDocumentationValue extends iDocumentationFunction {
    "value": string | number | boolean;
}
