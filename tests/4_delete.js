"use strict";

// deps

	const assert = require("assert");
	const Container = require(require("path").join(__dirname, "..", "lib", "main.js"));

// private

	const container = new Container();

// tests

describe("delete", () => {

	it("should check normal running", () => {

		assert.strictEqual(container.set("test", "test").delete("test") instanceof Container, true, "normal running has invalid return");
		assert.strictEqual(container.set("test", "test").delete("test").size, 0, "normal running has invalid return");

	});

});
