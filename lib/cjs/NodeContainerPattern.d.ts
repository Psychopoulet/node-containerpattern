import { tValidSkeleton, tMinMaxValidSkeleton, tRegexValidSkeleton, tValidType, iDocumentationFunction, iDocumentationObjectOrArray, iDocumentationValue } from "./utils/_interfaces";
export { tValidSkeleton, tMinMaxValidSkeleton, tRegexValidSkeleton, tValidType, iDocumentationFunction, iDocumentationObjectOrArray, iDocumentationValue };
export default class NodeContainerPattern extends Map {
    documentations: {
        [key: string]: any;
    };
    limits: {
        [key: string]: Array<string | number>;
    };
    mins: {
        [key: string]: number;
    };
    maxs: {
        [key: string]: number;
    };
    recursionSeparator: string;
    regexs: {
        [key: string]: RegExp;
    };
    skeletons: {
        [key: string]: tValidSkeleton;
    };
    constructor(recursionSeparator?: string);
    private _ensureData;
    private _ensureDataRecursive;
    private _createBaseObject;
    private _extractDocumentation;
    clear(): void;
    clearData(): this;
    clearDocumentations(): this;
    clearLimits(): this;
    clearMinsMaxs(): this;
    clearRegexs(): this;
    clearSkeletons(): this;
    delete(_key: string): boolean;
    document(_key: string, documentation: string): this;
    documentation(): {
        [key: string]: any;
    };
    get(_key: string): any;
    has(_key: string): boolean;
    limit(_key: string, limit: Array<any>): this;
    min(_key: string, min: number): this;
    max(_key: string, max: number): this;
    regex(_key: string, regex: RegExp): this;
    set(_key: string, _value: any): this;
    skeleton(_key: string, _skeleton: tValidSkeleton): this;
}
