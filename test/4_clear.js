"use strict";

// deps

	const assert = require("assert");
	const Container = require(require("path").join(__dirname, "..", "lib", "main.js"));

// private

	const container = new Container();

// tests

describe("clear", () => {

	it("should check normal running", () => {

		assert.strictEqual(container.skeleton("test", "string").set("test", "test", "This is a test").size, 1, "initialized data size is invalid");
		assert.strictEqual(Object.keys(container._skeletons).length, 1, "initialized _skeletons size is invalid");
		assert.strictEqual(container.clearData() instanceof Container, true, "normal \"clearData\" running has invalid return");

		assert.strictEqual(container.size, 0, "cleaned data size is invalid");
		assert.strictEqual(Object.keys(container._skeletons).length, 1, "initialized _skeletons size is invalid");

		assert.strictEqual(container.clearSkeletons() instanceof Container, true, "normal \"clearSkeletons\" running has invalid return");

		assert.strictEqual(container.size, 0, "cleaned data size is invalid");
		assert.strictEqual(Object.keys(container._skeletons).length, 0, "cleaned _skeletons size is invalid");

		assert.strictEqual(container.clear() instanceof Container, true, "normal \"clear\" running has invalid return");

		assert.strictEqual(container.size, 0, "cleaned data size is invalid");
		assert.strictEqual(Object.keys(container._skeletons).length, 0, "cleaned _skeletons size is invalid");

	});

});
