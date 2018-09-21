"use strict";

// deps

	const assert = require("assert");
	const Container = require(require("path").join(__dirname, "..", "lib", "main.js"));

// private

	const container = new Container();

// tests

describe("delete", () => {

	beforeEach(() => {
		container.clear();
	});

	it("should check normal running", () => {

		assert.strictEqual(container.set("test", "test").delete("test") instanceof Container, true, "normal running has invalid return");
		assert.strictEqual(container.set("test", "test").delete("test").size, 0, "normal running has invalid return");

	});

	it("should check recursive running", () => {

		container.set("test", {
			"test": "test",
			"test2": "test2"
		});

		assert.strictEqual(container.delete("test.test") instanceof Container, true, "recursive running has invalid return");
		assert.strictEqual(container.delete("test.test").size, 1, "recursive running has invalid return");

		assert.deepStrictEqual(container.get("test").size, {
			"test2": "test2"
		}, "recursive running has invalid return");

	});

});
