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

	it("should check empty running", () => {
		strictEqual(Object.keys(container.documentation()).length, 0, "normal running has invalid size");
	});

	it("should check normal running", () => {

		container.clear()
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

			.skeleton("testrecursivefloat.test", "float")
				.set("testrecursivefloat.test", 1.1, "This is a recursive test")
				.set("testrecursivefloat", { "test": 1.1 }, "This is a recursive test");

		strictEqual(Object.keys(container.documentation()).length, 13, "normal running has invalid size");

		// array

		deepStrictEqual(container.documentation().testemptyarray, {
			"content": [],
			"documentation": "This is an empty array",
			"fullkey": "testemptyarray",
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
			container.documentation().testnotemptyarray.content, [ "test", "test" ],
			"normal running has invalid content for \"testnotemptyarray\""
		);

		deepStrictEqual(container.documentation().testnotemptyarray, {
			"content": [ "test", "test" ],
			"documentation": "",
			"fullkey": "testnotemptyarray",
			"type": "array"
		}, "normal running has invalid return for \"testnotemptyarray\"");

		// object

		deepStrictEqual(container.documentation().testemptyobject, {
			"content": {},
			"documentation": "",
			"fullkey": "testemptyobject",
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
			"type": "string"
		}, "normal running has invalid return for \"testnotemptyobject\"");

		deepStrictEqual(container.documentation().testnotinstanciedobject, {
			"documentation": "",
			"fullkey": "testnotinstanciedobject",
			"type": "function"
		}, "normal running has invalid return for \"testnotinstanciedobject\"");

		deepStrictEqual(container.documentation().testinstanciedobject, {
			"content": {},
			"documentation": "This is an instance of Object",
			"fullkey": "testinstanciedobject",
			"type": "object"
		}, "normal running has invalid return for \"testinstanciedobject\"");

		// others

		deepStrictEqual(container.documentation().teststring, {
			"documentation": "",
			"fullkey": "teststring",
			"type": "string"
		}, "normal running has invalid return for \"teststring\"");

		deepStrictEqual(container.documentation().testboolean, {
			"documentation": "",
			"fullkey": "testboolean",
			"type": "boolean"
		}, "normal running has invalid return for \"testboolean\"");

		deepStrictEqual(container.documentation().testnumber, {
			"documentation": "",
			"fullkey": "testnumber",
			"type": "integer"
		}, "normal running has invalid return for \"testnumber\"");

		deepStrictEqual(container.documentation().testinteger, {
			"documentation": "",
			"fullkey": "testinteger",
			"type": "integer"
		}, "normal running has invalid return for \"testinteger\"");

		deepStrictEqual(container.documentation().testbase16, {
			"documentation": "",
			"fullkey": "testbase16",
			"type": "integer"
		}, "normal running has invalid return for \"testbase16\"");

		deepStrictEqual(container.documentation().testfloat, {
			"documentation": "",
			"fullkey": "testfloat",
			"type": "float"
		}, "normal running has invalid return for \"testfloat\"");

	});

	it("should check normal recursive array running", () => {

		container.clear()
			.skeleton("module.versions.0", "integer")
			.set("module.versions.0", 1)
			.document("module.versions.0", "This is the first version");

		strictEqual(
			container.skeleton("module.versions.0", "integer") instanceof Container, true,
			"normal recursive array running has invalid return"
		);

		strictEqual("object", typeof container.documentation().module, "recursive array running has invalid type for \"module\"");

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
						container.documentation().module.content.versions.type, "object",
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

		deepStrictEqual(
			container.documentation().module.content.versions.content[0], {
				"documentation": "This is the first version",
				"fullkey": "module.versions.0",
				"type": "integer"
			}, "recursive array running has invalid return for \"module.content.versions.content.0\""
		);

	});

});
