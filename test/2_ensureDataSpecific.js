"use strict";

// deps

	// natives
	const { strictEqual, throws } = require("assert");
	const { join } = require("path");

	// locals
	const ensureDataSpecific = require(join(__dirname, "..", "lib", "ensureDataSpecific.js"));

// tests

describe("ensureDataSpecific", () => {

	it("should check email", () => {

		throws(() => {
			ensureDataSpecific("test", "email", 4);
		}, Error, "check data does not throw an error");

		throws(() => {
			ensureDataSpecific("test", "email", "test");
		}, Error, "check data does not throw an error");

		strictEqual(ensureDataSpecific("test", "email", "test@test.com"), "test@test.com", "checked data is invalid");

	});

	it("should check ipv4", () => {

		throws(() => {
			ensureDataSpecific("test", "ipv4", 4);
		}, Error, "check data does not throw an error");

		throws(() => {
			ensureDataSpecific("test", "ipv4", "test");
		}, Error, "check data does not throw an error");

		strictEqual(ensureDataSpecific("test", "ipv4", "127.0.0.1"), "127.0.0.1", "checked data is invalid");

	});

	it("should check ipv6", () => {

		throws(() => {
			ensureDataSpecific("test", "ipv6", 4);
		}, Error, "check data does not throw an error");

		throws(() => {
			ensureDataSpecific("test", "ipv6", "test");
		}, Error, "check data does not throw an error");

		strictEqual(
			ensureDataSpecific("test", "ipv6", "0000:0000:0000:0000:0000:0000:0000:0001"), "0000:0000:0000:0000:0000:0000:0000:0001",
			"checked data is invalid"
		);

	});

	it("should check whatever value", () => {

		strictEqual(ensureDataSpecific("test", "whatever", 3.14), 3.14, "checked data is invalid");

	});

});
