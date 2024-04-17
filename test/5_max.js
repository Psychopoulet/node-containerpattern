"use strict";

// deps

	// natives
	const { strictEqual, throws } = require("assert");
	const { join } = require("path");

	// locals
	const Container = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// private

	const container = new Container();

// tests

describe("max", () => {

	beforeEach(() => {

		container.clear();

		container
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
			.skeleton("testserial", "serial")
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
			container.max("testinteger");
		}, ReferenceError, "check type value does not throw an error");

		throws(() => {
			container.max("test", 1);
		}, ReferenceError, "check type value does not throw an error");

		throws(() => {
			container.max("testfloat", false);
		}, TypeError, "check type value does not throw an error");

		throws(() => {
			container.max("testinteger", 0.1);
		}, TypeError, "check type value does not throw an error");

		throws(() => {
			container.max("teststring", 0.1);
		}, TypeError, "check type value does not throw an error");

		throws(() => {
			container.max("testarray", 0.1);
		}, TypeError, "check type value does not throw an error");

	});

	it("should check invalid skeleton", () => {

		throws(() => {
			container.max("testboolean", 1);
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

	it("should check normal string running", () => {

		strictEqual(container.max("teststring", 2) instanceof Container, true, "normal running has invalid return");

		throws(() => {
			container.set("teststring", "test");
		}, Error, "check value does not throw an error");

		strictEqual(container.set("teststring", "a") instanceof Container, true, "normal running has invalid return");
		strictEqual(container.set("teststring", "ab") instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal testcolor running", () => {

		strictEqual(container.max("testcolor", 2) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal testemail running", () => {

		strictEqual(container.max("testemail", 2) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal testipv4 running", () => {

		strictEqual(container.max("testipv4", 2) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal testipv6 running", () => {

		strictEqual(container.max("testipv6", 2) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal testurl running", () => {

		strictEqual(container.max("testurl", 2) instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal testserial running", () => {

		strictEqual(container.max("testserial", 2) instanceof Container, true, "normal running has invalid return");

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
