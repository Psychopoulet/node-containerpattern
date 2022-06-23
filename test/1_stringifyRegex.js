/*
	eslint-disable max-statements
*/

"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const stringifyRegex = require(join(__dirname, "..", "lib", "cjs", "utils", "stringifyRegex.js")).default;

// tests

describe("stringifyRegex", () => {

	it("should check with nothing", () => {

		strictEqual(stringifyRegex(), "", "stringifyRegex result test is invalid");

	});

	it("should check with boolean", () => {

		strictEqual(stringifyRegex(true), "", "stringifyRegex result test is invalid");

	});

	it("should check with string", () => {

		strictEqual(stringifyRegex("test"), "test", "stringifyRegex result test is invalid");
		strictEqual(stringifyRegex("/test"), "test", "stringifyRegex result test is invalid");
		strictEqual(stringifyRegex("test/"), "test", "stringifyRegex result test is invalid");
		strictEqual(stringifyRegex("/test/"), "test", "stringifyRegex result test is invalid");

	});

	it("should check with regex", () => {

		strictEqual(stringifyRegex(/^test$/), "^test$", "stringifyRegex result test is invalid");

	});

});
