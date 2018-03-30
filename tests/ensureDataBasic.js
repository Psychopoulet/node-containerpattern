"use strict";

// deps

	const assert = require("assert");
	const ensureDataBasic = require(require("path").join(__dirname, "..", "lib", "ensureDataBasic.js"));

// tests

describe("ensureDataBasic", () => {

	it("should check string", () => {

		assert.strictEqual(ensureDataBasic("test", "string", "test"), "test", "checked data is invalid");
		assert.strictEqual(ensureDataBasic("test", "string", 1), "1", "checked data is invalid");
		assert.strictEqual(ensureDataBasic("test", "string", { "test": "test" }), "[object Object]", "checked data is invalid");
		assert.strictEqual(ensureDataBasic("test", "string", [ 1, 2, 3 ]), "1,2,3", "checked data is invalid");

	});

	it("should check boolean", () => {

		assert.strictEqual(ensureDataBasic("test", "boolean", true), true, "checked data is invalid");
		assert.strictEqual(ensureDataBasic("test", "boolean", false), false, "checked data is invalid");

		assert.strictEqual(ensureDataBasic("test", "boolean", "true"), true, "checked data is invalid");
		assert.strictEqual(ensureDataBasic("test", "boolean", "false"), false, "checked data is invalid");

		assert.strictEqual(ensureDataBasic("test", "boolean", "yes"), true, "checked data is invalid");
		assert.strictEqual(ensureDataBasic("test", "boolean", "no"), false, "checked data is invalid");

		assert.strictEqual(ensureDataBasic("test", "boolean", "y"), true, "checked data is invalid");
		assert.strictEqual(ensureDataBasic("test", "boolean", "n"), false, "checked data is invalid");

		assert.strictEqual(ensureDataBasic("test", "boolean", "1"), true, "checked data is invalid");
		assert.strictEqual(ensureDataBasic("test", "boolean", "0"), false, "checked data is invalid");

		assert.strictEqual(ensureDataBasic("test", "boolean", 1), true, "checked data is invalid");
		assert.strictEqual(ensureDataBasic("test", "boolean", 0), false, "checked data is invalid");

	});

	it("should check float", () => {

		assert.throws(() => {
			ensureDataBasic("test", "float", "test");
		}, Error, "check data does not throw an error");

		assert.strictEqual(ensureDataBasic("test", "float", 3.14), 3.14, "checked data is invalid");
		assert.strictEqual(ensureDataBasic("test", "float", "3.14"), 3.14, "checked data is invalid");

	});

	it("should check integer", () => {

		assert.throws(() => {
			ensureDataBasic("test", "integer", "test");
		}, Error, "check data does not throw an error");

		assert.strictEqual(ensureDataBasic("test", "integer", 3.14), 3, "checked data is invalid");
		assert.strictEqual(ensureDataBasic("test", "integer", "10"), 10, "checked data is invalid");

	});

	it("should check whatever value", () => {

		assert.strictEqual(ensureDataBasic("test", "whatever", 3.14), 3.14, "checked data is invalid");

	});

});
