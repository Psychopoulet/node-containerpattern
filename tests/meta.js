"use strict";

// deps

	const assert = require("assert");
	const Container = require(require("path").join(__dirname, "..", "lib", "main.js"));

// private

	const container = new Container();

// tests

describe("meta", () => {

	describe("document", () => {

		before(() => {
			container.clear();
		});

		after(() => {
			container.clear();
		});

		it("should check type value", () => {

			assert.throws(() => {
				container.document();
			}, ReferenceError, "check type value does not throw an error");

			assert.throws(() => {
				container.document(false);
			}, TypeError, "check type value does not throw an error");

			assert.throws(() => {
				container.document("testdocument");
			}, ReferenceError, "check type value does not throw an error");

			assert.throws(() => {
				container.document("testdocument", false);
			}, TypeError, "check type value does not throw an error");

		});

		it("should check normal running", () => {

			assert.strictEqual(
				container.document("documentstring", "This is a random string") instanceof Container, true,
				"normal running has invalid return"
			);
		});

	});

	describe("limit", () => {

		before(() => {
			container.clear();
		});

		after(() => {
			container.clear();
		});

		it("should check type value", () => {

			assert.throws(() => {
				container.limit(false);
			}, Error, "check type value does not throw an error");

			assert.throws(() => {
				container.limit("testslimit");
			}, Error, "check type value does not throw an error");

			assert.throws(() => {
				container.limit("testslimit", String);
			}, Error, "check type value does not throw an error");

			assert.throws(() => {
				container.limit("testslimit", "String");
			}, Error, "check type value does not throw an error");

		});

		it("should check normal running", () => {

			assert.strictEqual(container.limit("testslimit", [ "test1", "test2" ]) instanceof Container, true, "normal running has invalid return");

			assert.throws(() => {
				container.set("testslimit", "test");
			}, Error, "check value value does not throw an error");

			assert.strictEqual(container.set("testslimit", "test1") instanceof Container, true, "normal running has invalid return");
			assert.strictEqual(container.set("testslimit", "test2") instanceof Container, true, "normal running has invalid return");

		});

		it("should check recursive running", () => {

			assert.strictEqual(
				container.limit("testslimitrecursive.string", [ "test1", "test2" ]) instanceof Container, true,
				"recursive running has invalid return"
			);

			assert.throws(() => {
				container.set("testslimitrecursive.string", "test");
			}, Error, "check value value does not throw an error");

			assert.strictEqual(
				container.set("testslimitrecursive.string", "test1") instanceof Container, true,
				"recursive running has invalid return"
			);

			assert.strictEqual(
				container.set("testslimitrecursive.string", "test2") instanceof Container, true,
				"recursive running has invalid return"
			);

			assert.throws(() => {
				container.set("testslimitrecursive", { "string": "test" });
			}, Error, "check value value does not throw an error");

			assert.strictEqual(
				container.set("testslimitrecursive", { "string": "test1" }) instanceof Container, true,
				"recursive running has invalid return"
			);

			assert.strictEqual(
				container.set("testslimitrecursive", { "string": "test2" }) instanceof Container, true,
				"recursive running has invalid return"
			);

		});

		it("should check normal recursive array running", () => {

			container.clear().set("module.authors", [ "Sébastien VIDAL" ]);

			assert.strictEqual(
				container.limit("module.authors.0", [ "Sébastien VIDAL" ]) instanceof Container, true,
				"normal recursive array running has invalid return"
			);

			assert.throws(() => {
				container.set("module.authors.0", 5);
			}, Error, "normal recursive array running does not throw an error");

		});

	});

	describe("skeleton", () => {

		before(() => {
			container.clear();
		});

		after(() => {
			container.clear();
		});

		it("should check type value", () => {

			assert.throws(() => {
				container.skeleton(false);
			}, Error, "check type value does not throw an error");

			assert.throws(() => {
				container.skeleton("testskeleton");
			}, Error, "check type value does not throw an error");

			assert.throws(() => {
				container.skeleton("testskeleton", String);
			}, Error, "check type value does not throw an error");

		});

		it("should check normal running", () => {
			assert.strictEqual(container.skeleton("testskeletonarray", "Array") instanceof Container, true, "normal running has invalid return");
			assert.strictEqual(container.skeleton("testskeletonarray", "array") instanceof Container, true, "normal running has invalid return");
			assert.strictEqual(container.skeleton("testskeletonboolean", "boolean") instanceof Container, true, "normal running has invalid return");
			assert.strictEqual(container.skeleton("testskeletonemail", "email") instanceof Container, true, "normal running has invalid return");
			assert.strictEqual(container.skeleton("testskeletonfloat", "float") instanceof Container, true, "normal running has invalid return");
			assert.strictEqual(container.skeleton("testskeletoninteger", "integer") instanceof Container, true, "normal running has invalid return");
			assert.strictEqual(container.skeleton("testskeletonipv4", "ipv4") instanceof Container, true, "normal running has invalid return");
			assert.strictEqual(container.skeleton("testskeletonipv6", "ipv6") instanceof Container, true, "normal running has invalid return");
			assert.strictEqual(container.skeleton("testskeletonnumber", "number") instanceof Container, true, "normal running has invalid return");
			assert.strictEqual(container.skeleton("testskeletonobject", "object") instanceof Container, true, "normal running has invalid return");
			assert.strictEqual(container.skeleton("testskeletonstring", "string") instanceof Container, true, "normal running has invalid return");
		});

		it("should check normal recursive running", () => {

			assert.strictEqual(
				container.skeleton("testskeletonrecursive.test", "string") instanceof Container, true,
				"normal running has invalid return"
			);

		});

		it("should check normal recursive array running", () => {

			container.clear().set("module.versions", [ 1 ]);

			assert.strictEqual(
				container.skeleton("module.versions.0", "integer") instanceof Container, true,
				"normal recursive array running has invalid return"
			);

			assert.throws(() => {
				container.set("module.versions.0", "one");
			}, Error, "normal recursive array running does not throw an error");

		});

	});

});
