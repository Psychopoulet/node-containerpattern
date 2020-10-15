/*
	eslint-disable max-statements
*/

"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const Validators = require(join(__dirname, "..", "lib", "validators.js"));

// tests

describe("validators", () => {

	it("should check isDefined", () => {
		strictEqual(Validators.isDefined(), false, "isDefined result test is invalid");
		strictEqual(Validators.isDefined(null), true, "isDefined result test is invalid");
		strictEqual(Validators.isDefined("test"), true, "isDefined result test is invalid");
	});

	it("should check isNumber", () => {
		strictEqual(Validators.isNumber(), false, "isNumber result test is invalid");
		strictEqual(Validators.isNumber(null), false, "isNumber result test is invalid");
		strictEqual(Validators.isNumber("test"), false, "isNumber result test is invalid");
		strictEqual(Validators.isNumber("0"), false, "isNumber result test is invalid");
		strictEqual(Validators.isNumber(0.5), true, "isNumber result test is invalid");
		strictEqual(Validators.isNumber(0), true, "isNumber result test is invalid");
	});

	it("should check isInteger", () => {
		strictEqual(Validators.isInteger(), false, "isInteger result test is invalid");
		strictEqual(Validators.isInteger(null), false, "isInteger result test is invalid");
		strictEqual(Validators.isInteger("test"), false, "isInteger result test is invalid");
		strictEqual(Validators.isInteger("0"), false, "isInteger result test is invalid");
		strictEqual(Validators.isInteger(0.5), false, "isInteger result test is invalid");
		strictEqual(Validators.isInteger(0), true, "isInteger result test is invalid");
	});

	it("should check isString", () => {
		strictEqual(Validators.isString(), false, "isString result test is invalid");
		strictEqual(Validators.isString(0), false, "isString result test is invalid");
		strictEqual(Validators.isString("test"), true, "isString result test is invalid");
	});

	it("should check isEmptyString", () => {
		strictEqual(Validators.isEmptyString(), false, "isEmptyString result test is invalid");
		strictEqual(Validators.isEmptyString(0), false, "isEmptyString result test is invalid");
		strictEqual(Validators.isEmptyString("test"), false, "isEmptyString result test is invalid");
		strictEqual(Validators.isEmptyString(""), true, "isEmptyString result test is invalid");
	});

	it("should check isNotEmptyString", () => {
		strictEqual(Validators.isNotEmptyString(), false, "isNotEmptyString result test is invalid");
		strictEqual(Validators.isNotEmptyString(0), false, "isNotEmptyString result test is invalid");
		strictEqual(Validators.isNotEmptyString(""), false, "isNotEmptyString result test is invalid");
		strictEqual(Validators.isNotEmptyString("test"), true, "isNotEmptyString result test is invalid");
	});

	it("should check isColor", () => {
		strictEqual(Validators.isColor(), false, "isColor result test is invalid");
		strictEqual(Validators.isColor(null), false, "isColor result test is invalid");
		strictEqual(Validators.isColor(0), false, "isColor result test is invalid");
		strictEqual(Validators.isColor(""), false, "isColor result test is invalid");
		strictEqual(Validators.isColor("test"), false, "isColor result test is invalid");
		strictEqual(Validators.isColor("#000"), true, "isColor result test is invalid");
		strictEqual(Validators.isColor("#ffffff"), true, "isColor result test is invalid");
		strictEqual(Validators.isColor("#FFFFFF"), true, "isColor result test is invalid");
	});

	it("should check isEmail", () => {
		strictEqual(Validators.isEmail(), false, "isEmail result test is invalid");
		strictEqual(Validators.isEmail(null), false, "isEmail result test is invalid");
		strictEqual(Validators.isEmail(0), false, "isEmail result test is invalid");
		strictEqual(Validators.isEmail(""), false, "isEmail result test is invalid");
		strictEqual(Validators.isEmail("test"), false, "isEmail result test is invalid");
		strictEqual(Validators.isEmail("myaddress@provider.com"), true, "isEmail result test is invalid");
	});

	it("should check isIPV4", () => {
		strictEqual(Validators.isIPV4(), false, "isIPV4 result test is invalid");
		strictEqual(Validators.isIPV4(null), false, "isIPV4 result test is invalid");
		strictEqual(Validators.isIPV4(0), false, "isIPV4 result test is invalid");
		strictEqual(Validators.isIPV4(""), false, "isIPV4 result test is invalid");
		strictEqual(Validators.isIPV4("test"), false, "isIPV4 result test is invalid");
		strictEqual(Validators.isIPV4("255.255.255.256"), false, "isIPV4 result test is invalid");
		strictEqual(Validators.isIPV4("0.0.0.e"), false, "isIPV4 result test is invalid");
		strictEqual(Validators.isIPV4("0.0.0.0"), true, "isIPV4 result test is invalid");
		strictEqual(Validators.isIPV4("127.0.0.1"), true, "isIPV4 result test is invalid");
	});

	it("should check isIPV6", () => {
		strictEqual(Validators.isIPV6(), false, "isIPV6 result test is invalid");
		strictEqual(Validators.isIPV6(null), false, "isIPV6 result test is invalid");
		strictEqual(Validators.isIPV6(0), false, "isIPV6 result test is invalid");
		strictEqual(Validators.isIPV6(""), false, "isIPV6 result test is invalid");
		strictEqual(Validators.isIPV6("test"), false, "isIPV6 result test is invalid");
		strictEqual(Validators.isIPV6("2134::1234:4567:2468:1236:2444:2106"), true, "isIPV6 result test is invalid");
		strictEqual(Validators.isIPV6("0:0:0:0:0:0:A00:1"), true, "isIPV6 result test is invalid");
		strictEqual(Validators.isIPV6("1080::8:800:200C:417A"), true, "isIPV6 result test is invalid");
		strictEqual(Validators.isIPV6("::A00:1"), true, "isIPV6 result test is invalid");
		strictEqual(Validators.isIPV6("::1"), true, "isIPV6 result test is invalid");
	});

	it("should check isUrl", () => {

		strictEqual(Validators.isUrl(), false, "isUrl result test is invalid");
		strictEqual(Validators.isUrl(null), false, "isUrl result test is invalid");
		strictEqual(Validators.isUrl(0), false, "isUrl result test is invalid");
		strictEqual(Validators.isUrl(""), false, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("test"), false, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("htt://www.google.com"), false, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("ftpss://localhost.fr:8080"), false, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("://localhost.fr:8080"), false, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("://www.google.com"), false, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("example.com"), false, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("www.example.com"), false, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("255.255.255.255"), false, "isUrl result test is invalid");

		strictEqual(Validators.isUrl("http://localhost.fr:8080"), true, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("ftp://localhost.fr:8080"), true, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("http://255.255.255.255"), true, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("http://www.example.com:8008"), true, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("ftp://s.tv"), true, "isUrl result test is invalid");

		strictEqual(Validators.isUrl("http://www.a.tv"), true, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("http://a.tv"), true, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("https://a.tv"), true, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("https://a.a.tv"), true, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("https://www.a.a.tv"), true, "isUrl result test is invalid");

		strictEqual(Validators.isUrl("http://www.example.com"), true, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("https://example.com"), true, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("https://blog.example.com"), true, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("https://www.blog.example.com"), true, "isUrl result test is invalid");

		strictEqual(Validators.isUrl("https://example.com/product"), true, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("https://example.com?id=1&page=2"), true, "isUrl result test is invalid");
		strictEqual(Validators.isUrl("https://example.com#up"), true, "isUrl result test is invalid");

	});

	it("should check isObject", () => {
		strictEqual(Validators.isObject(), false, "isObject result test is invalid");
		strictEqual(Validators.isObject(null), false, "isObject result test is invalid");
		strictEqual(Validators.isObject(0), false, "isObject result test is invalid");
		strictEqual(Validators.isObject({}), true, "isObject result test is invalid");
	});

	it("should check isArray", () => {
		strictEqual(Validators.isArray(), false, "isArray result test is invalid");
		strictEqual(Validators.isArray(null), false, "isArray result test is invalid");
		strictEqual(Validators.isArray(0), false, "isArray result test is invalid");
		strictEqual(Validators.isArray({}), false, "isArray result test is invalid");
		strictEqual(Validators.isArray([ "test" ]), true, "isArray result test is invalid");
		strictEqual(Validators.isArray([]), true, "isArray result test is invalid");
	});

	it("should check isEmptyArray", () => {
		strictEqual(Validators.isEmptyArray(), false, "isEmptyArray result test is invalid");
		strictEqual(Validators.isEmptyArray(null), false, "isEmptyArray result test is invalid");
		strictEqual(Validators.isEmptyArray(0), false, "isEmptyArray result test is invalid");
		strictEqual(Validators.isEmptyArray({}), false, "isEmptyArray result test is invalid");
		strictEqual(Validators.isEmptyArray([ "test" ]), false, "isEmptyArray result test is invalid");
		strictEqual(Validators.isEmptyArray([]), true, "isEmptyArray result test is invalid");
	});

	it("should check isNotEmptyArray", () => {
		strictEqual(Validators.isNotEmptyArray(), false, "isNotEmptyArray result test is invalid");
		strictEqual(Validators.isNotEmptyArray(null), false, "isNotEmptyArray result test is invalid");
		strictEqual(Validators.isNotEmptyArray(0), false, "isNotEmptyArray result test is invalid");
		strictEqual(Validators.isNotEmptyArray({}), false, "isNotEmptyArray result test is invalid");
		strictEqual(Validators.isNotEmptyArray([]), false, "isNotEmptyArray result test is invalid");
		strictEqual(Validators.isNotEmptyArray([ "test" ]), true, "isNotEmptyArray result test is invalid");
	});

	it("should check inArray", () => {
		strictEqual(Validators.inArray(), false, "inArray result test is invalid");
		strictEqual(Validators.inArray(null), false, "inArray result test is invalid");
		strictEqual(Validators.inArray(0), false, "inArray result test is invalid");
		strictEqual(Validators.inArray({}), false, "inArray result test is invalid");
		strictEqual(Validators.inArray([ "test" ]), false, "inArray result test is invalid");
		strictEqual(Validators.inArray([]), false, "inArray result test is invalid");
		strictEqual(Validators.inArray([], "test"), false, "inArray result test is invalid");
		strictEqual(Validators.inArray([ "test" ], "test"), true, "inArray result test is invalid");
	});

	it("should check isPlainObject", () => {
		strictEqual(Validators.isPlainObject(), false, "isPlainObject result test is invalid");
		strictEqual(Validators.isPlainObject(null), false, "isPlainObject result test is invalid");
		strictEqual(Validators.isPlainObject(0), false, "isPlainObject result test is invalid");
		strictEqual(Validators.isPlainObject([]), false, "isPlainObject result test is invalid");
		strictEqual(Validators.isPlainObject({ "test": "test" }), true, "isPlainObject result test is invalid");
		strictEqual(Validators.isPlainObject({}), true, "isPlainObject result test is invalid");
	});

	it("should check isEmptyPlainObject", () => {
		strictEqual(Validators.isEmptyPlainObject(), false, "isEmptyPlainObject result test is invalid");
		strictEqual(Validators.isEmptyPlainObject(null), false, "isEmptyPlainObject result test is invalid");
		strictEqual(Validators.isEmptyPlainObject(0), false, "isEmptyPlainObject result test is invalid");
		strictEqual(Validators.isEmptyPlainObject([]), false, "isEmptyPlainObject result test is invalid");
		strictEqual(Validators.isEmptyPlainObject({ "test": "test" }), false, "isEmptyPlainObject result test is invalid");
		strictEqual(Validators.isEmptyPlainObject({}), true, "isEmptyPlainObject result test is invalid");
	});

});
