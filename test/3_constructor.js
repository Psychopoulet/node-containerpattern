"use strict";

// deps

	const assert = require("assert");
	const Container = require(require("path").join(__dirname, "..", "lib", "main.js"));

// tests

describe("constructor", () => {

	it("should check no parameter", () => {
		const container = new Container();
		assert.strictEqual(container._recursionSeparator, ".", "_recursionSeparator data is invalid");
	});

	it("should check wrong parameter", () => {
		const container = new Container(false);
		assert.strictEqual(container._recursionSeparator, ".", "_recursionSeparator data is invalid");
	});

	it("should check wrong parameter", () => {
		const container = new Container("test");
		assert.strictEqual(container._recursionSeparator, "test", "_recursionSeparator data is invalid");
	});

});
