"use strict";

// deps

	const assert = require("assert");
	const Container = require(require("path").join(__dirname, "..", "lib", "main.js"));

// private

	const container = new Container();

// tests

describe("get", () => {

	it("should check type value", () => {

		assert.throws(() => {
			container.get(false);
		}, Error, "check type value does not throw an error");

		assert.throws(() => {
			container.get("");
		}, Error, "check type value does not throw an error");

	});

	it("should check normal running", () => {
		assert.strictEqual(container.set("test", "test").get("test"), "test", "normal running has invalid return");
	});

	it("should check normal formated boolean running", () => {

		assert.strictEqual(
			container.skeleton("test", "boolean").set("test", "y").get("test"), true,
			"normal formated boolean running has invalid return"
		);

	});

	it("should check wrong recursive running", () => {

		container.clearData().set("usr.login", "login");

		assert.throws(() => {
			container.get("usr.test");
		}, Error, "wrong recursive running does not throw an error");

		container.clearData().set("usr", { "login": "login" });

		assert.throws(() => {
			container.get("usr.test");
		}, Error, "wrong recursive running does not throw an error");

	});

	it("should check normal recursive running", () => {

		container.clearData().set("usr.login", "login");

		assert.deepStrictEqual(container.get("usr"), { "login": "login" }, "normal recursive running has invalid return (get)");
		assert.strictEqual(container.get("usr.login"), "login", "normal recursive running has invalid return (get)");
		assert.strictEqual(container.size, 1, "normal recursive running has invalid size");

		assert.strictEqual(
			container.clearData().set("lvl1.lvl2", true).get("lvl1.lvl2"), true,
			"normal recursive running has invalid return for boolean value (true)"
		);

		assert.strictEqual(
			container.clearData().set("lvl1.lvl2", false).get("lvl1.lvl2"), false,
			"normal recursive running has invalid return for boolean value (false)"
		);

	});

	it("should check normal recursive array running", () => {

		container.clearData().set("module.authors", [ "Sébastien VIDAL" ]);

		assert.deepStrictEqual(container.get("module"), {
			"authors": [ "Sébastien VIDAL" ]
		}, "normal recursive array running has invalid return (get)");

		assert.deepStrictEqual(
			container.get("module.authors"), [ "Sébastien VIDAL" ],
			"normal recursive array running has invalid return (get)"
		);

		assert.strictEqual(container.size, 1, "normal recursive array running has invalid size");

		container.clearData().set("module.authors", [ "Sébastien VIDAL", "1", "2" ]);

	});

	it("should check normal recursive array running", () => {

		container.clear()
			.skeleton("module.versions.0", "string").set("module.versions.0", 1)
			.skeleton("module.versions.1", "integer").set("module.versions.1", "2");

		assert.strictEqual(container.get("module.versions.0"), "1", "normal recursive array running has invalid return");
		assert.strictEqual(container.get("module.versions.1"), 2, "normal recursive array running has invalid return");

	});

});