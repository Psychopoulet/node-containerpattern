"use strict";

// deps

	// natives
	const { strictEqual, throws } = require("assert");
	const { join } = require("path");

	// locals
	const Container = require(join(__dirname, "..", "lib", "main.js"));

// private

	const container = new Container();

// tests

describe("has", () => {

	it("should check type value", () => {

		throws(() => {
			container.has(false);
		}, "check type value has an invalid key");

		throws(() => {
			container.has("");
		}, "check type value has an invalid key");

	});

	it("should check normal running", () => {
		strictEqual(container.set("test", "test").has("test"), true, "normal running has invalid return");
		strictEqual(container.has("test2"), false, "normal running has invalid return");
	});

	it("should check recursive running", () => {

		strictEqual(container.set("lvl1", "test").has("lvl1.lvl2"), false, "normal recursive running has invalid return");
		strictEqual(container.has("lvl2.lvl1"), false, "wrong recursive running has invalid return");

		strictEqual(
			container.clearData().set("lvl1.lvl2", "test").has("lvl1.lvl2"), true,
			"normal recursive running has invalid return"
		);

		strictEqual(
			container.clearData().set("lvl1.lvl2", true).has("lvl1.lvl2"), true,
			"normal recursive running has invalid return for boolean value (true)"
		);

		strictEqual(
			container.clearData().set("lvl1.lvl2", false).has("lvl1.lvl2"), true,
			"normal recursive running has invalid return for boolean value (false)"
		);

		strictEqual(
			container.clearData().set("lvl1.lvl2.lvl3.lvl4.lvl5", false).has("lvl1.lvl2.lvl3.lvl4.lvl5"), true,
			"normal recursive running has invalid return for boolean value (false)"
		);

	});

	it("should check normal recursive array running", () => {

		container.clear();

		container
			.skeleton("module.versions.0", "string")
			.set("module.versions.0", 1);

		strictEqual(container.has("module.versions.0"), true, "normal recursive array running has invalid return");
		strictEqual(container.has("module.versions.1"), false, "normal recursive array running has invalid return");

	});

});
