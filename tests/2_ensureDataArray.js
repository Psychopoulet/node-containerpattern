"use strict";

// deps

	const assert = require("assert");
	const ensureDataArray = require(require("path").join(__dirname, "..", "lib", "ensureDataArray.js"));

// tests

describe("ensureDataArray", () => {

	it("should check array", () => {

		assert.strictEqual(ensureDataArray("test", "string", "test"), "test", "checked data is invalid");
		assert.deepStrictEqual(ensureDataArray("test", "array", [ 1, 2, 3 ]), [ 1, 2, 3 ], "checked data is invalid");
		assert.deepStrictEqual(ensureDataArray("test", "array", "[ 1, 2, 3 ]"), [ 1, 2, 3 ], "checked data is invalid");

	});

});
