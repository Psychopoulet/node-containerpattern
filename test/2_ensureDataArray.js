"use strict";

// deps

	// natives
	const { strictEqual, deepStrictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const ensureDataArray = require(join(__dirname, "..", "lib", "ensureDataArray.js"));

// tests

describe("ensureDataArray", () => {

	it("should check array", () => {

		strictEqual(ensureDataArray("test", "string", "test"), "test", "checked data is invalid");
		deepStrictEqual(ensureDataArray("test", "array", [ 1, 2, 3 ]), [ 1, 2, 3 ], "checked data is invalid");
		deepStrictEqual(ensureDataArray("test", "array", "[ 1, 2, 3 ]"), [ 1, 2, 3 ], "checked data is invalid");

	});

});
