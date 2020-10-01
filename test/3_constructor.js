"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const Container = require(join(__dirname, "..", "lib", "main.js"));

// tests

describe("constructor", () => {

	it("should check no parameter", () => {
		const container = new Container();
		strictEqual(container.recursionSeparator, ".", "_recursionSeparator data is invalid");
	});

	it("should check wrong parameter", () => {
		const container = new Container(false);
		strictEqual(container.recursionSeparator, ".", "_recursionSeparator data is invalid");
	});

	it("should check wrong parameter", () => {
		const container = new Container("test");
		strictEqual(container.recursionSeparator, "test", "_recursionSeparator data is invalid");
	});

});
