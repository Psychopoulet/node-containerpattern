"use strict";

// deps

	const assert = require("assert");
	const ensureDataObject = require(require("path").join(__dirname, "..", "lib", "ensureDataObject.js"));

// tests

describe("ensureDataObject", () => {

	it("should check object", () => {

		assert.strictEqual(ensureDataObject("test", "string", "test"), "test", "checked data is invalid");
		assert.deepStrictEqual(ensureDataObject("test", "object", { "test": "test" }), { "test": "test" }, "checked data is invalid");
		assert.deepStrictEqual(ensureDataObject("test", "object", "{ \"test\": \"test\" }"), { "test": "test" }, "checked data is invalid");

	});

});
