"use strict";

// deps

	// natives
	const { strictEqual, deepStrictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const ensureDataObject = require(join(__dirname, "..", "lib", "ensureDataObject.js"));

// tests

describe("ensureDataObject", () => {

	it("should check object", () => {

		strictEqual(ensureDataObject("test", "string", "test"), "test", "checked data is invalid");
		deepStrictEqual(ensureDataObject("test", "object", { "test": "test" }), { "test": "test" }, "checked data is invalid");
		deepStrictEqual(ensureDataObject("test", "object", "{ \"test\": \"test\" }"), { "test": "test" }, "checked data is invalid");

	});

});
