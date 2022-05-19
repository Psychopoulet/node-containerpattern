/// <reference types="node" />

declare module "node-containerpattern" {

	type tType = "array" | "boolean" | "color" | "email" | "float" | "ipv4" | "ipv6" | "integer" | "object" | "string" | "url";

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

		public clearData(): this;
		public clearDocumentations(): this;
		public clearLimits(): this;
		public clearMinsMaxs(): this;
		public clearRegexs(): this;
		public clearSkeletons(): this;
		public document(key: string, value: string): this;
		public documentation(): object;
		public limit(key: string, limit: Array<any>): this;
		public min(key: string, min: number): this;
		public max(key: string, max: number): this;
		public regex(key: string, regex: RegExp): this;
		public skeleton(key: string, value: tType): this;

	}

	export = Container;

}
