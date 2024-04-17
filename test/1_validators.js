/*
	eslint-disable max-statements
*/

"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const Validators = require(join(__dirname, "..", "lib", "cjs", "utils", "validators.js"));

// tests

describe("validators", () => {

	it("should check isDefined", () => {
		strictEqual(Validators.isDefined(), false);
		strictEqual(Validators.isDefined(null), true);
		strictEqual(Validators.isDefined("test"), true);
	});

	it("should check isNumber", () => {
		strictEqual(Validators.isNumber(), false);
		strictEqual(Validators.isNumber(null), false);
		strictEqual(Validators.isNumber("test"), false);
		strictEqual(Validators.isNumber("0"), false);
		strictEqual(Validators.isNumber(0.5), true);
		strictEqual(Validators.isNumber(0), true);
	});

	it("should check isInteger", () => {
		strictEqual(Validators.isInteger(), false);
		strictEqual(Validators.isInteger(null), false);
		strictEqual(Validators.isInteger("test"), false);
		strictEqual(Validators.isInteger("0"), false);
		strictEqual(Validators.isInteger(0.5), false);
		strictEqual(Validators.isInteger(0), true);
	});

	it("should check isString", () => {
		strictEqual(Validators.isString(), false);
		strictEqual(Validators.isString(0), false);
		strictEqual(Validators.isString("test"), true);
	});

	it("should check isEmptyString", () => {
		strictEqual(Validators.isEmptyString(), false);
		strictEqual(Validators.isEmptyString(0), false);
		strictEqual(Validators.isEmptyString("test"), false);
		strictEqual(Validators.isEmptyString(""), true);
	});

	it("should check isNotEmptyString", () => {
		strictEqual(Validators.isNotEmptyString(), false);
		strictEqual(Validators.isNotEmptyString(0), false);
		strictEqual(Validators.isNotEmptyString(""), false);
		strictEqual(Validators.isNotEmptyString("test"), true);
	});

	it("should check isColor", () => {
		strictEqual(Validators.isColor(), false);
		strictEqual(Validators.isColor(null), false);
		strictEqual(Validators.isColor(0), false);
		strictEqual(Validators.isColor(""), false);
		strictEqual(Validators.isColor("test"), false);
		strictEqual(Validators.isColor("#000"), true);
		strictEqual(Validators.isColor("#ffffff"), true);
		strictEqual(Validators.isColor("#FFFFFF"), true);
	});

	it("should check isEmail", () => {
		strictEqual(Validators.isEmail(), false);
		strictEqual(Validators.isEmail(null), false);
		strictEqual(Validators.isEmail(0), false);
		strictEqual(Validators.isEmail(""), false);
		strictEqual(Validators.isEmail("test"), false);
		strictEqual(Validators.isEmail("myaddress@provider.com"), true);
	});

	it("should check isIPV4", () => {
		strictEqual(Validators.isIPV4(), false);
		strictEqual(Validators.isIPV4(null), false);
		strictEqual(Validators.isIPV4(0), false);
		strictEqual(Validators.isIPV4(""), false);
		strictEqual(Validators.isIPV4("test"), false);
		strictEqual(Validators.isIPV4("255.255.255.256"), false);
		strictEqual(Validators.isIPV4("0.0.0.e"), false);
		strictEqual(Validators.isIPV4("0.0.0.0"), true);
		strictEqual(Validators.isIPV4("127.0.0.1"), true);
	});

	it("should check isIPV6", () => {
		strictEqual(Validators.isIPV6(), false);
		strictEqual(Validators.isIPV6(null), false);
		strictEqual(Validators.isIPV6(0), false);
		strictEqual(Validators.isIPV6(""), false);
		strictEqual(Validators.isIPV6("test"), false);
		strictEqual(Validators.isIPV6("2134::1234:4567:2468:1236:2444:2106"), true);
		strictEqual(Validators.isIPV6("0:0:0:0:0:0:A00:1"), true);
		strictEqual(Validators.isIPV6("1080::8:800:200C:417A"), true);
		strictEqual(Validators.isIPV6("::A00:1"), true);
		strictEqual(Validators.isIPV6("::1"), true);
	});

	it("should check isUrl", () => {

		strictEqual(Validators.isUrl(), false);
		strictEqual(Validators.isUrl(null), false);
		strictEqual(Validators.isUrl(0), false);
		strictEqual(Validators.isUrl(""), false);
		strictEqual(Validators.isUrl("test"), false);
		strictEqual(Validators.isUrl("htt://www.google.com"), false);
		strictEqual(Validators.isUrl("ftpss://localhost.fr:8080"), false);
		strictEqual(Validators.isUrl("://localhost.fr:8080"), false);
		strictEqual(Validators.isUrl("://www.google.com"), false);
		strictEqual(Validators.isUrl("example.com"), false);
		strictEqual(Validators.isUrl("www.example.com"), false);
		strictEqual(Validators.isUrl("255.255.255.255"), false);

		strictEqual(Validators.isUrl("http://localhost.fr:8080"), true);
		strictEqual(Validators.isUrl("ftp://localhost.fr:8080"), true);
		strictEqual(Validators.isUrl("http://255.255.255.255"), true);
		strictEqual(Validators.isUrl("http://www.example.com:8008"), true);
		strictEqual(Validators.isUrl("ftp://s.tv"), true);

		strictEqual(Validators.isUrl("http://www.a.tv"), true);
		strictEqual(Validators.isUrl("http://a.tv"), true);
		strictEqual(Validators.isUrl("https://a.tv"), true);
		strictEqual(Validators.isUrl("https://a.a.tv"), true);
		strictEqual(Validators.isUrl("https://www.a.a.tv"), true);

		strictEqual(Validators.isUrl("http://www.example.com"), true);
		strictEqual(Validators.isUrl("https://example.com"), true);
		strictEqual(Validators.isUrl("https://blog.example.com"), true);
		strictEqual(Validators.isUrl("https://www.blog.example.com"), true);

		strictEqual(Validators.isUrl("https://example.com/product"), true);
		strictEqual(Validators.isUrl("https://example.com?id=1&page=2"), true);
		strictEqual(Validators.isUrl("https://example.com#up"), true);

	});

	it("should check isSerial", () => {

		strictEqual(Validators.isSerial(), false);
		strictEqual(Validators.isSerial(null), false);
		strictEqual(Validators.isSerial(0), false);
		strictEqual(Validators.isSerial(""), false);
		strictEqual(Validators.isSerial("test"), false);

		strictEqual(Validators.isSerial("COM"), false);
		strictEqual(Validators.isSerial("COMtest"), false);
		strictEqual(Validators.isSerial("COM1"), true);

		strictEqual(Validators.isSerial("/dev/tty"), false);
		strictEqual(Validators.isSerial("/dev/ttyACM0"), true);
		strictEqual(Validators.isSerial("/dev/tty-usbserial1"), true);
		strictEqual(Validators.isSerial("/dev/tty.usbmodem1421"), true);

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
