declare module "node-containerpattern" {

	class Container {

		// Map
		public size: number;

		protected _documentations: object;
		protected _limits: object;
		protected _skeletons: object;
		protected _recursionSeparator: string;

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
		public clearSkeletons(): Container;
		public delete(key: string): Container;
		public document(key: string, value: string): Container;
		public documentation(): object;
		public get(key: string): any;
		public has(key: string): boolean;
		public limit(key: string, limit: Array<string>): boolean;
		public set(key: string, value: any): Container;
		public skeleton(key: string, value: string): Container;

	}

	export = Container;

}
