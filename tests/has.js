"use strict";

// deps

	const assert = require("assert");
	const Container = require(require("path").join(__dirname, "..", "lib", "main.js"));

// private

	const container = new Container();

// tests

describe("has", () => {

	it("should check type value", () => {

		assert.throws(() => {
			container.has(false);
		}, "check type value has an invalid key");

		assert.throws(() => {
			container.has("");
		}, "check type value has an invalid key");

	});

	it("should check normal running", () => {
		assert.strictEqual(container.set("test", "test").has("test"), true, "normal running has invalid return");
		assert.strictEqual(container.has("test2"), false, "normal running has invalid return");
	});

	it("should check recursive running", () => {

		assert.strictEqual(container.set("lvl1", "test").has("lvl1.lvl2"), false, "normal recursive running has invalid return");
		assert.strictEqual(container.has("lvl2.lvl1"), false, "wrong recursive running has invalid return");

		assert.strictEqual(
			container.clearData().set("lvl1.lvl2", "test").has("lvl1.lvl2"), true,
			"normal recursive running has invalid return"
		);

		assert.strictEqual(
			container.clearData().set("lvl1.lvl2", true).has("lvl1.lvl2"), true,
			"normal recursive running has invalid return for boolean value (true)"
		);

		assert.strictEqual(
			container.clearData().set("lvl1.lvl2", false).has("lvl1.lvl2"), true,
			"normal recursive running has invalid return for boolean value (false)"
		);

		assert.strictEqual(
			container.clearData().set("lvl1.lvl2.lvl3.lvl4.lvl5", false).has("lvl1.lvl2.lvl3.lvl4.lvl5"), true,
			"normal recursive running has invalid return for boolean value (false)"
		);

	});

	it("should check normal recursive array running", () => {

		container.clear().skeleton("module.versions.0", "string").set("module.versions.0", 1);

		assert.strictEqual(container.has("module.versions.0"), true, "normal recursive array running has invalid return");
		assert.strictEqual(container.has("module.versions.1"), false, "normal recursive array running has invalid return");

	});

});
