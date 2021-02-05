declare module "node-containerpattern" {

	type tType = "array" | "boolean" | "color" | "email" | "float" | "ipv4" | "ipv6" | "integer" | "object" | "string" | "url";

	class Container {

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

		// Map
		public keys(): Iterator<string>;
		public values(): Iterator<any>;
		public forEach(callback: (key: string, value: any) => void): void;

		protected _ensureData(key: string, value: any): any;
		protected _ensureDataRecursive(key: string, value: any): any;
		protected _createBaseObject(parentKey: string, parentValue: object, keys: Array<string>, i: number, value: any): object;
		protected _extractDocumentation(previousKeys: string, object: object): object;

		public clear(): Container;
		public clearData(): Container;
		public clearDocumentations(): Container;
		public clearLimits(): Container;
		public clearMinsMaxs(): Container;
		public clearRegexs(): Container;
		public clearSkeletons(): Container;
		public delete(key: string): Container;
		public document(key: string, value: string): Container;
		public documentation(): object;
		public get(key: string): any;
		public has(key: string): boolean;
		public limit(key: string, limit: Array<any>): boolean;
		public min(key: string, min: number): Container;
		public max(key: string, max: number): Container;
		public regex(key: string, regex: RegExp): Container;
		public set(key: string, value: any): Container;
		public skeleton(key: string, value: tType): Container;

	}

	export = Container;

}
