/*
	eslint-disable max-lines
*/

"use strict";

// deps

	// natives
	const { strictEqual, deepStrictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const Container = require(join(__dirname, "..", "lib", "main.js"));
	const stringifyRegex = require(join(__dirname, "..", "lib", "stringifyRegex.js"));
	const { patternEmail, patternUrl, patternIPV4, patternIPV6 } = require(join(__dirname, "..", "lib", "patterns.js"));

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
			"documentation": "",
			"fullkey": "teststring",
			"limits": [ "test 1", "test 2" ],
			"min": null,
			"max": null,
			"regex": null,
			"type": "string",
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
				"documentation": "",
				"fullkey": "teststring",
				"limits": null,
				"min": null,
				"max": null,
				"regex": null,
				"type": "string",
				"value": "string"
			},
			"testboolean": {
				"documentation": "",
				"fullkey": "testboolean",
				"limits": null,
				"min": null,
				"max": null,
				"regex": null,
				"type": "boolean",
				"value": false
			},
			"testinteger": {
				"documentation": "",
				"fullkey": "testinteger",
				"limits": null,
				"min": null,
				"max": null,
				"regex": null,
				"type": "integer",
				"value": 1
			},
			"testbase16": {
				"documentation": "",
				"fullkey": "testbase16",
				"limits": null,
				"min": null,
				"max": null,
				"regex": null,
				"type": "integer",
				"value": 165
			},
			"testfloat": {
				"documentation": "",
				"fullkey": "testfloat",
				"limits": null,
				"min": null,
				"max": null,
				"regex": null,
				"type": "float",
				"value": 1.1
			},
			"testemptyarray": {
				"documentation": "",
				"fullkey": "testemptyarray",
				"limits": null,
				"min": 0,
				"max": null,
				"regex": null,
				"type": "array",
				"content": {}
			},
			"testemptyobject": {
				"documentation": "",
				"fullkey": "testemptyobject",
				"limits": null,
				"min": null,
				"max": null,
				"regex": null,
				"type": "object",
				"content": {}
			},
			"testfunction": {
				"documentation": "",
				"fullkey": "testfunction",
				"limits": null,
				"min": null,
				"max": null,
				"regex": null,
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
			"documentation": "This is a string",
			"fullkey": "teststring",
			"limits": null,
			"min": null,
			"max": null,
			"regex": null,
			"type": "string",
			"value": "string"
		}, "normal running has invalid return for \"teststring\"");

		deepStrictEqual(container.documentation().testboolean, {
			"documentation": "This is a boolean",
			"fullkey": "testboolean",
			"limits": null,
			"min": null,
			"max": null,
			"regex": null,
			"type": "boolean",
			"value": false
		}, "normal running has invalid return for \"testboolean\"");

		deepStrictEqual(container.documentation().testinteger, {
			"documentation": "This is an integer",
			"fullkey": "testinteger",
			"limits": null,
			"min": null,
			"max": null,
			"regex": null,
			"type": "integer",
			"value": 1
		}, "normal running has invalid return for \"testinteger\"");

		deepStrictEqual(container.documentation().testbase16, {
			"documentation": "This is a base16",
			"fullkey": "testbase16",
			"limits": null,
			"min": null,
			"max": null,
			"regex": null,
			"type": "integer",
			"value": 165
		}, "normal running has invalid return for \"testbase16\"");

		deepStrictEqual(container.documentation().testfloat, {
			"documentation": "This is a float",
			"fullkey": "testfloat",
			"limits": null,
			"min": null,
			"max": null,
			"regex": null,
			"type": "float",
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
			"documentation": "This is an ipv4",
			"fullkey": "testipv4",
			"limits": null,
			"min": 7,
			"max": 15,
			"regex": stringifyRegex(patternIPV4),
			"type": "ipv4",
			"value": "127.0.0.1"
		}, "normal running has invalid return for \"testipv4\"");

		// ipv6

		deepStrictEqual(container.documentation().testipv6, {
			"documentation": "This is an ipv6",
			"fullkey": "testipv6",
			"limits": null,
			"min": 7,
			"max": 39,
			"regex": stringifyRegex(patternIPV6),
			"type": "ipv6",
			"value": "0000:0000:0000:0000:0000:0000:0000:0001"
		}, "normal running has invalid return for \"testipv6\"");

		// email

		deepStrictEqual(container.documentation().testemail, {
			"documentation": "This is an email",
			"fullkey": "testemail",
			"limits": null,
			"min": 6,
			"max": null,
			"regex": stringifyRegex(patternEmail),
			"type": "email",
			"value": "test@test.com"
		}, "normal running has invalid return for \"testemail\"");

		// url

		deepStrictEqual(container.documentation().testurl, {
			"documentation": "This is an url",
			"fullkey": "testurl",
			"limits": null,
			"min": 8,
			"max": null,
			"regex": stringifyRegex(patternUrl),
			"type": "url",
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
			"documentation": "This is an empty array",
			"fullkey": "testemptyarray",
			"limits": null,
			"min": 0,
			"max": null,
			"regex": null,
			"type": "array",
			"content": {}
		}, "normal running has invalid return for \"testemptyarray\"");

		deepStrictEqual(container.documentation().testnotemptyarray, {
			"documentation": "This is a not empty array",
			"fullkey": "testnotemptyarray",
			"limits": null,
			"min": 0,
			"max": null,
			"regex": null,
			"type": "array",
			"content": {
				"0": {
					"documentation": "",
					"fullkey": "testnotemptyarray.0",
					"limits": null,
					"min": null,
					"max": null,
					"regex": null,
					"type": "string",
					"value": "test"
				},
				"1": {
					"documentation": "",
					"fullkey": "testnotemptyarray.1",
					"limits": null,
					"min": null,
					"max": null,
					"regex": null,
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
			"documentation": "This is an empty object",
			"fullkey": "testemptyobject",
			"limits": null,
			"min": null,
			"max": null,
			"regex": null,
			"type": "object",
			"content": {}
		}, "normal running has invalid return for \"testemptyobject\"");

		deepStrictEqual(container.documentation().testnotinstanciedobject, {
			"documentation": "",
			"fullkey": "testnotinstanciedobject",
			"limits": null,
			"min": null,
			"max": null,
			"regex": null,
			"type": "function"
		}, "normal running has invalid return for \"testnotinstanciedobject\"");

		deepStrictEqual(container.documentation().testnotemptyobject, {
			"documentation": "This is a not empty object",
			"fullkey": "testnotemptyobject",
			"limits": null,
			"min": null,
			"max": null,
			"regex": null,
			"type": "object",
			"content": {
				"array": {
					"documentation": "",
					"fullkey": "testnotemptyobject.array",
					"limits": null,
					"max": null,
					"min": 0,
					"regex": null,
					"type": "array",
					"content": {
						"0": {
							"documentation": "",
							"fullkey": "testnotemptyobject.array.0",
							"limits": null,
							"max": null,
							"min": null,
							"regex": null,
							"type": "string",
							"value": "test1"
						},
						"1": {
							"documentation": "",
							"fullkey": "testnotemptyobject.array.1",
							"limits": null,
							"max": null,
							"min": null,
							"regex": null,
							"type": "string",
							"value": "test2"
						}
					}
				},
				"test": {
					"documentation": "",
					"fullkey": "testnotemptyobject.test",
					"limits": null,
					"max": null,
					"min": null,
					"regex": null,
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
			"documentation": "",
			"fullkey": "module",
			"limits": null,
			"min": null,
			"max": null,
			"regex": null,
			"type": "object",
			"content": {
				"versions": {
					"documentation": "",
					"fullkey": "module.versions",
					"limits": null,
					"min": 0,
					"max": null,
					"regex": null,
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
			"documentation": "",
			"fullkey": "module",
			"limits": null,
			"min": null,
			"max": null,
			"regex": null,
			"type": "object",
			"content": {
				"versions": {
					"documentation": "",
					"fullkey": "module.versions",
					"limits": null,
					"min": 0,
					"max": null,
					"regex": null,
					"type": "array",
					"content": {
						"0": {
							"documentation": "This is the first version",
							"fullkey": "module.versions.0",
							"limits": null,
							"min": null,
							"max": null,
							"regex": null,
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
			"documentation": "",
			"fullkey": "module",
			"limits": null,
			"min": null,
			"max": null,
			"regex": null,
			"type": "object",
			"content": {
				"version": {
					"documentation": "",
					"fullkey": "module.version",
					"limits": null,
					"min": null,
					"max": null,
					"regex": null,
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
			"documentation": "",
			"fullkey": "module",
			"limits": null,
			"min": null,
			"max": null,
			"regex": null,
			"type": "object",
			"content": {
				"version": {
					"documentation": "",
					"fullkey": "module.version",
					"limits": null,
					"min": null,
					"max": null,
					"regex": null,
					"type": "object",
					"content": {
						"name": {
							"documentation": "Version name",
							"fullkey": "module.version.name",
							"limits": null,
							"min": 0,
							"max": null,
							"regex": null,
							"type": "string",
							"value": "main"
						},
						"code": {
							"documentation": "Version code",
							"fullkey": "module.version.code",
							"limits": null,
							"min": 0,
							"max": null,
							"regex": null,
							"type": "string",
							"value": "0.0.1"
						}
					}
				}
			}
		}, "normal running has invalid return for \"recursive object\"");

	});

});
