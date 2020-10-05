"use strict";

// deps

	// natives
	const { strictEqual, deepStrictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const Container = require(join(__dirname, "..", "lib", "main.js"));

// private

	const container = new Container();

// tests

describe("delete", () => {

	beforeEach(() => {
		container.clear();
	});

	it("should check normal running", () => {

		strictEqual(container.set("test", "test").delete("test") instanceof Container, true, "normal running has invalid return");
		strictEqual(container.set("test", "test").delete("test").size, 0, "normal running has invalid return");

	});

	it("should check normal running with additional data", () => {

		strictEqual(
			container
				.document("test", "this is a test")
				.limit("test", [ "test" ])
				.skeleton("test", "string")
				.min("test", 0)
				.max("test", 10)
				.regex("test", /^test$/)
				.set("test", "test") instanceof Container, true, "normal running has invalid return"
		);

		strictEqual(container.delete("test") instanceof Container, true, "normal running has invalid return");

		strictEqual(typeof container.documentations.test, "undefined", "normal running has invalid documentation");
		strictEqual(typeof container.limits.test, "undefined", "normal running has invalid limit");
		strictEqual(typeof container.skeletons.test, "undefined", "normal running has invalid skeleton");
		strictEqual(typeof container.mins.test, "undefined", "normal running has invalid min");
		strictEqual(typeof container.maxs.test, "undefined", "normal running has invalid max");
		strictEqual(typeof container.regexs.test, "undefined", "normal running has invalid regex");

	});

	it("should check recursive running", () => {

		container.set("test", {
			"test": "test",
			"test2": "test2"
		});

		strictEqual(container.delete("test.test") instanceof Container, true, "recursive running has invalid return");
		strictEqual(container.delete("test.test").size, 1, "recursive running has invalid return");

		deepStrictEqual(container.get("test"), {
			"test2": "test2"
		}, "recursive running has invalid return");

	});

});
