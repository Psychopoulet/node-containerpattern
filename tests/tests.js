"use strict";

// deps

	const 	assert = require("assert"),
			Container = require(require("path").join(__dirname, "..", "dist", "main.js"));

// private

	var container = new Container();

// tests

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

});

describe("bindSkeleton", () => {

	before(() => { container.clear(); });
	after(() => { container.clear(); });

	it("should check type value", () => {
		assert.throws(() => { container.bindSkeleton(false); }, Error, "check type value does not throw an error");
		assert.throws(() => { container.bindSkeleton("testskeleton"); }, Error, "check type value does not throw an error");
		assert.throws(() => { container.bindSkeleton("testskeleton", String); }, Error, "check type value does not throw an error");
	});

	it("should check normal running", () => {
		assert.strictEqual(true, container.bindSkeleton("testskeletonstring", "String") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletonemail", "email") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletonarray", "array") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletonobject", "object") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletonnumber", "number") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletonboolean", "boolean") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletonboolean.recursive", "boolean") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletoninteger", "integer") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletonfloat", "float") instanceof Container, "normal running has invalid return");
	});

});

describe("clear", () => {

	before(() => { container.clear(); });
	after(() => { container.clear(); });

	it("should check normal running", () => {

		assert.strictEqual(1, container.bindSkeleton("test", "string").set("test", "test", "This is a test").size, "initialized data size is invalid");
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

describe("document", () => {

	before(() => { container.clear(); });
	after(() => { container.clear(); });

	it("should check type value", () => {
		assert.throws(() => { container.document(false); }, Error, "check type value does not throw an error");
		assert.throws(() => { container.document("testdocument"); }, Error, "check type value does not throw an error");
		assert.throws(() => { container.document("testdocument", String); }, Error, "check type value does not throw an error");
	});

	it("should check normal running", () => {
		assert.strictEqual(true, container.document("documentstring", "This is a random string") instanceof Container, "normal running has invalid return");
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

			.bindSkeleton("testrecursivefloat.test", "float")
				.set("testrecursivefloat.test", 1.1, "This is a recursive test")
				.set("testrecursivefloat", { "test" : 1.1 }, "This is a recursive test");

		assert.strictEqual(13, Object.keys(container.documentation()).length, "normal running has invalid size");

		// array

		assert.deepStrictEqual({ fullkey: "testemptyarray", type: "array", documentation: "This is an empty array", content: [] }, container.documentation().testemptyarray, "normal running has invalid return for \"testemptyarray\"");

		assert.strictEqual("array", container.documentation().testnotemptyarray.type, "normal running has invalid return for \"testnotemptyarray\"");
		assert.strictEqual("", container.documentation().testnotemptyarray.documentation, "normal running has invalid return for \"testnotemptyarray\"");
		assert.strictEqual(2, Object.keys(container.documentation().testnotemptyarray.content).length, "normal running has invalid return for \"testnotemptyarray\"");
		assert.deepStrictEqual({ fullkey: "testnotemptyarray.0", type: "string", documentation: "" }, container.documentation().testnotemptyarray.content[0], "normal running has invalid return for \"testnotemptyarray\"");

		// object

		assert.deepStrictEqual({ fullkey: "testemptyobject", type: "object", documentation: "", content: {} }, container.documentation().testemptyobject, "normal running has invalid return for \"testemptyobject\"");

		assert.strictEqual("object", container.documentation().testnotemptyobject.type, "normal running has invalid return for \"testnotemptyobject\"");
		assert.strictEqual("", container.documentation().testnotemptyobject.documentation, "normal running has invalid return for \"testnotemptyobject\"");
		assert.strictEqual(1, Object.keys(container.documentation().testnotemptyobject.content).length, "normal running has invalid return for \"testnotemptyobject\"");
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
		assert.strictEqual(true, container.bindSkeleton("test", "boolean").set("test", "y").get("test"), "normal formated boolean running has invalid return");
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

});

describe("set", () => {

	before(() => {

		container.clear()

			.bindSkeleton("testskeletonarray", "array")
			.bindSkeleton("testskeletonobject", "object")
			.bindSkeleton("testskeletonboolean", "boolean")
			.bindSkeleton("testskeletonbooleans", "object")
				.bindSkeleton("testskeletonbooleans.recursive", "boolean")
			.bindSkeleton("testskeletonstring", "string")
			.bindSkeleton("testskeletonemail", "email")
			.bindSkeleton("testskeletonnumber", "number")
			.bindSkeleton("testskeletoninteger", "integer")
			.bindSkeleton("testskeletonfloat", "float");

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

				assert.strictEqual(2, container.size, "normal running with float has invalid size");

			});

			it("should check normal running with integer skeleton", () => {

				assert.doesNotThrow(() => { container.set("testskeletoninteger", 5); }, Error, "normal running with integer skeleton throws an error");
				assert.doesNotThrow(() => { container.set("testskeletoninteger", "5"); }, Error, "normal running with integer skeleton throws an error");

				assert.strictEqual(5, container.get("testskeletoninteger"), "normal running with integer has invalid return");

				assert.strictEqual(3, container.size, "normal running with integer has invalid size");

			});

		});

		describe("array", () => {

			before(() => { container.clearData(); });
			after(() => { container.clearData(); });

			it("should check normal running with array skeleton", () => {

				assert.doesNotThrow(() => { container.set("testskeletonarray", []); }, Error, "normal running with array skeleton throws an error");
				assert.doesNotThrow(() => { container.set("testskeletonarray", "[\"test\", \"test2\"]"); }, Error, "normal running with array skeleton throws an error");

				assert.deepStrictEqual(["test", "test2"], container.get("testskeletonarray"), "normal running with array has invalid return");

				assert.strictEqual(1, container.size, "normal running with array has invalid size");

			});

		});

		describe("object", () => {

			before(() => { container.clearData(); });
			after(() => { container.clearData(); });

			it("should check normal running with object skeleton", () => {

				assert.doesNotThrow(() => { container.set("testskeletonobject", []); }, Error, "normal running with object skeleton throws an error");
				assert.doesNotThrow(() => { container.set("testskeletonobject", "{ \"test\": \"test\"}"); }, Error, "normal running with object skeleton throws an error");

				assert.deepStrictEqual({ "test": "test"}, container.get("testskeletonobject"), "normal running with object skeleton has invalid return");

				assert.strictEqual(1, container.size, "normal running with object skeleton has invalid size");

			});

		});

	});

});
