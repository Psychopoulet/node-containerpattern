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

// private

	const container = new Container();

// tests

describe("documentation", () => {

	beforeEach(() => {
		container.clear();
	});

	it("should check empty running", () => {
		strictEqual(Object.keys(container.documentation()).length, 0, "normal running has invalid size");
	});

	it("should check data without doc", () => {
		strictEqual(container.set("test", "test").documentation().test.documentation, "", "normal running has invalid size");
	});

	it("should check data with doc", () => {

		strictEqual(
			container.set("test", "test").document("test", "This is a test").documentation().test.documentation,
			"This is a test",
			"normal running has invalid size"
		);

	});

	it("should check object data with doc", () => {

		container.set("test.test", "test").document("test.test", "This is a test");

		strictEqual(
			container.documentation().test.documentation,
			"",
			"normal running has invalid size"
		);

		strictEqual(
			container.documentation().test.documentation,
			"",
			"normal running has invalid test.documentation"
		);

		strictEqual(
			container.documentation().test.content.test.documentation,
			"This is a test",
			"normal running has invalid test.documentation.test.documentation"
		);

	});

	it("should check normal running", () => {

		container
			.set("testemptyarray", []).document("testemptyarray", "This is an empty array")
			.set("testnotemptyarray", [ "test", "test" ])
			.set("testemptyobject", {})
			.set("testnotemptyobject", {
				"test": "test",
				"array": [ "test1", "test2" ]
			})
			.set("testnotinstanciedobject", Object)
			.set("testinstanciedobject", {}).document("testinstanciedobject", "This is an instance of Object")

			.set("teststring", "string")
			.set("testboolean", false)
			.set("testnumber", 1)
			.set("testinteger", 1)
			.set("testbase16", 0xA5)
			.set("testfloat", 1.1)

			.skeleton("testlimits", "string")
				.limit("testlimits", [ "test1", "test2" ])
				.set("testlimits", "test1")

			.skeleton("testemail", "email")
				.set("testemail", "test@test.com")
			.skeleton("testurl", "url")
				.set("testurl", "https://www.google.com")
			.skeleton("testipv4", "ipv4")
				.set("testipv4", "127.0.0.1")
			.skeleton("testipv6", "ipv6")
				.set("testipv6", "0000:0000:0000:0000:0000:0000:0000:0001")

			.skeleton("testrecursiveinteger.test", "integer")
				.set("testrecursiveinteger.test", 1, "This is a recursive test")
				.set("testrecursiveinteger", { "test": 1 }, "This is a recursive test")

			.skeleton("testrecursivefloat.test", "float")
				.set("testrecursivefloat.test", 1.1, "This is a recursive test")
				.set("testrecursivefloat", { "test": 1.1 }, "This is a recursive test");

		strictEqual(Object.keys(container.documentation()).length, 19, "normal running has invalid size");

		// array

		deepStrictEqual(container.documentation().testemptyarray, {
			"content": {},
			"documentation": "This is an empty array",
			"fullkey": "testemptyarray",
			"limits": null,
			"min": null,
			"max": null,
			"type": "array"
		}, "normal running has invalid return for \"testemptyarray\"");

		strictEqual(
			container.documentation().testnotemptyarray.fullkey, "testnotemptyarray",
			"normal running has invalid fullkey for \"testnotemptyarray\""
		);

		strictEqual(
			container.documentation().testnotemptyarray.type, "array",
			"normal running has invalid type for \"testnotemptyarray\""
		);

		strictEqual(
			container.documentation().testnotemptyarray.documentation, "",
			"normal running has invalid documentation for \"testnotemptyarray\""
		);

		deepStrictEqual(
			container.documentation().testnotemptyarray.content, {
				"0": {
					"documentation": "",
					"fullkey": "testnotemptyarray.0",
					"limits": null,
					"min": null,
					"max": null,
					"type": "string"
				},
				"1": {
					"documentation": "",
					"fullkey": "testnotemptyarray.1",
					"limits": null,
					"min": null,
					"max": null,
					"type": "string"
				}
			},
			"normal running has invalid content for \"testnotemptyarray\""
		);

		deepStrictEqual(container.documentation().testnotemptyarray, {
			"content": {
				"0": {
					"documentation": "",
					"fullkey": "testnotemptyarray.0",
					"limits": null,
					"min": null,
					"max": null,
					"type": "string"
				},
				"1": {
					"documentation": "",
					"fullkey": "testnotemptyarray.1",
					"limits": null,
					"min": null,
					"max": null,
					"type": "string"
				}
			},
			"documentation": "",
			"fullkey": "testnotemptyarray",
			"limits": null,
			"min": null,
			"max": null,
			"type": "array"
		}, "normal running has invalid return for \"testnotemptyarray\"");

		// object

		deepStrictEqual(container.documentation().testemptyobject, {
			"content": {},
			"documentation": "",
			"fullkey": "testemptyobject",
			"limits": null,
			"min": null,
			"max": null,
			"type": "object"
		}, "normal running has invalid return for \"testemptyobject\"");

		strictEqual(container.documentation().testnotemptyobject.type, "object", "normal running has invalid type for \"testnotemptyobject\"");

		strictEqual(
			container.documentation().testnotemptyobject.documentation, "",
			"normal running has invalid documentation for \"testnotemptyobject\""
		);

		strictEqual(
			Object.keys(container.documentation().testnotemptyobject.content).length, 2,
			"normal running has invalid return for \"testnotemptyobject\""
		);

		strictEqual(
			container.documentation().testnotemptyobject.fullkey, "testnotemptyobject",
			"normal running has invalid fullkey for \"testnotemptyobject\""
		);

		deepStrictEqual(container.documentation().testnotemptyobject.content.test, {
			"documentation": "",
			"fullkey": "testnotemptyobject.test",
			"limits": null,
			"min": null,
			"max": null,
			"type": "string"
		}, "normal running has invalid return for \"testnotemptyobject\"");

		deepStrictEqual(container.documentation().testnotinstanciedobject, {
			"documentation": "",
			"fullkey": "testnotinstanciedobject",
			"limits": null,
			"min": null,
			"max": null,
			"type": "function"
		}, "normal running has invalid return for \"testnotinstanciedobject\"");

		deepStrictEqual(container.documentation().testinstanciedobject, {
			"content": {},
			"documentation": "This is an instance of Object",
			"fullkey": "testinstanciedobject",
			"limits": null,
			"min": null,
			"max": null,
			"type": "object"
		}, "normal running has invalid return for \"testinstanciedobject\"");

		// others

		deepStrictEqual(container.documentation().teststring, {
			"documentation": "",
			"fullkey": "teststring",
			"limits": null,
			"min": null,
			"max": null,
			"type": "string"
		}, "normal running has invalid return for \"teststring\"");

		deepStrictEqual(container.documentation().testboolean, {
			"documentation": "",
			"fullkey": "testboolean",
			"limits": null,
			"min": null,
			"max": null,
			"type": "boolean"
		}, "normal running has invalid return for \"testboolean\"");

		deepStrictEqual(container.documentation().testnumber, {
			"documentation": "",
			"fullkey": "testnumber",
			"limits": null,
			"min": null,
			"max": null,
			"type": "integer"
		}, "normal running has invalid return for \"testnumber\"");

		deepStrictEqual(container.documentation().testinteger, {
			"documentation": "",
			"fullkey": "testinteger",
			"limits": null,
			"min": null,
			"max": null,
			"type": "integer"
		}, "normal running has invalid return for \"testinteger\"");

		deepStrictEqual(container.documentation().testbase16, {
			"documentation": "",
			"fullkey": "testbase16",
			"limits": null,
			"min": null,
			"max": null,
			"type": "integer"
		}, "normal running has invalid return for \"testbase16\"");

		deepStrictEqual(container.documentation().testfloat, {
			"documentation": "",
			"fullkey": "testfloat",
			"limits": null,
			"min": null,
			"max": null,
			"type": "float"
		}, "normal running has invalid return for \"testfloat\"");

	});

	it("should check normal empty array running", () => {

		container
			.skeleton("module", "object")
				.skeleton("module.versions", "array").set("module.versions", []);

		strictEqual(
			container.documentation().module.documentation, "",
			"recursive empty array running has invalid return for \"module.documentation\""
		);

		strictEqual(
			container.documentation().module.fullkey, "module",
			"recursive empty array running has invalid return for \"module.fullkey\""
		);

		strictEqual(
			container.documentation().module.min, null,
			"recursive array running has invalid return for \"module.min\""
		);

		strictEqual(
			container.documentation().module.max, null,
			"recursive array running has invalid return for \"module.max\""
		);

		strictEqual(
			container.documentation().module.limits, null,
			"recursive array running has invalid return for \"module.max\""
		);

		strictEqual(
			container.documentation().module.type, "object",
			"recursive empty array running has invalid return for \"module.type\""
		);

		strictEqual(
			typeof container.documentation().module.content, "object",
			"recursive empty array running has invalid type for \"module.content\""
		);

			strictEqual(
				typeof container.documentation().module.content.versions, "object",
				"recursive empty array running has invalid type for \"module.content.versions\""
			);

				strictEqual(
					container.documentation().module.content.versions.documentation, "",
					"recursive empty array running has invalid return for \"module.content.versions.documentation\""
				);

				strictEqual(
					container.documentation().module.content.versions.fullkey, "module.versions",
					"recursive empty array running has invalid return for \"module.content.versions.fullkey\""
				);

				strictEqual(
					container.documentation().module.content.versions.min, 0,
					"recursive array running has invalid return for \"module.content.versions.min\""
				);

				strictEqual(
					container.documentation().module.content.versions.max, null,
					"recursive array running has invalid return for \"module.content.versions.max\""
				);

				strictEqual(
					container.documentation().module.content.versions.limits, null,
					"recursive array running has invalid return for \"module.content.versions.max\""
				);

				strictEqual(
					container.documentation().module.content.versions.type, "array",
					"recursive empty array running has invalid return for \"module.content.versions.type\""
				);

				strictEqual(
					typeof container.documentation().module.content.versions.content, "object",
					"recursive empty array running has invalid type for \"module.content.versions.content\""
				);

				strictEqual(
					Object.keys(container.documentation().module.content.versions.content).length, 0,
					"recursive empty array running has invalid type for \"module.content.versions.content\""
				);

	});

	it("should check normal recursive array running", () => {

		container
			.skeleton("module", "object")
				.skeleton("module.versions", "array")
					.skeleton("module.versions.0", "integer")
					.document("module.versions.0", "This is the first version");

		container
			.set("module.versions.0", 1);

		strictEqual(
			container.documentation().module.fullkey, "module",
			"recursive array running has invalid return for \"module.fullkey\""
		);

		strictEqual(
			container.documentation().module.documentation, "",
			"recursive array running has invalid return for \"module.documentation\""
		);

		strictEqual(
			container.documentation().module.min, null,
			"recursive array running has invalid return for \"module.min\""
		);

		strictEqual(
			container.documentation().module.max, null,
			"recursive array running has invalid return for \"module.max\""
		);

		strictEqual(
			container.documentation().module.limits, null,
			"recursive array running has invalid return for \"module.max\""
		);

		strictEqual(
			container.documentation().module.type, "object",
			"recursive array running has invalid return for \"module.type\""
		);

		strictEqual(
			typeof container.documentation().module.content, "object",
			"recursive array running has invalid type for \"module.content\""
		);

			strictEqual(
				typeof container.documentation().module.content.versions, "object",
				"recursive array running has invalid type for \"module.content.versions\""
			);

				strictEqual(
					container.documentation().module.content.versions.fullkey, "module.versions",
					"recursive array running has invalid return for \"module.content.versions.fullkey\""
				);

				strictEqual(
					container.documentation().module.content.versions.documentation, "",
					"recursive array running has invalid return for \"module.content.versions.documentation\""
				);

				strictEqual(
					container.documentation().module.content.versions.type, "array",
					"recursive array running has invalid return for \"module.content.versions.type\""
				);

				strictEqual(
					typeof container.documentation().module.content.versions.content, "object",
					"recursive array running has invalid type for \"module.content.versions.content\""
				);

					strictEqual(
						typeof container.documentation().module.content.versions.content[0], "object",
						"recursive array running has invalid type for \"module.content.versions.content.0\""
					);

						strictEqual(
							container.documentation().module.content.versions.content[0].fullkey, "module.versions.0",
							"recursive array running has invalid type for \"module.content.versions.content.0.fullkey\""
						);

						strictEqual(
							container.documentation().module.content.versions.content[0].documentation, "This is the first version",
							"recursive array running has invalid type for \"module.content.versions.content.0.documentation\""
						);

						strictEqual(
							container.documentation().module.content.versions.content[0].type, "integer",
							"recursive array running has invalid type for \"module.content.versions.content.0.type\""
						);

	});

	it("should check normal empty object running", () => {

		container
			.skeleton("module", "object")
				.skeleton("module.version", "object").set("module.version", {});

		strictEqual(
			container.documentation().module.fullkey, "module",
			"recursive empty array running has invalid return for \"module.fullkey\""
		);

		strictEqual(
			container.documentation().module.documentation, "",
			"recursive empty array running has invalid return for \"module.documentation\""
		);

		strictEqual(
			container.documentation().module.type, "object",
			"recursive empty array running has invalid return for \"module.type\""
		);

		strictEqual(
			typeof container.documentation().module.content, "object",
			"recursive empty array running has invalid type for \"module.content\""
		);

			strictEqual(
				typeof container.documentation().module.content.version, "object",
				"recursive empty array running has invalid type for \"module.content.version\""
			);

				strictEqual(
					container.documentation().module.content.version.fullkey, "module.version",
					"recursive empty array running has invalid return for \"module.content.version.fullkey\""
				);

				strictEqual(
					container.documentation().module.content.version.documentation, "",
					"recursive empty array running has invalid return for \"module.content.version.documentation\""
				);

				strictEqual(
					container.documentation().module.content.version.type, "object",
					"recursive empty array running has invalid return for \"module.content.version.type\""
				);

				strictEqual(
					typeof container.documentation().module.content.version.content, "object",
					"recursive empty array running has invalid type for \"module.content.version.content\""
				);

				strictEqual(
					Object.keys(container.documentation().module.content.version.content).length, 0,
					"recursive empty array running has invalid type for \"module.content.version.content\""
				);

	});

	it("should check normal recursive array running", () => {

		container
			.skeleton("module", "object")
				.skeleton("module.version", "object")
					.skeleton("module.version.name", "string").document("module.version.name", "Version name")
					.skeleton("module.version.code", "string").document("module.version.code", "Version code");

		container
			.set("module.version.name", "main")
			.set("module.version.code", "0.0.1");

		strictEqual(
			container.documentation().module.fullkey, "module",
			"recursive array running has invalid return for \"module.fullkey\""
		);

		strictEqual(
			container.documentation().module.documentation, "",
			"recursive array running has invalid return for \"module.documentation\""
		);

		strictEqual(
			container.documentation().module.type, "object",
			"recursive array running has invalid return for \"module.type\""
		);

		strictEqual(
			typeof container.documentation().module.content, "object",
			"recursive array running has invalid type for \"module.content\""
		);

			strictEqual(
				typeof container.documentation().module.content.version, "object",
				"recursive array running has invalid type for \"module.content.version\""
			);

				strictEqual(
					container.documentation().module.content.version.fullkey, "module.version",
					"recursive array running has invalid return for \"module.content.version.fullkey\""
				);

				strictEqual(
					container.documentation().module.content.version.documentation, "",
					"recursive array running has invalid return for \"module.content.version.documentation\""
				);

				strictEqual(
					container.documentation().module.content.version.type, "object",
					"recursive array running has invalid return for \"module.content.version.type\""
				);

				strictEqual(
					typeof container.documentation().module.content.version.content, "object",
					"recursive array running has invalid type for \"module.content.version.content\""
				);

					strictEqual(
						typeof container.documentation().module.content.version.content.name, "object",
						"recursive array running has invalid type for \"module.content.version.content.name\""
					);

						strictEqual(
							container.documentation().module.content.version.content.name.fullkey, "module.version.name",
							"recursive array running has invalid type for \"module.content.version.content.0.fullkey\""
						);

						strictEqual(
							container.documentation().module.content.version.content.name.documentation, "Version name",
							"recursive array running has invalid type for \"module.content.version.content.name.documentation\""
						);

						strictEqual(
							container.documentation().module.content.version.content.name.type, "string",
							"recursive array running has invalid type for \"module.content.version.content.name.type\""
						);

					strictEqual(
						typeof container.documentation().module.content.version.content.code, "object",
						"recursive array running has invalid type for \"module.content.version.content.code\""
					);

						strictEqual(
							container.documentation().module.content.version.content.code.fullkey, "module.version.code",
							"recursive array running has invalid type for \"module.content.version.content.0.fullkey\""
						);

						strictEqual(
							container.documentation().module.content.version.content.code.documentation, "Version code",
							"recursive array running has invalid type for \"module.content.version.content.code.documentation\""
						);

						strictEqual(
							container.documentation().module.content.version.content.code.type, "string",
							"recursive array running has invalid type for \"module.content.version.content.code.type\""
						);

	});

});
