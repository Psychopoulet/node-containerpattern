"use strict";

// deps

	// natives
	const { strictEqual, throws } = require("assert");
	const { join } = require("path");

	// locals
	const ensureDataBasic = require(join(__dirname, "..", "lib", "cjs", "utils", "ensureDataBasic.js")).default;

// tests

describe("ensureDataBasic", () => {

	it("should check string", () => {

		strictEqual(ensureDataBasic("test", "string", "test"), "test", "checked data is invalid");
		strictEqual(ensureDataBasic("test", "string", 1), "1", "checked data is invalid");
		strictEqual(ensureDataBasic("test", "string", { "test": "test" }), "[object Object]", "checked data is invalid");
		strictEqual(ensureDataBasic("test", "string", [ 1, 2, 3 ]), "1,2,3", "checked data is invalid");

	});

	it("should check boolean", () => {

		strictEqual(ensureDataBasic("test", "boolean", true), true, "checked data is invalid");
		strictEqual(ensureDataBasic("test", "boolean", false), false, "checked data is invalid");

		strictEqual(ensureDataBasic("test", "boolean", "true"), true, "checked data is invalid");
		strictEqual(ensureDataBasic("test", "boolean", "false"), false, "checked data is invalid");

		strictEqual(ensureDataBasic("test", "boolean", "yes"), true, "checked data is invalid");
		strictEqual(ensureDataBasic("test", "boolean", "no"), false, "checked data is invalid");

		strictEqual(ensureDataBasic("test", "boolean", "y"), true, "checked data is invalid");
		strictEqual(ensureDataBasic("test", "boolean", "n"), false, "checked data is invalid");

		strictEqual(ensureDataBasic("test", "boolean", "1"), true, "checked data is invalid");
		strictEqual(ensureDataBasic("test", "boolean", "0"), false, "checked data is invalid");

		strictEqual(ensureDataBasic("test", "boolean", 1), true, "checked data is invalid");
		strictEqual(ensureDataBasic("test", "boolean", 0), false, "checked data is invalid");

	});

	it("should check float", () => {

		throws(() => {
			ensureDataBasic("test", "float", "test");
		}, Error, "check data does not throw an error");

		strictEqual(ensureDataBasic("test", "float", 3.14), 3.14, "checked data is invalid");
		strictEqual(ensureDataBasic("test", "float", "3.14"), 3.14, "checked data is invalid");

	});

	it("should check integer", () => {

		throws(() => {
			ensureDataBasic("test", "integer", "test");
		}, Error, "check data does not throw an error");

		strictEqual(ensureDataBasic("test", "integer", 3.14), 3, "checked data is invalid");
		strictEqual(ensureDataBasic("test", "integer", "10"), 10, "checked data is invalid");

	});

	it("should check whatever value", () => {

		strictEqual(ensureDataBasic("test", "whatever", 3.14), 3.14, "checked data is invalid");

	});

});
