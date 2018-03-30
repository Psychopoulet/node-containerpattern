"use strict";

// deps

	const assert = require("assert");
	const ensureDataSpecific = require(require("path").join(__dirname, "..", "lib", "ensureDataSpecific.js"));

// tests

describe("ensureDataSpecific", () => {

	it("should check email", () => {

		assert.throws(() => {
			ensureDataSpecific("test", "email", 4);
		}, Error, "check data does not throw an error");

		assert.throws(() => {
			ensureDataSpecific("test", "email", "test");
		}, Error, "check data does not throw an error");

		assert.strictEqual(ensureDataSpecific("test", "email", "test@test.com"), "test@test.com", "checked data is invalid");

	});

	it("should check ipv4", () => {

		assert.throws(() => {
			ensureDataSpecific("test", "ipv4", 4);
		}, Error, "check data does not throw an error");

		// assert.throws(() => {
		// 	ensureDataSpecific("test", "ipv4", "test");
		// }, Error, "check data does not throw an error");

		assert.strictEqual(ensureDataSpecific("test", "ipv4", "127.0.0.1"), "127.0.0.1", "checked data is invalid");

	});

	it("should check ipv6", () => {

		assert.throws(() => {
			ensureDataSpecific("test", "ipv6", 4);
		}, Error, "check data does not throw an error");

		// assert.throws(() => {
		// 	ensureDataSpecific("test", "ipv6", "test");
		// }, Error, "check data does not throw an error");

		assert.strictEqual(
			ensureDataSpecific("test", "ipv6", "0000:0000:0000:0000:0000:0000:0000:0001"), "0000:0000:0000:0000:0000:0000:0000:0001",
			"checked data is invalid"
		);

	});

	it("should check whatever value", () => {

		assert.strictEqual(ensureDataSpecific("test", "whatever", 3.14), 3.14, "checked data is invalid");

	});

});
