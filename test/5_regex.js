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

describe("regex", () => {

	beforeEach(() => {

		container.clear()
			.skeleton("test", "string").regex("test", /^test$/);

	});

	it("should check type value", () => {

		throws(() => {
			container.regex();
		}, ReferenceError, "check type value does not throw an error");

		throws(() => {
			container.regex(false);
		}, TypeError, "check type value does not throw an error");

		throws(() => {
			container.regex("test");
		}, ReferenceError, "check type value does not throw an error");

		throws(() => {
			container.regex("test", false);
		}, TypeError, "check type value does not throw an error");

	});

	it("should check without skeleton", () => {

		throws(() => {
			container.clear().regex("test", /^test$/);
		}, Error, "check value does not throw an error");

	});

	it("should check invalid skeleton", () => {

		throws(() => {
			container.skeleton("test", "boolean").regex("test", /^test$/);
		}, Error, "check value does not throw an error");

	});

	it("should check normal email running", () => {

		strictEqual(container.skeleton("test", "email").regex("test", /^test$/) instanceof Container, true, "normal running has invalid return");

		throws(() => {
			container.set("test", "value");
		}, Error, "check value does not throw an error");

		strictEqual(container.set("test", "test@test.te") instanceof Container, true, "normal running has invalid return");

	});

	it("should check normal string running", () => {

		strictEqual(container.skeleton("test", "string").regex("test", /^test$/) instanceof Container, true, "normal running has invalid return");

		throws(() => {
			container.set("test", "value");
		}, Error, "check value does not throw an error");

		strictEqual(container.set("test", "test") instanceof Container, true, "normal running has invalid return");

	});

});
