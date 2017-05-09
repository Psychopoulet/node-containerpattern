"use strict";

// deps

	const assert = require("assert");
	const Container = require(require("path").join(__dirname, "..", "lib", "main.js"));

// private

	var container = new Container();

// tests

describe("meta", () => {

	before(() => { container.clear(); });
	after(() => { container.clear(); });

	describe("document", () => {

		before(() => { container.clear(); });
		after(() => { container.clear(); });

		it("should check type value", () => {
			assert.throws(() => { container.document(); }, ReferenceError, "check type value does not throw an error");
			assert.throws(() => { container.document(false); }, TypeError, "check type value does not throw an error");
			assert.throws(() => { container.document("testdocument"); }, ReferenceError, "check type value does not throw an error");
			assert.throws(() => { container.document("testdocument", false); }, TypeError, "check type value does not throw an error");
		});

		it("should check normal running", () => {
			assert.strictEqual(true, container.document("documentstring", "This is a random string") instanceof Container, "normal running has invalid return");
		});

	});

	describe("limit", () => {

		before(() => { container.clear(); });
		after(() => { container.clear(); });

		it("should check type value", () => {
			assert.throws(() => { container.limit(false); }, Error, "check type value does not throw an error");
			assert.throws(() => { container.limit("testslimit"); }, Error, "check type value does not throw an error");
			assert.throws(() => { container.limit("testslimit", String); }, Error, "check type value does not throw an error");
			assert.throws(() => { container.limit("testslimit", "String"); }, Error, "check type value does not throw an error");
		});

		it("should check normal running", () => {
			assert.strictEqual(true, container.limit("testslimit", ["test1", "test2"]) instanceof Container, "normal running has invalid return");
			assert.throws(() => { container.set("testslimit", "test"); }, Error, "check value value does not throw an error");
			assert.strictEqual(true, container.set("testslimit", "test1") instanceof Container, "normal running has invalid return");
			assert.strictEqual(true, container.set("testslimit", "test2") instanceof Container, "normal running has invalid return");
		});

		it("should check recursive running", () => {

			assert.strictEqual(true, container.limit("testslimitrecursive.string", ["test1", "test2"]) instanceof Container, "recursive running has invalid return");

			assert.throws(() => { container.set("testslimitrecursive.string", "test"); }, Error, "check value value does not throw an error");
			assert.strictEqual(true, container.set("testslimitrecursive.string", "test1") instanceof Container, "recursive running has invalid return");
			assert.strictEqual(true, container.set("testslimitrecursive.string", "test2") instanceof Container, "recursive running has invalid return");

			assert.throws(() => { container.set("testslimitrecursive", { "string": "test" } ); }, Error, "check value value does not throw an error");
			assert.strictEqual(true, container.set("testslimitrecursive", { "string": "test1" } ) instanceof Container, "recursive running has invalid return");
			assert.strictEqual(true, container.set("testslimitrecursive", { "string": "test2" } ) instanceof Container, "recursive running has invalid return");

		});

		it("should check normal recursive array running", () => {

			container.clear().set("module.authors", [ "Sébastien VIDAL" ]);

			assert.strictEqual(true, container.limit("module.authors.0", [ "Sébastien VIDAL" ]) instanceof Container, "normal recursive array running has invalid return");
			assert.throws(() => { container.set("module.authors.0", 5); }, Error, "normal recursive array running does not throw an error");

		});

	});
	
	describe("skeleton", () => {

		before(() => { container.clear(); });
		after(() => { container.clear(); });

		it("should check type value", () => {
			assert.throws(() => { container.skeleton(false); }, Error, "check type value does not throw an error");
			assert.throws(() => { container.skeleton("testskeleton"); }, Error, "check type value does not throw an error");
			assert.throws(() => { container.skeleton("testskeleton", String); }, Error, "check type value does not throw an error");
		});

		it("should check normal running", () => {
			assert.strictEqual(true, container.skeleton("testskeletonarray", "Array") instanceof Container, "normal running has invalid return");
			assert.strictEqual(true, container.skeleton("testskeletonarray", "array") instanceof Container, "normal running has invalid return");
			assert.strictEqual(true, container.skeleton("testskeletonboolean", "boolean") instanceof Container, "normal running has invalid return");
			assert.strictEqual(true, container.skeleton("testskeletonemail", "email") instanceof Container, "normal running has invalid return");
			assert.strictEqual(true, container.skeleton("testskeletonfloat", "float") instanceof Container, "normal running has invalid return");
			assert.strictEqual(true, container.skeleton("testskeletoninteger", "integer") instanceof Container, "normal running has invalid return");
			assert.strictEqual(true, container.skeleton("testskeletonipv4", "ipv4") instanceof Container, "normal running has invalid return");
			assert.strictEqual(true, container.skeleton("testskeletonipv6", "ipv6") instanceof Container, "normal running has invalid return");
			assert.strictEqual(true, container.skeleton("testskeletonnumber", "number") instanceof Container, "normal running has invalid return");
			assert.strictEqual(true, container.skeleton("testskeletonobject", "object") instanceof Container, "normal running has invalid return");
			assert.strictEqual(true, container.skeleton("testskeletonstring", "string") instanceof Container, "normal running has invalid return");
		});

		it("should check normal recursive running", () => {
			assert.strictEqual(true, container.skeleton("testskeletonrecursive.test", "string") instanceof Container, "normal running has invalid return");
		});

		it("should check normal recursive array running", () => {

			container.clear().set("module.versions", [ 1 ]);

			assert.strictEqual(true, container.skeleton("module.versions.0", "integer") instanceof Container, "normal recursive array running has invalid return");
			assert.throws(() => { container.set("module.versions.0", "one"); }, Error, "normal recursive array running does not throw an error");

		});

	});

});

describe("clear", () => {

	before(() => { container.clear(); });
	after(() => { container.clear(); });

	it("should check normal running", () => {

		assert.strictEqual(1, container.skeleton("test", "string").set("test", "test", "This is a test").size, "initialized data size is invalid");
		assert.strictEqual(1, Object.keys(container.skeletons).length, "initialized skeletons size is invalid");
		assert.strictEqual(true, container.clearData() instanceof Container, "normal \"clearData\" running has invalid return");

		assert.strictEqual(0, container.size, "cleaned data size is invalid");
		assert.strictEqual(1, Object.keys(container.skeletons).length, "initialized skeletons size is invalid");

		assert.strictEqual(true, container.clearSkeletons() instanceof Container, "normal \"clearSkeletons\" running has invalid return");

		assert.strictEqual(0, container.size, "cleaned data size is invalid");
		assert.strictEqual(0, Object.keys(container.skeletons).length, "cleaned skeletons size is invalid");

		assert.strictEqual(true, container.clear() instanceof Container, "normal \"clear\" running has invalid return");

		assert.strictEqual(0, container.size, "cleaned data size is invalid");
		assert.strictEqual(0, Object.keys(container.skeletons).length, "cleaned skeletons size is invalid");

	});

});

describe("delete", () => {

	before(() => { container.clear(); });
	after(() => { container.clear(); });

	it("should check normal running", () => {
		assert.strictEqual(true, container.set("test", "test").delete("test") instanceof Container, "normal running has invalid return");
		assert.strictEqual(0, container.set("test", "test").delete("test").size, "normal running has invalid return");
	});

});

describe("documentation", () => {

	before(() => { container.clear(); });
	after(() => { container.clear(); });

	it("should check normal running", () => {
		assert.strictEqual(0, Object.keys(container.documentation()).length, "normal running has invalid size");
	});

	it("should check normal running", () => {

		container.clear()
			.set("testemptyarray", []).document("testemptyarray", "This is an empty array")
			.set("testnotemptyarray", [ "test", "test" ])
			.set("testemptyobject", {})
			.set("testnotemptyobject", { "test": "test" })
			.set("testnotinstanciedobject", Object)
			.set("testinstanciedobject", new Object).document("testinstanciedobject", "This is an instance of Object")

			.set("teststring", "string")
			.set("testboolean", false)
			.set("testnumber", 1)
			.set("testinteger", 1)
			.set("testbase16", 0xA5)
			.set("testfloat", 1.1)

			.skeleton("testrecursivefloat.test", "float")
				.set("testrecursivefloat.test", 1.1, "This is a recursive test")
				.set("testrecursivefloat", { "test" : 1.1 }, "This is a recursive test");

		assert.strictEqual(13, Object.keys(container.documentation()).length, "normal running has invalid size");

		// array

		assert.deepStrictEqual({ fullkey: "testemptyarray", type: "array", documentation: "This is an empty array", content: [] }, container.documentation().testemptyarray, "normal running has invalid return for \"testemptyarray\"");
	
		assert.strictEqual("testnotemptyarray", container.documentation().testnotemptyarray.fullkey, "normal running has invalid fullkey for \"testnotemptyarray\"");
		assert.strictEqual("array", container.documentation().testnotemptyarray.type, "normal running has invalid type for \"testnotemptyarray\"");
		assert.strictEqual("", container.documentation().testnotemptyarray.documentation, "normal running has invalid documentation for \"testnotemptyarray\"");
		assert.deepStrictEqual([ "test", "test" ], container.documentation().testnotemptyarray.content, "normal running has invalid content for \"testnotemptyarray\"");
		assert.deepStrictEqual({ fullkey: "testnotemptyarray", type: "array", documentation: "", content: [ "test", "test" ] }, container.documentation().testnotemptyarray, "normal running has invalid return for \"testnotemptyarray\"");

		// object

		assert.deepStrictEqual({ fullkey: "testemptyobject", type: "object", documentation: "", content: {} }, container.documentation().testemptyobject, "normal running has invalid return for \"testemptyobject\"");

		assert.strictEqual("object", container.documentation().testnotemptyobject.type, "normal running has invalid type for \"testnotemptyobject\"");
		assert.strictEqual("", container.documentation().testnotemptyobject.documentation, "normal running has invalid documentation for \"testnotemptyobject\"");
		assert.strictEqual(1, Object.keys(container.documentation().testnotemptyobject.content).length, "normal running has invalid return for \"testnotemptyobject\"");
		assert.strictEqual("testnotemptyobject", container.documentation().testnotemptyobject.fullkey, "normal running has invalid fullkey for \"testnotemptyobject\"");
		assert.deepStrictEqual({ fullkey: "testnotemptyobject.test", type: "string", documentation: "" }, container.documentation().testnotemptyobject.content.test, "normal running has invalid return for \"testnotemptyobject\"");
		assert.deepStrictEqual({ fullkey: "testnotinstanciedobject", type: "function", documentation: "" }, container.documentation().testnotinstanciedobject, "normal running has invalid return for \"testnotinstanciedobject\"");
		assert.deepStrictEqual({ fullkey: "testinstanciedobject", type: "object", documentation: "This is an instance of Object", content: {} }, container.documentation().testinstanciedobject, "normal running has invalid return for \"testinstanciedobject\"");

		// others

		assert.deepStrictEqual({ fullkey: "teststring", type: "string", documentation: "" }, container.documentation().teststring, "normal running has invalid return for \"teststring\"");
		assert.deepStrictEqual({ fullkey: "testboolean", type: "boolean", documentation: "" }, container.documentation().testboolean, "normal running has invalid return for \"testboolean\"");
		assert.deepStrictEqual({ fullkey: "testnumber", type: "integer", documentation: "" }, container.documentation().testnumber, "normal running has invalid return for \"testnumber\"");
		assert.deepStrictEqual({ fullkey: "testinteger", type: "integer", documentation: "" }, container.documentation().testinteger, "normal running has invalid return for \"testinteger\"");
		assert.deepStrictEqual({ fullkey: "testbase16", type: "integer", documentation: "" }, container.documentation().testbase16, "normal running has invalid return for \"testbase16\"");
		assert.deepStrictEqual({ fullkey: "testfloat", type: "float", documentation: "" }, container.documentation().testfloat, "normal running has invalid return for \"testfloat\"");

	});

	it("should check normal recursive array running", () => {

		container.clear().skeleton("module.versions.0", "integer").set("module.versions.0", 1).document("module.versions.0", "This is the first version");

		assert.strictEqual(true, container.skeleton("module.versions.0", "integer") instanceof Container, "normal recursive array running has invalid return");

		assert.strictEqual("object", typeof container.documentation().module, "recursive array running has invalid type for \"module\"");
			assert.strictEqual("module", container.documentation().module.fullkey, "recursive array running has invalid return for \"module.fullkey\"");
			assert.strictEqual("", container.documentation().module.documentation, "recursive array running has invalid return for \"module.documentation\"");
			assert.strictEqual("object", container.documentation().module.type, "recursive array running has invalid return for \"module.type\"");

			assert.strictEqual("object", typeof container.documentation().module.content, "recursive array running has invalid type for \"module.content\"");
				assert.strictEqual("object", typeof container.documentation().module.content.versions, "recursive array running has invalid type for \"module.content.versions\"");
					assert.strictEqual("module.versions", container.documentation().module.content.versions.fullkey, "recursive array running has invalid return for \"module.content.versions.fullkey\"");
					assert.strictEqual("", container.documentation().module.content.versions.documentation, "recursive array running has invalid return for \"module.content.versions.documentation\"");
					assert.strictEqual("object", container.documentation().module.content.versions.type, "recursive array running has invalid return for \"module.content.versions.type\"");
		
					assert.strictEqual("object", typeof container.documentation().module.content.versions.content, "recursive array running has invalid type for \"module.content.versions.content\"");
						assert.strictEqual("object", typeof container.documentation().module.content.versions.content[0], "recursive array running has invalid type for \"module.content.versions.content.0\"");

		assert.deepStrictEqual({ fullkey: "module.versions.0", type: "integer", documentation: "This is the first version" }, container.documentation().module.content.versions.content[0], "recursive array running has invalid return for \"module.content.versions.content.0\"");

	});

});

describe("get", () => {

	before(() => { container.clear(); });
	after(() => { container.clear(); });

	it("should check type value", () => {
		assert.throws(() => { container.get(false); }, Error, "check type value does not throw an error");
		assert.throws(() => { container.get(""); }, Error, "check type value does not throw an error");
	});

	it("should check normal running", () => {
		assert.strictEqual("test", container.set("test", "test").get("test"), "normal running has invalid return");
	});

	it("should check normal formated boolean running", () => {
		assert.strictEqual(true, container.skeleton("test", "boolean").set("test", "y").get("test"), "normal formated boolean running has invalid return");
	});

	it("should check wrong recursive running", () => {

		container.clearData().set("usr.login", "login");
		assert.throws(() => { container.get("usr.test"); }, Error, "wrong recursive running does not throw an error");

		container.clearData().set("usr", { "login": "login" });
		assert.throws(() => { container.get("usr.test"); }, Error, "wrong recursive running does not throw an error");

	});

	it("should check normal recursive running", () => {

		container.clearData().set("usr.login", "login");

		assert.deepStrictEqual({ "login": "login" }, container.get("usr"), "normal recursive running has invalid return (get)");
		assert.strictEqual("login", container.get("usr.login"), "normal recursive running has invalid return (get)");
		assert.strictEqual(1, container.size, "normal recursive running has invalid size");

		assert.strictEqual(true, container.clearData().set("lvl1.lvl2", true).get("lvl1.lvl2"), "normal recursive running has invalid return for boolean value (true)");
		assert.strictEqual(false, container.clearData().set("lvl1.lvl2", false).get("lvl1.lvl2"), "normal recursive running has invalid return for boolean value (false)");

	});

	it("should check normal recursive array running", () => {

		container.clearData().set("module.authors", [ "Sébastien VIDAL" ]);

		assert.deepStrictEqual({ "authors": [ "Sébastien VIDAL" ] }, container.get("module"), "normal recursive array running has invalid return (get)");
		assert.deepStrictEqual([ "Sébastien VIDAL" ], container.get("module.authors"), "normal recursive array running has invalid return (get)");
		assert.strictEqual(1, container.size, "normal recursive array running has invalid size");
		
		container.clearData().set("module.authors", [ "Sébastien VIDAL", "1", "2" ]);

	});

	it("should check normal recursive array running", () => {

		container.clear()
			.skeleton("module.versions.0", "string").set("module.versions.0", 1)
			.skeleton("module.versions.1", "integer").set("module.versions.1", "2");

		assert.strictEqual("1", container.get("module.versions.0"), "normal recursive array running has invalid return");
		assert.strictEqual(2, container.get("module.versions.1"), "normal recursive array running has invalid return");

	});

});

describe("has", () => {

	before(() => { container.clear(); });
	after(() => { container.clear(); });

	it("should check type value", () => {
		assert.throws(() => { container.has(false); }, "check type value has an invalid key");
		assert.throws(() => { container.has(""); }, "check type value has an invalid key");
	});

	it("should check normal running", () => {
		assert.strictEqual(true, container.set("test", "test").has("test"), "normal running has invalid return");
		assert.strictEqual(false, container.has("test2"), "normal running has invalid return");
	});

	it("should check recursive running", () => {
		assert.strictEqual(false, container.set("lvl1", "test").has("lvl1.lvl2"), "normal recursive running has invalid return");
		assert.strictEqual(true, container.clearData().set("lvl1.lvl2", "test").has("lvl1.lvl2"), "normal recursive running has invalid return");
		assert.strictEqual(true, container.clearData().set("lvl1.lvl2", true).has("lvl1.lvl2"), "normal recursive running has invalid return for boolean value (true)");
		assert.strictEqual(true, container.clearData().set("lvl1.lvl2", false).has("lvl1.lvl2"), "normal recursive running has invalid return for boolean value (false)");
		assert.strictEqual(true, container.clearData().set("lvl1.lvl2.lvl3.lvl4.lvl5", false).has("lvl1.lvl2.lvl3.lvl4.lvl5"), "normal recursive running has invalid return for boolean value (false)");
	});

	it("should check normal recursive array running", () => {

		container.clear().skeleton("module.versions.0", "string").set("module.versions.0", 1);

		assert.strictEqual(true, container.has("module.versions.0"), "normal recursive array running has invalid return");
		assert.strictEqual(false, container.has("module.versions.1"), "normal recursive array running has invalid return");

	});

});

describe("set", () => {

	before(() => {

		container.clear()

			.skeleton("testskeletonarray", "array")
			.skeleton("testskeletonboolean", "boolean")
			.skeleton("testskeletonemail", "email")
			.skeleton("testskeletonfloat", "float")
			.skeleton("testskeletoninteger", "integer")
			.skeleton("testskeletonipv4", "ipv4")
			.skeleton("testskeletonipv6", "ipv6")
			.skeleton("testskeletonnumber", "number")
			.skeleton("testskeletonobject", "object")
			.skeleton("testskeletonbooleans", "object")
				.skeleton("testskeletonbooleans.recursive", "boolean")
			.skeleton("testskeletonstring", "string");

	});

	after(() => { container.clear(); });

	it("should check wrong data", () => {
		assert.throws(() => { container.set(""); }, Error, "check type value does not throw an error");
		assert.throws(() => { container.set("test"); }, Error, "check type value does not throw an error");
	});

	it("should check normal running", () => {

		assert.strictEqual(0, container.clearData().size, "normal running has invalid size");
		assert.strictEqual(true, container.set("test", "test") instanceof Container, "normal running has invalid return");
		assert.strictEqual(1, container.size, "normal running has invalid size");
		assert.strictEqual(0, container.clearData().size, "normal running has invalid size");

	});

	it("should check normal recursive running", () => {

		assert.strictEqual(0, container.clearData().size, "normal recursive running has invalid size");

		assert.strictEqual(true, container.set("usr.login", "login") instanceof Container, "normal recursive running has invalid return (set login)");
		assert.deepStrictEqual({ "login": "login" }, container.get("usr"), "normal recursive running has invalid return (get 1)");

		assert.strictEqual(true, container.set("usr.password", "password") instanceof Container, "normal recursive running has invalid return (set password)");
		assert.deepStrictEqual({ "login": "login", "password": "password" }, container.get("usr"), "normal recursive running has invalid return (get 2)");

		assert.strictEqual(true,
			container.set("usr.mail", { "email": "test@test.com", "password": "password" }) instanceof Container,
			"normal recursive running has invalid return (set mail)"
		);

		assert.deepStrictEqual(
			{ "login": "login", "password": "password", "mail": { "email": "test@test.com", "password": "password" } },
			container.get("usr"),
			"normal recursive running has invalid return (get 3)"
		);

		assert.strictEqual(1, container.size, "normal recursive running has invalid size");

	});

	it("should check type value", () => {

		assert.throws(() => { container.set(false); }, Error, "check type value does not throw an error");
		assert.throws(() => { container.set(""); }, Error, "check type value does not throw an error");
		assert.throws(() => { container.set("test"); }, Error, "check type value does not throw an error");

		assert.throws(() => { container.set("testskeletonarray", "test"); }, Error, "check type value of \"testskeletonarray\" => test does not throw an error");
		assert.throws(() => { container.set("testskeletonarray", "[\"test\", \"test2]"); }, Error, "check type value \"testskeletonarray\" => [\"test\", \"test2] does not throw an error");
		assert.strictEqual(true, container.set("testskeletonarray", []).get("testskeletonarray") instanceof Array, "check type value \"testskeletonarray\" has invalid return");

		assert.throws(() => { container.set("testskeletonnumber", []); }, Error, "check type value \"testskeletonnumber\" does not throw an error");
		assert.strictEqual("number", typeof container.set("testskeletonnumber", 1).get("testskeletonnumber"), "check type value \"testskeletonnumber\" has invalid return");

		assert.throws(() => { container.set("testskeletoninteger", []); }, Error, "check type value \"testskeletonnumber\" does not throw an error");
		assert.strictEqual("number", typeof container.set("testskeletoninteger", 1).get("testskeletoninteger"), "check type value \"testskeletoninteger\" has invalid return");

		assert.throws(() => { container.set("testskeletonfloat", []); }, Error, "check type value \"testskeletonnumber\" does not throw an error");
		assert.strictEqual("number", typeof container.set("testskeletonfloat", 1.1).get("testskeletonfloat"), "check type value \"testskeletonfloat\" has invalid return");

	});

	describe("set with skeleton", () => {

		before(() => { container.clearData(); });
		after(() => { container.clearData(); });

		describe("array", () => {

			before(() => { container.clearData(); });
			after(() => { container.clearData(); });

			it("should check normal running with array skeleton", () => {

				assert.doesNotThrow(() => { container.set("testskeletonarray", []); }, Error, "normal running with array skeleton throws an error");
				assert.doesNotThrow(() => { container.set("testskeletonarray", [ "test", "test" ]); }, Error, "normal running with array skeleton throws an error");
				assert.doesNotThrow(() => { container.set("testskeletonarray", "[\"test\", \"test2\"]"); }, Error, "normal running with array skeleton throws an error");

				assert.deepStrictEqual(["test", "test2"], container.get("testskeletonarray"), "normal running with array has invalid return");

				assert.strictEqual(1, container.size, "normal running with array has invalid size");

			});

		});

		describe("boolean", () => {

			beforeEach(() => { container.clearData(); });
			after(() => { container.clearData(); });

			it("should check normal running with boolean skeleton", () => {

				assert.doesNotThrow(() => { container.set("testskeletonboolean", true); }, Error, "normal running with boolean skeleton throws an error");
				assert.strictEqual(true, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(() => { container.set("testskeletonboolean", "true"); }, Error, "normal running with boolean skeleton throws an error");
				assert.strictEqual(true, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(() => { container.set("testskeletonboolean", "yes"); }, Error, "normal running with boolean skeleton throws an error");
				assert.strictEqual(true, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(() => { container.set("testskeletonboolean", "y"); }, Error, "normal running with boolean skeleton throws an error");
				assert.strictEqual(true, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(() => { container.set("testskeletonboolean", "1"); }, Error, "normal running with boolean skeleton throws an error");
				assert.strictEqual(true, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(() => { container.set("testskeletonboolean", 1); }, Error, "normal running with boolean skeleton throws an error");
				assert.strictEqual(true, container.get("testskeletonboolean"), "normal running has invalid return");

				assert.doesNotThrow(() => { container.set("testskeletonboolean", false); }, Error, "normal running with boolean skeleton throws an error");
				assert.strictEqual(false, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(() => { container.set("testskeletonboolean", "false"); }, Error, "normal running with boolean skeleton throws an error");
				assert.strictEqual(false, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(() => { container.set("testskeletonboolean", "no"); }, Error, "normal running with boolean skeleton throws an error");
				assert.strictEqual(false, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(() => { container.set("testskeletonboolean", "n"); }, Error, "normal running with boolean skeleton throws an error");
				assert.strictEqual(false, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(() => { container.set("testskeletonboolean", "0"); }, Error, "normal running with boolean skeleton throws an error");
				assert.strictEqual(false, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(() => { container.set("testskeletonboolean", 0); }, Error, "normal running with boolean skeleton throws an error");
				assert.strictEqual(false, container.get("testskeletonboolean"), "normal running has invalid return");

				assert.strictEqual(1, container.size, "normal running has invalid return");

			});

		describe("email", () => {

			before(() => { container.clearData(); });
			after(() => { container.clearData(); });

			it("should check normal running with skeleton", () => {

				assert.doesNotThrow(() => { container.set("testskeletonemail", ""); }, Error, "empty running with skeleton throws an error");
				assert.throws(() => { container.set("testskeletonemail", 5); }, Error, "wrong running with skeleton does not throw an error");
				assert.throws(() => { container.set("testskeletonemail", "test"); }, Error, "wrong running with skeleton does not throw an error");
				assert.doesNotThrow(() => { container.set("testskeletonemail", "myaddress@provider.com"); }, Error, "normal running with skeleton throws an error");

				assert.strictEqual("myaddress@provider.com", container.get("testskeletonemail"), "normal running has invalid return");

				assert.strictEqual(1, container.size, "normal running has invalid return");

			});

		});

		describe("ipv4", () => {

			before(() => { container.clearData(); });
			after(() => { container.clearData(); });

			it("should check normal running with skeleton", () => {

				assert.doesNotThrow(() => { container.set("testskeletonipv4", ""); }, Error, "empty running with skeleton throws an error");
				assert.throws(() => { container.set("testskeletonipv4", 5); }, Error, "wrong running with skeleton does not throw an error");
				assert.throws(() => { container.set("testskeletonipv4", "10.10"); }, Error, "wrong running with skeleton does not throw an error");
				assert.doesNotThrow(() => { container.set("testskeletonipv4", "212.212.100.110"); }, Error, "normal running with skeleton throws an error");

				assert.strictEqual("212.212.100.110", container.get("testskeletonipv4"), "normal running has invalid return");

				assert.strictEqual(1, container.size, "normal running has invalid return");

			});

		});

		describe("ipv6", () => {

			before(() => { container.clearData(); });
			after(() => { container.clearData(); });

			it("should check normal running with skeleton", () => {

				assert.doesNotThrow(() => { container.set("testskeletonipv6", ""); }, Error, "empty running with skeleton throws an error");
				assert.throws(() => { container.set("testskeletonipv6", 5); }, Error, "wrong running with skeleton does not throw an error");
				assert.throws(() => { container.set("testskeletonipv6", "10.10"); }, Error, "wrong running with skeleton does not throw an error");
				assert.doesNotThrow(() => { container.set("testskeletonipv6", "0000:0000:0000:0000:0000:0000:0000:0001"); }, Error, "normal running with skeleton throws an error");

				assert.strictEqual("0000:0000:0000:0000:0000:0000:0000:0001", container.get("testskeletonipv6"), "normal running has invalid return");

				assert.strictEqual(1, container.size, "normal running has invalid return");

			});

		});

		describe("number", () => {

			before(() => { container.clearData(); });
			after(() => { container.clearData(); });

			it("should check normal running with number skeleton", () => {

				assert.doesNotThrow(() => { container.set("testskeletonnumber", 5.5); }, Error, "normal running with number skeleton throws an error");
				assert.doesNotThrow(() => { container.set("testskeletonnumber", "5.5"); }, Error, "normal running with number skeleton throws an error");
				assert.strictEqual(5.5, container.get("testskeletonnumber"), "normal running with number has invalid return");

				assert.strictEqual(1, container.size, "normal running with number has invalid size");

			});

			it("should check normal running with float skeleton", () => {

				assert.doesNotThrow(() => { container.set("testskeletonfloat", 5.5); }, Error, "normal running with float skeleton throws an error");
				assert.doesNotThrow(() => { container.set("testskeletonfloat", "5.5"); }, Error, "normal running with float skeleton throws an error");

				assert.strictEqual(5.5, container.get("testskeletonfloat"), "normal running with float has invalid return");

				assert.strictEqual(1, container.size, "normal running with float has invalid size");

			});

			it("should check normal running with integer skeleton", () => {

				assert.doesNotThrow(() => { container.set("testskeletoninteger", 5); }, Error, "normal running with integer skeleton throws an error");
				assert.doesNotThrow(() => { container.set("testskeletoninteger", "5"); }, Error, "normal running with integer skeleton throws an error");

				assert.strictEqual(5, container.get("testskeletoninteger"), "normal running with integer has invalid return");

				assert.strictEqual(1, container.size, "normal running with integer has invalid size");

			});

		});

		describe("object", () => {

			before(() => { container.clearData(); });
			after(() => { container.clearData(); });

			it("should check normal running with object skeleton", () => {

				assert.doesNotThrow(() => { container.set("testskeletonobject", {}); }, Error, "normal running with object skeleton throws an error");
				assert.doesNotThrow(() => { container.set("testskeletonobject", { "test": "test" }); }, Error, "normal running with object skeleton throws an error");
				assert.doesNotThrow(() => { container.set("testskeletonobject", "{ \"test\": \"test\"}"); }, Error, "normal running with object skeleton throws an error");

				assert.deepStrictEqual({ "test": "test"}, container.get("testskeletonobject"), "normal running with object skeleton has invalid return");

				assert.strictEqual(1, container.size, "normal running with object skeleton has invalid size");

			});

		});

		describe("string", () => {

			before(() => { container.clearData(); });
			after(() => { container.clearData(); });

			it("should check normal running with skeleton", () => {

				assert.doesNotThrow(() => { container.set("testskeletonstring", ""); }, Error, "empty running with skeleton throws an error");
				assert.doesNotThrow(() => { container.set("testskeletonstring", 5); }, Error, "numeric running with skeleton throws an error");
				assert.doesNotThrow(() => { container.set("testskeletonstring", "5"); }, Error, "normal running with skeleton throws an error");

				assert.strictEqual("5", container.get("testskeletonstring"), "normal running has invalid return");

				assert.strictEqual(1, container.size, "normal running has invalid return");

			});

		});

			it("should check normal running with recursive boolean skeleton", () => {

				assert.doesNotThrow(() => { container.set("testskeletonbooleans.recursive", "y"); }, Error, "normal running with recursive boolean skeleton throws an error");
				assert.strictEqual(true, container.get("testskeletonbooleans.recursive"), "normal running with recursive boolean skeleton has invalid return");

				assert.doesNotThrow(() => { container.set("testskeletonbooleans", { "recursive": "y"} ); }, Error, "normal running with recursive boolean skeleton throws an error");
				assert.strictEqual(true, container.get("testskeletonbooleans").recursive, "normal running with recursive boolean skeleton has invalid return");

				assert.strictEqual(1, container.size, "normal running with recursive boolean skeleton has invalid return");

			});

			it("should check normal running with limited boolean skeleton", () => {

				assert.doesNotThrow(() => { container.limit("testskeletonboolean", [true, false]).set("testskeletonboolean", true); }, Error, "normal running with limited boolean skeleton throws an error");
				assert.strictEqual(true, container.get("testskeletonboolean"), "normal running with limited boolean skeleton has invalid return");

				assert.throws(() => { container.limit("testskeletonboolean", [true, false]).set("testskeletonboolean", "y"); }, Error, "normal running with limited boolean skeleton does not throws an error");
				assert.strictEqual(true, container.get("testskeletonboolean"), "normal running with limited boolean skeleton has invalid return");

				assert.strictEqual(1, container.size, "normal running with limited boolean skeleton has invalid return");

			});

			it("should check normal running with limited recursive boolean skeleton", () => {

				assert.doesNotThrow(() => { container.limit("testskeletonbooleans.recursive", [ true, false ]); }, Error, "normal running with limited recursive boolean skeleton throws an error");

				// check key recursivity
				assert.throws(() => { container.set("testskeletonbooleans.recursive", "y" ); }, Error, "normal running with limited recursive boolean skeleton does not throw an error");
				assert.doesNotThrow(() => { container.set("testskeletonbooleans.recursive", true); }, Error, "normal running with limited recursive boolean skeleton throws an error");
				assert.strictEqual(true, container.get("testskeletonbooleans.recursive"), "normal running with limited recursive boolean skeleton return");

				// check content recursivity
				assert.throws(() => { container.set("testskeletonbooleans", { "recursive": "y" } ); }, Error, "normal running with limited recursive boolean skeleton does not throw an error");
				assert.doesNotThrow(() => { container.set("testskeletonbooleans", { "recursive": true } ); }, Error, "normal running with limited recursive boolean skeleton throws an error");
				assert.strictEqual(true, container.get("testskeletonbooleans").recursive, "normal running with limited recursive boolean skeleton has invalid return");

				assert.strictEqual(1, container.size, "normal running with limited recursive boolean skeleton has invalid return");

			});

		});

	});

});
