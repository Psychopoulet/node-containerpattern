/*
	eslint-disable max-lines
*/

"use strict";

// deps

	// natives
	const { strictEqual, deepStrictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const Container = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));
	const stringifyRegex = require(join(__dirname, "..", "lib", "cjs", "utils", "stringifyRegex.js")).default;
	const { patternEmail, patternUrl, patternIPV4, patternIPV6 } = require(join(__dirname, "..", "lib", "cjs", "utils", "patterns.js"));

// private

	// attributes

		const container = new Container();

// tests

describe("documentation", () => {

	beforeEach(() => {
		container.clear();
	});

	it("should check empty running", () => {
		strictEqual(Object.keys(container.documentation()).length, 0, "normal running has invalid size");
	});

	it("should check limits", () => {

		container
			.limit("teststring", [ "test 1", "test 2" ])
			.set("teststring", "test 1");

		deepStrictEqual(container.documentation().teststring, {
			"fullkey": "teststring",
			"type": "string",
			"limits": [ "test 1", "test 2" ],
			"value": "test 1"
		}, "normal running has invalid return for \"limits\"");

	});

	it("should check not typed running", () => {

		container
			.set("teststring", "string")
			.set("testboolean", false)
			.set("testinteger", 1)
			.set("testbase16", 0xA5)
			.set("testfloat", 1.1)
			.set("testemptyarray", [])
			.set("testemptyobject", {})
			.set("testfunction", () => {
				// nothing to do here
			});

		deepStrictEqual(container.documentation(), {
			"teststring": {
				"fullkey": "teststring",
				"type": "string",
				"value": "string"
			},
			"testboolean": {
				"fullkey": "testboolean",
				"type": "boolean",
				"value": false
			},
			"testinteger": {
				"fullkey": "testinteger",
				"type": "integer",
				"value": 1
			},
			"testbase16": {
				"fullkey": "testbase16",
				"type": "integer",
				"value": 165
			},
			"testfloat": {
				"fullkey": "testfloat",
				"type": "float",
				"value": 1.1
			},
			"testemptyarray": {
				"fullkey": "testemptyarray",
				"type": "array",
				"min": 0,
				"content": {}
			},
			"testemptyobject": {
				"fullkey": "testemptyobject",
				"type": "object",
				"content": {}
			},
			"testfunction": {
				"fullkey": "testfunction",
				"type": "function"
			}
		}, "normal running has invalid return for \"not typed\"");

	});

	it("should check normal running", () => {

		container
			.set("teststring", "string").document("teststring", "This is a string")
			.set("testboolean", false).document("testboolean", "This is a boolean")
			.set("testinteger", 1).document("testinteger", "This is an integer")
			.set("testbase16", 0xA5).document("testbase16", "This is a base16")
			.set("testfloat", 1.1).document("testfloat", "This is a float");

		deepStrictEqual(container.documentation().teststring, {
			"fullkey": "teststring",
			"type": "string",
			"documentation": "This is a string",
			"value": "string"
		}, "normal running has invalid return for \"teststring\"");

		deepStrictEqual(container.documentation().testboolean, {
			"fullkey": "testboolean",
			"type": "boolean",
			"documentation": "This is a boolean",
			"value": false
		}, "normal running has invalid return for \"testboolean\"");

		deepStrictEqual(container.documentation().testinteger, {
			"fullkey": "testinteger",
			"type": "integer",
			"documentation": "This is an integer",
			"value": 1
		}, "normal running has invalid return for \"testinteger\"");

		deepStrictEqual(container.documentation().testbase16, {
			"fullkey": "testbase16",
			"type": "integer",
			"documentation": "This is a base16",
			"value": 165
		}, "normal running has invalid return for \"testbase16\"");

		deepStrictEqual(container.documentation().testfloat, {
			"fullkey": "testfloat",
			"type": "float",
			"documentation": "This is a float",
			"value": 1.1
		}, "normal running has invalid return for \"testfloat\"");

	});

	it("should check specific running", () => {

		container

			.skeleton("testemail", "email")
				.set("testemail", "test@test.com")
				.document("testemail", "This is an email")

			.skeleton("testurl", "url")
				.set("testurl", "https://www.google.com")
				.document("testurl", "This is an url")

			.skeleton("testipv4", "ipv4")
				.set("testipv4", "127.0.0.1")
				.document("testipv4", "This is an ipv4")

			.skeleton("testipv6", "ipv6")
				.set("testipv6", "0000:0000:0000:0000:0000:0000:0000:0001")
				.document("testipv6", "This is an ipv6");

		// ipv4

		deepStrictEqual(container.documentation().testipv4, {
			"fullkey": "testipv4",
			"type": "ipv4",
			"documentation": "This is an ipv4",
			"min": 7,
			"max": 15,
			"regex": stringifyRegex(patternIPV4),
			"value": "127.0.0.1"
		}, "normal running has invalid return for \"testipv4\"");

		// ipv6

		deepStrictEqual(container.documentation().testipv6, {
			"fullkey": "testipv6",
			"type": "ipv6",
			"documentation": "This is an ipv6",
			"min": 7,
			"max": 39,
			"regex": stringifyRegex(patternIPV6),
			"value": "0000:0000:0000:0000:0000:0000:0000:0001"
		}, "normal running has invalid return for \"testipv6\"");

		// email

		deepStrictEqual(container.documentation().testemail, {
			"fullkey": "testemail",
			"type": "email",
			"documentation": "This is an email",
			"min": 6,
			"regex": stringifyRegex(patternEmail),
			"value": "test@test.com"
		}, "normal running has invalid return for \"testemail\"");

		// url

		deepStrictEqual(container.documentation().testurl, {
			"fullkey": "testurl",
			"type": "url",
			"documentation": "This is an url",
			"min": 8,
			"regex": stringifyRegex(patternUrl),
			"value": "https://www.google.com"
		}, "normal running has invalid return for \"testurl\"");

	});

	it("should check array running", () => {

		container

			.skeleton("testemptyarray", "array")
				.document("testemptyarray", "This is an empty array")
				.set("testemptyarray", [])

			.skeleton("testnotemptyarray", "array")
				.document("testnotemptyarray", "This is a not empty array")
				.set("testnotemptyarray", [ "test", "test" ]);

		deepStrictEqual(container.documentation().testemptyarray, {
			"fullkey": "testemptyarray",
			"type": "array",
			"documentation": "This is an empty array",
			"min": 0,
			"content": {}
		}, "normal running has invalid return for \"testemptyarray\"");

		deepStrictEqual(container.documentation().testnotemptyarray, {
			"fullkey": "testnotemptyarray",
			"type": "array",
			"documentation": "This is a not empty array",
			"min": 0,
			"content": {
				"0": {
					"fullkey": "testnotemptyarray.0",
					"type": "string",
					"value": "test"
				},
				"1": {
					"fullkey": "testnotemptyarray.1",
					"type": "string",
					"value": "test"
				}
			}
		}, "normal running has invalid return for \"testnotemptyarray\"");

	});

	it("should check object running", () => {

		container

			.skeleton("testemptyobject", "object")
				.set("testemptyobject", {})
				.document("testemptyobject", "This is an empty object")

			.skeleton("testnotemptyobject", "object")
				.set("testnotemptyobject", {
					"test": "test",
					"array": [ "test1", "test2" ]
				})
				.document("testnotemptyobject", "This is a not empty object")

			.set("testnotinstanciedobject", Object)

			.skeleton("testinstanciedobject", "object")
				.set("testinstanciedobject", {})
				.document("testinstanciedobject", "This is an instance of Object");

		// object

		deepStrictEqual(container.documentation().testemptyobject, {
			"fullkey": "testemptyobject",
			"type": "object",
			"documentation": "This is an empty object",
			"content": {}
		}, "normal running has invalid return for \"testemptyobject\"");

		deepStrictEqual(container.documentation().testnotinstanciedobject, {
			"fullkey": "testnotinstanciedobject",
			"type": "function"
		}, "normal running has invalid return for \"testnotinstanciedobject\"");

		deepStrictEqual(container.documentation().testnotemptyobject, {
			"fullkey": "testnotemptyobject",
			"type": "object",
			"documentation": "This is a not empty object",
			"content": {
				"array": {
					"fullkey": "testnotemptyobject.array",
					"min": 0,
					"type": "array",
					"content": {
						"0": {
							"fullkey": "testnotemptyobject.array.0",
							"type": "string",
							"value": "test1"
						},
						"1": {
							"fullkey": "testnotemptyobject.array.1",
							"type": "string",
							"value": "test2"
						}
					}
				},
				"test": {
					"fullkey": "testnotemptyobject.test",
					"type": "string",
					"value": "test"
				}
			}
		}, "normal running has invalid return for \"testnotemptyobject\"");

	});

	it("should check normal empty array running", () => {

		container
			.skeleton("module", "object")
				.skeleton("module.versions", "array")
				.set("module.versions", []);

		deepStrictEqual(container.documentation().module, {
			"fullkey": "module",
			"type": "object",
			"content": {
				"versions": {
					"fullkey": "module.versions",
					"min": 0,
					"type": "array",
					"content": {}
				}
			}
		}, "normal running has invalid return for \"empty array\"");

	});

	it("should check normal recursive array running", () => {

		container
			.skeleton("module", "object")
				.skeleton("module.versions", "array")
					.skeleton("module.versions.0", "integer")
					.document("module.versions.0", "This is the first version")
					.set("module.versions.0", 1);

		deepStrictEqual(container.documentation().module, {
			"fullkey": "module",
			"type": "object",
			"content": {
				"versions": {
					"fullkey": "module.versions",
					"type": "array",
					"min": 0,
					"content": {
						"0": {
							"documentation": "This is the first version",
							"fullkey": "module.versions.0",
							"type": "integer",
							"value": 1
						}
					}
				}
			}
		}, "normal running has invalid return for \"recursive array\"");

	});

	it("should check normal empty object running", () => {

		container
			.skeleton("module", "object")
				.skeleton("module.version", "object")
				.set("module.version", {});

		deepStrictEqual(container.documentation().module, {
			"fullkey": "module",
			"type": "object",
			"content": {
				"version": {
					"fullkey": "module.version",
					"type": "object",
					"content": {}
				}
			}
		}, "normal running has invalid return for \"empty object\"");

	});

	it("should check normal recursive object running", () => {

		container
			.skeleton("module", "object")
				.skeleton("module.version", "object")

					.skeleton("module.version.name", "string")
					.document("module.version.name", "Version name")
					.set("module.version.name", "main")

					.skeleton("module.version.code", "string")
					.document("module.version.code", "Version code")
					.set("module.version.code", "0.0.1");

		deepStrictEqual(container.documentation().module, {
			"fullkey": "module",
			"type": "object",
			"content": {
				"version": {
					"fullkey": "module.version",
					"type": "object",
					"content": {
						"name": {
							"documentation": "Version name",
							"fullkey": "module.version.name",
							"min": 0,
							"type": "string",
							"value": "main"
						},
						"code": {
							"documentation": "Version code",
							"fullkey": "module.version.code",
							"min": 0,
							"type": "string",
							"value": "0.0.1"
						}
					}
				}
			}
		}, "normal running has invalid return for \"recursive object\"");

	});

});
