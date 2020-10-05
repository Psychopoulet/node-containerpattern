"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const Container = require(join(__dirname, "..", "lib", "main.js"));

// private

	const container = new Container();

// tests

describe("clear", () => {

	it("should check normal running", () => {

		strictEqual(container.skeleton("test", "string").set("test", "This is a test").size, 1, "initialized data size is invalid");
		strictEqual(Object.keys(container.skeletons).length, 1, "initialized _skeletons size is invalid");
		strictEqual(container.clearData() instanceof Container, true, "normal \"clearData\" running has invalid return");

		strictEqual(container.size, 0, "cleaned data size is invalid");
		strictEqual(Object.keys(container.skeletons).length, 1, "initialized _skeletons size is invalid");

		strictEqual(container.clearSkeletons() instanceof Container, true, "normal \"clearSkeletons\" running has invalid return");

		strictEqual(container.size, 0, "cleaned data size is invalid");
		strictEqual(Object.keys(container.skeletons).length, 0, "cleaned _skeletons size is invalid");

		strictEqual(container.clear() instanceof Container, true, "normal \"clear\" running has invalid return");

		strictEqual(container.size, 0, "cleaned data size is invalid");
		strictEqual(Object.keys(container.skeletons).length, 0, "cleaned _skeletons size is invalid");

	});

});
