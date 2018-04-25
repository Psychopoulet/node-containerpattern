"use strict";

// deps

	const assert = require("assert");
	const Validators = require(require("path").join(__dirname, "..", "lib", "validators.js"));

// tests

describe("validators", () => {

	it("should check isDefined", () => {
		assert.strictEqual(Validators.isDefined(), false, "isDefined result test is invalid");
		assert.strictEqual(Validators.isDefined(null), true, "isDefined result test is invalid");
		assert.strictEqual(Validators.isDefined("test"), true, "isDefined result test is invalid");
	});

	it("should check isNumber", () => {
		assert.strictEqual(Validators.isNumber(), false, "isNumber result test is invalid");
		assert.strictEqual(Validators.isNumber(null), false, "isNumber result test is invalid");
		assert.strictEqual(Validators.isNumber("test"), false, "isNumber result test is invalid");
		assert.strictEqual(Validators.isNumber("0"), false, "isNumber result test is invalid");
		assert.strictEqual(Validators.isNumber(0.5), true, "isNumber result test is invalid");
		assert.strictEqual(Validators.isNumber(0), true, "isNumber result test is invalid");
	});

	it("should check isInteger", () => {
		assert.strictEqual(Validators.isInteger(), false, "isInteger result test is invalid");
		assert.strictEqual(Validators.isInteger(null), false, "isInteger result test is invalid");
		assert.strictEqual(Validators.isInteger("test"), false, "isInteger result test is invalid");
		assert.strictEqual(Validators.isInteger("0"), false, "isInteger result test is invalid");
		assert.strictEqual(Validators.isInteger(0.5), false, "isInteger result test is invalid");
		assert.strictEqual(Validators.isInteger(0), true, "isInteger result test is invalid");
	});

	it("should check isString", () => {
		assert.strictEqual(Validators.isString(), false, "isString result test is invalid");
		assert.strictEqual(Validators.isString(0), false, "isString result test is invalid");
		assert.strictEqual(Validators.isString("test"), true, "isString result test is invalid");
	});

	it("should check isEmptyString", () => {
		assert.strictEqual(Validators.isEmptyString(), false, "isEmptyString result test is invalid");
		assert.strictEqual(Validators.isEmptyString(0), false, "isEmptyString result test is invalid");
		assert.strictEqual(Validators.isEmptyString("test"), false, "isEmptyString result test is invalid");
		assert.strictEqual(Validators.isEmptyString(""), true, "isEmptyString result test is invalid");
	});

	it("should check isNotEmptyString", () => {
		assert.strictEqual(Validators.isNotEmptyString(), false, "isNotEmptyString result test is invalid");
		assert.strictEqual(Validators.isNotEmptyString(0), false, "isNotEmptyString result test is invalid");
		assert.strictEqual(Validators.isNotEmptyString(""), false, "isNotEmptyString result test is invalid");
		assert.strictEqual(Validators.isNotEmptyString("test"), true, "isNotEmptyString result test is invalid");
	});

	it("should check isEmail", () => {
		assert.strictEqual(Validators.isEmail(), false, "isEmail result test is invalid");
		assert.strictEqual(Validators.isEmail(null), false, "isEmail result test is invalid");
		assert.strictEqual(Validators.isEmail(0), false, "isEmail result test is invalid");
		assert.strictEqual(Validators.isEmail(""), false, "isEmail result test is invalid");
		assert.strictEqual(Validators.isEmail("test"), false, "isEmail result test is invalid");
		assert.strictEqual(Validators.isEmail("myaddress@provider.com"), true, "isEmail result test is invalid");
	});

	it("should check isIPV4", () => {
		assert.strictEqual(Validators.isIPV4(), false, "isIPV4 result test is invalid");
		assert.strictEqual(Validators.isIPV4(null), false, "isIPV4 result test is invalid");
		assert.strictEqual(Validators.isIPV4(0), false, "isIPV4 result test is invalid");
		assert.strictEqual(Validators.isIPV4(""), false, "isIPV4 result test is invalid");
		assert.strictEqual(Validators.isIPV4("test"), false, "isIPV4 result test is invalid");
		assert.strictEqual(Validators.isIPV4("127.0.0.1"), true, "isIPV4 result test is invalid");
	});

	it("should check isIPV6", () => {
		assert.strictEqual(Validators.isIPV6(), false, "isIPV6 result test is invalid");
		assert.strictEqual(Validators.isIPV6(null), false, "isIPV6 result test is invalid");
		assert.strictEqual(Validators.isIPV6(0), false, "isIPV6 result test is invalid");
		assert.strictEqual(Validators.isIPV6(""), false, "isIPV6 result test is invalid");
		assert.strictEqual(Validators.isIPV6("test"), false, "isIPV6 result test is invalid");
		assert.strictEqual(Validators.isIPV6("2134::1234:4567:2468:1236:2444:2106"), true, "isIPV6 result test is invalid");
		assert.strictEqual(Validators.isIPV6("0:0:0:0:0:0:A00:1"), true, "isIPV6 result test is invalid");
		assert.strictEqual(Validators.isIPV6("1080::8:800:200C:417A"), true, "isIPV6 result test is invalid");
		assert.strictEqual(Validators.isIPV6("::A00:1"), true, "isIPV6 result test is invalid");
		assert.strictEqual(Validators.isIPV6("::1"), true, "isIPV6 result test is invalid");
	});

	it("should check isObject", () => {
		assert.strictEqual(Validators.isObject(), false, "isObject result test is invalid");
		assert.strictEqual(Validators.isObject(null), false, "isObject result test is invalid");
		assert.strictEqual(Validators.isObject(0), false, "isObject result test is invalid");
		assert.strictEqual(Validators.isObject({}), true, "isObject result test is invalid");
	});

	it("should check isArray", () => {
		assert.strictEqual(Validators.isArray(), false, "isArray result test is invalid");
		assert.strictEqual(Validators.isArray(null), false, "isArray result test is invalid");
		assert.strictEqual(Validators.isArray(0), false, "isArray result test is invalid");
		assert.strictEqual(Validators.isArray({}), false, "isArray result test is invalid");
		assert.strictEqual(Validators.isArray([ "test" ]), true, "isArray result test is invalid");
		assert.strictEqual(Validators.isArray([]), true, "isArray result test is invalid");
	});

	it("should check isEmptyArray", () => {
		assert.strictEqual(Validators.isEmptyArray(), false, "isEmptyArray result test is invalid");
		assert.strictEqual(Validators.isEmptyArray(null), false, "isEmptyArray result test is invalid");
		assert.strictEqual(Validators.isEmptyArray(0), false, "isEmptyArray result test is invalid");
		assert.strictEqual(Validators.isEmptyArray({}), false, "isEmptyArray result test is invalid");
		assert.strictEqual(Validators.isEmptyArray([ "test" ]), false, "isEmptyArray result test is invalid");
		assert.strictEqual(Validators.isEmptyArray([]), true, "isEmptyArray result test is invalid");
	});

	it("should check isNotEmptyArray", () => {
		assert.strictEqual(Validators.isNotEmptyArray(), false, "isNotEmptyArray result test is invalid");
		assert.strictEqual(Validators.isNotEmptyArray(null), false, "isNotEmptyArray result test is invalid");
		assert.strictEqual(Validators.isNotEmptyArray(0), false, "isNotEmptyArray result test is invalid");
		assert.strictEqual(Validators.isNotEmptyArray({}), false, "isNotEmptyArray result test is invalid");
		assert.strictEqual(Validators.isNotEmptyArray([]), false, "isNotEmptyArray result test is invalid");
		assert.strictEqual(Validators.isNotEmptyArray([ "test" ]), true, "isNotEmptyArray result test is invalid");
	});

	it("should check inArray", () => {
		assert.strictEqual(Validators.inArray(), false, "inArray result test is invalid");
		assert.strictEqual(Validators.inArray(null), false, "inArray result test is invalid");
		assert.strictEqual(Validators.inArray(0), false, "inArray result test is invalid");
		assert.strictEqual(Validators.inArray({}), false, "inArray result test is invalid");
		assert.strictEqual(Validators.inArray([ "test" ]), false, "inArray result test is invalid");
		assert.strictEqual(Validators.inArray([]), false, "inArray result test is invalid");
		assert.strictEqual(Validators.inArray([], "test"), false, "inArray result test is invalid");
		assert.strictEqual(Validators.inArray([ "test" ], "test"), true, "inArray result test is invalid");
	});

	it("should check isPlainObject", () => {
		assert.strictEqual(Validators.isPlainObject(), false, "isPlainObject result test is invalid");
		assert.strictEqual(Validators.isPlainObject(null), false, "isPlainObject result test is invalid");
		assert.strictEqual(Validators.isPlainObject(0), false, "isPlainObject result test is invalid");
		assert.strictEqual(Validators.isPlainObject([]), false, "isPlainObject result test is invalid");
		assert.strictEqual(Validators.isPlainObject({ "test": "test" }), true, "isPlainObject result test is invalid");
		assert.strictEqual(Validators.isPlainObject({}), true, "isPlainObject result test is invalid");
	});

	it("should check isEmptyPlainObject", () => {
		assert.strictEqual(Validators.isEmptyPlainObject(), false, "isEmptyPlainObject result test is invalid");
		assert.strictEqual(Validators.isEmptyPlainObject(null), false, "isEmptyPlainObject result test is invalid");
		assert.strictEqual(Validators.isEmptyPlainObject(0), false, "isEmptyPlainObject result test is invalid");
		assert.strictEqual(Validators.isEmptyPlainObject([]), false, "isEmptyPlainObject result test is invalid");
		assert.strictEqual(Validators.isEmptyPlainObject({ "test": "test" }), false, "isEmptyPlainObject result test is invalid");
		assert.strictEqual(Validators.isEmptyPlainObject({}), true, "isEmptyPlainObject result test is invalid");
	});

});
