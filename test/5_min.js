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

describe("min", () => {

	beforeEach(() => {

		container.clear()
			.skeleton("testarray", "array")
			.skeleton("testboolean", "boolean")
			.skeleton("testcolor", "color")
			.skeleton("testemail", "email")
			.skeleton("testfloat", "float")
			.skeleton("testinteger", "integer")
			.skeleton("testipv4", "ipv4")
			.skeleton("testipv6", "ipv6")
			.skeleton("teststring", "string")
			.skeleton("testurl", "url")
			.skeleton("module", "object")
				.skeleton("module.minversion", "integer")
				.skeleton("module.versions", "array")
					.skeleton("module.versions.0", "integer");

	});

	it("should check type value", () => {

		throws(() => {
			container.min();
		}, ReferenceError, "check type value does not throw an error");

		throws(() => {
			container.min(false);
		}, TypeError, "check type value does not throw an error");

		throws(() => {
			container.min("testinteger");
		}, ReferenceError, "check type value does not throw an error");

		throws(() => {
			container.min("test", 1);
		}, ReferenceError, "check type value does not throw an error");

		throws(() => {
			container.min("testfloat", false);
		}, TypeError, "check type value does not throw an error");

		throws(() => {
			container.min("testinteger", 0.1);
		}, TypeError, "check type value does not throw an error");

		throws(() => {
			container.min("teststring", 0.1);
		}, TypeError, "check type value does not throw an error");

		throws(() => {
			container.min("testarray", 0.1);
		}, TypeError, "check type value does not throw an error");

	});

	it("should check invalid skeleton", () => {

		throws(() => {
			container.min("testboolean", 1);
		}, Error, "check value does not throw an error");

	});

	it("should check normal integer running", () => {

		strictEqual(container.min("testinteger", 0) instanceof Container, true, "normal running has invalid return");

		throws(() => {
			container.set("testinteger", -1);
		}, Error, "check value does not throw an error");

		strictEqual(container.set("testinteger", 0) instanceof Container, true, "normal running has invalid return");
		strictEqual(container.set("testinteger", 1) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal float running", () => {

		strictEqual(container.min("testfloat", 0) instanceof Container, true, "normal running has invalid return");

		throws(() => {
			container.set("testfloat", -0.1);
		}, Error, "check value does not throw an error");

		strictEqual(container.set("testfloat", 0) instanceof Container, true, "normal running has invalid return");
		strictEqual(container.set("testfloat", 0.1) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal string running", () => {

		strictEqual(container.min("teststring", 2) instanceof Container, true, "normal running has invalid return");

		throws(() => {
			container.set("teststring", "a");
		}, Error, "check value does not throw an error");

		strictEqual(container.set("teststring", "ab") instanceof Container, true, "normal running has invalid return");
		strictEqual(container.set("teststring", "abcd") instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal testcolor running", () => {

		strictEqual(container.min("testcolor", 2) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal testemail running", () => {

		strictEqual(container.min("testemail", 2) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal testipv4 running", () => {

		strictEqual(container.min("testipv4", 2) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal testipv6 running", () => {

		strictEqual(container.min("testipv6", 2) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal testurl running", () => {

		strictEqual(container.min("testurl", 2) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal array running", () => {

		strictEqual(container.min("testarray", 2) instanceof Container, true, "normal running has invalid return");

		throws(() => {
			container.set("testarray", [ "a" ]);
		}, Error, "check value does not throw an error");

		strictEqual(container.set("testarray", [ "a", "b" ]) instanceof Container, true, "normal running has invalid return");
		strictEqual(container.set("testarray", [ "a", "b", "c", "d" ]) instanceof Container, true, "normal running has invalid return");

	});

	it("should check recursive running", () => {

		strictEqual(
			container.min("module.minversion", 0) instanceof Container, true,
			"recursive running has invalid return"
		);

		throws(() => {
			container.set("module.minversion", -1);
		}, Error, "check value does not throw an error");

		strictEqual(
			container.set("module.minversion", 0) instanceof Container, true,
			"recursive running has invalid return"
		);

		strictEqual(
			container.set("module.minversion", 1) instanceof Container, true,
			"recursive running has invalid return"
		);

		throws(() => {
			container.set("module", { "minversion": -1 });
		}, Error, "check value does not throw an error");

		strictEqual(
			container.set("module", { "minversion": 0 }) instanceof Container, true,
			"recursive running has invalid return"
		);

		strictEqual(
			container.set("module", { "minversion": 1 }) instanceof Container, true,
			"recursive running has invalid return"
		);

	});

	it("should check normal recursive array running", () => {

		container.set("module.versions", [ 0, 1, 2, 3 ]);

		strictEqual(
			container.min("module.versions.0", 0) instanceof Container, true,
			"normal recursive array running has invalid return"
		);

		throws(() => {
			container.set("module.versions.0", -1);
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
