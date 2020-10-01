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

describe("max", () => {

	beforeEach(() => {

		container.clear()
			.skeleton("testinteger", "integer")
			.skeleton("testfloat", "float")
			.skeleton("testnumber", "number")
			.skeleton("teststring", "string")
			.skeleton("testarray", "array")
			.skeleton("module", "object")
				.skeleton("module.maxversion", "integer")
				.skeleton("module.versions", "array")
					.skeleton("module.versions.0", "integer");

	});

	it("should check type value", () => {

		throws(() => {
			container.max();
		}, ReferenceError, "check type value does not throw an error");

		throws(() => {
			container.max(false);
		}, TypeError, "check type value does not throw an error");

		throws(() => {
			container.max("test");
		}, ReferenceError, "check type value does not throw an error");

		throws(() => {
			container.max("test", Number);
		}, TypeError, "check type value does not throw an error");

	});

	it("should check invalid skeleton", () => {

		strictEqual(container.skeleton("test", "ipv4") instanceof Container, true, "normal running has invalid return");

		throws(() => {
			container.max("test", 1);
		}, Error, "check value does not throw an error");

	});

	it("should check normal integer running", () => {

		strictEqual(container.max("testinteger", 1) instanceof Container, true, "normal running has invalid return");

		throws(() => {
			container.set("testinteger", 2);
		}, Error, "check value does not throw an error");

		strictEqual(container.set("testinteger", 0) instanceof Container, true, "normal running has invalid return");
		strictEqual(container.set("testinteger", 1) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal float running", () => {

		strictEqual(container.max("testfloat", 0.1) instanceof Container, true, "normal running has invalid return");

		throws(() => {
			container.set("testfloat", 0.2);
		}, Error, "check value does not throw an error");

		strictEqual(container.set("testfloat", 0) instanceof Container, true, "normal running has invalid return");
		strictEqual(container.set("testfloat", 0.1) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal number running", () => {

		strictEqual(container.max("testnumber", 0.1) instanceof Container, true, "normal running has invalid return");

		throws(() => {
			container.set("testnumber", 0.2);
		}, Error, "check value does not throw an error");

		strictEqual(container.set("testnumber", 0) instanceof Container, true, "normal running has invalid return");
		strictEqual(container.set("testnumber", 0.1) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal string running", () => {

		strictEqual(container.max("teststring", 2) instanceof Container, true, "normal running has invalid return");

		throws(() => {
			container.set("teststring", "test");
		}, Error, "check value does not throw an error");

		strictEqual(container.set("teststring", "a") instanceof Container, true, "normal running has invalid return");
		strictEqual(container.set("teststring", "ab") instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal array running", () => {

		strictEqual(container.max("testarray", 2) instanceof Container, true, "normal running has invalid return");

		throws(() => {
			container.set("testarray", [ "a", "b", "c" ]);
		}, Error, "check value does not throw an error");

		strictEqual(container.set("testarray", [ "a" ]) instanceof Container, true, "normal running has invalid return");
		strictEqual(container.set("testarray", [ "a", "b" ]) instanceof Container, true, "normal running has invalid return");

	});

	it("should check recursive running", () => {

		strictEqual(
			container.max("module.maxversion", 2) instanceof Container, true,
			"recursive running has invalid return"
		);

		throws(() => {
			container.set("module.maxversion", 3);
		}, Error, "check value does not throw an error");

		strictEqual(
			container.set("module.maxversion", 0) instanceof Container, true,
			"recursive running has invalid return"
		);

		strictEqual(
			container.set("module.maxversion", 1) instanceof Container, true,
			"recursive running has invalid return"
		);

		throws(() => {
			container.set("module", { "maxversion": 3 });
		}, Error, "check value does not throw an error");

		strictEqual(
			container.set("module", { "maxversion": 0 }) instanceof Container, true,
			"recursive running has invalid return"
		);

		strictEqual(
			container.set("module", { "maxversion": 1 }) instanceof Container, true,
			"recursive running has invalid return"
		);

	});

	it("should check normal recursive array running", () => {

		container.set("module.versions", [ 0, 1, 2, 3 ]);

		strictEqual(
			container.max("module.versions.0", 1) instanceof Container, true,
			"normal recursive array running has invalid return"
		);

		throws(() => {
			container.set("module.versions.0", 2);
		}, Error, "normal recursive array running does not throw an error");

		strictEqual(
			container.set("module.versions.0", 0) instanceof Container, true,
			"recursive running has invalid return"
		);

		strictEqual(
			container.set("module.versions.0", 1) instanceof Container, true,
			"recursive running has invalid return"
		);

	});

});
