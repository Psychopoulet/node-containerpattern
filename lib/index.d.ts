/// <reference types="node" />

declare module "node-containerpattern" {

	type tType = "array" | "boolean" | "color" | "email" | "float" | "ipv4" | "ipv6" | "integer" | "object" | "string" | "url";

	interface iDocumentation {
		"fullkey": string;
		"type": tType;
		"documentation"?: string;
		"limits"?: Array<any>;
		"min"?: number;
		"max"?: number;
		"regex"?: string;
	}

	interface iBasicDocumentation extends iDocumentation {
		"value": string | number;
	}

	interface iComplexDocumentation extends iDocumentation {
		"content": { [ key: string ]: iBasicDocumentation | iComplexDocumentation } // Array are decomposed by numeric keys, transformed into string
	}

	class Container extends Map {

		// Map
		public size: number;

		public documentations: object;
		public limits: object;
		public mins: object;
		public maxs: object;
		public recursionSeparator: string;
		public regexs: object;
		public skeletons: object;

		constructor(recursionSeparator?: string);

		protected _ensureData(key: string, value: any): any;
		protected _ensureDataRecursive(key: string, value: any): any;
		protected _createBaseObject(parentKey: string, parentValue: object, keys: Array<string>, i: number, value: any): object;
		protected _extractDocumentation(previousKeys: string, object: object): object;

		// public clear(): void; // clearData & clearDocumentations & clearLimits & clearSkeletons
		public clearData(): this; // forget all the keys and there values and documentations (=> Map.clear)
		public clearDocumentations(): this; // forget all the skeletons
		public clearLimits(): this; // forget all the limits
		public clearMinsMaxs(): this; // forget all the min & max limits
		public clearRegexs(): this; // forget all the regexs
		public clearSkeletons(): this; // forget all the skeletons
		// public delete(key: string): boolean; // forget a key and its value
		public document(key: string, value: string): this; // attach a documentation on the data. only visible if "set" method is applied with this key
		public documentation(): { [ key: string ]: iBasicDocumentation | iComplexDocumentation }; // generate a documentation for all the stored data
		// public get(key: string): any; // the value in association with this key (may be recursive)
		// public has(key: string): boolean; // check if a key is used (may be recursive)
		public limit(key: string, limit: Array<any>): this; // associate a key with a limit
		public min(key: string, min: number): this; // associate a key with a min value (min length for string & array) (MUST have a valid skeleton : [ "array", "color", "email", "float", "ipv4", "ipv6, "integer", "string", "url" ])
		public max(key: string, max: number): this; // associate a key with a max value (max length for string & array) (MUST have a valid skeleton : same as min)
		public regex(key: string, regex: RegExp): this; // associate a key with a pattern (MUST have a valid skeleton : [ "color", "email", "ipv4", "ipv6", "string", "url" ]) (useless with "color", "email", "ipv4", "ipv6", & "url", tested with natives checkers. more usefull with "string")
		// public set(key: string, value: any): this; // associate and remember a key with a value (may be recursive)
		public skeleton(key: string, value: tType): this;

	}

	export = Container;

}
