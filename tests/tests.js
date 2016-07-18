"use strict";

// deps

	const 	assert = require("assert"),
			Container = require(require("path").join(__dirname, "..", "lib", "main.js"));

// private

	var container = new Container();

// tests

describe("clear", function() {

	before(function() { container.clear(); });
	after(function() { container.clear(); });

	it("should check normal running", function() {
		assert.strictEqual(true, container.clearData() instanceof Container, "normal \"clearData\" running has invalid return");
		assert.strictEqual(true, container.clearSkeleton() instanceof Container, "normal \"clearSkeleton\" running has invalid return");
		assert.strictEqual(true, container.clear() instanceof Container, "normal \"clear\" running has invalid return");
		assert.strictEqual(0, container.size, "normal running has invalid return");
	});

});

describe("bindSkeleton", function() {

	before(function() { container.clear(); });
	after(function() { container.clearData(); });

	it("should check type value", function() {
		assert.throws(function() { container.bindSkeleton(false); }, Error, "check type value does not throw an error");
		assert.throws(function() { container.bindSkeleton("testskeleton"); }, Error, "check type value does not throw an error");
		assert.throws(function() { container.bindSkeleton("testskeleton", String); }, Error, "check type value does not throw an error");
	});

	it("should check normal running", function() {
		assert.strictEqual(true, container.bindSkeleton("testskeletonstring", "String") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletonarray", "array") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletonobject", "object") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletonnumber", "number") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletonboolean", "boolean") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletonboolean.recursive", "boolean") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletoninteger", "integer") instanceof Container, "normal running has invalid return");
		assert.strictEqual(true, container.bindSkeleton("testskeletonfloat", "float") instanceof Container, "normal running has invalid return");
	});

});

describe("set", function() {

	before(function() { container.clearData(); });
	after(function() { container.clearData(); });

	it("should check initial data", function() {
		assert.throws(function() { container.set(""); }, Error, "check type value does not throw an error");
		assert.throws(function() { container.set("test"); }, Error, "check type value does not throw an error");
	});

	it("should check type value", function() {
		assert.throws(function() { container.set(false); }, Error, "check type value does not throw an error");
		assert.throws(function() { container.set(""); }, Error, "check type value does not throw an error");
		assert.throws(function() { container.set("test"); }, Error, "check type value does not throw an error");
		assert.throws(function() { container.set("testskeletonarray", "test"); }, Error, "check type value of \"testskeletonarray\" => test does not throw an error");
		assert.throws(function() { container.set("testskeletonarray", "[\"test\", \"test2]"); }, Error, "check type value \"testskeletonarray\" => [\"test\", \"test2] does not throw an error");
		assert.throws(function() { container.set("testskeletonnumber", []); }, Error, "check type value \"testskeletonnumber\" does not throw an error");
		assert.throws(function() { container.set("testskeletoninteger", []); }, Error, "check type value \"testskeletonnumber\" does not throw an error");
		assert.throws(function() { container.set("testskeletonfloat", []); }, Error, "check type value \"testskeletonnumber\" does not throw an error");
	});

	it("should check normal running", function() {

		assert.strictEqual(0, container.clearData().size, "normal running has invalid size");
		assert.strictEqual(true, container.set("test", "test") instanceof Container, "normal running has invalid return");
		assert.strictEqual(1, container.size, "normal running has invalid size");

	});

	it("should check normal recursive running", function() {

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

	describe("set with skeleton", function() {

		describe("string", function() {

			before(function() { container.clearData(); });
			after(function() { container.clearData(); });

			it("should check normal running with skeleton", function() {

				assert.doesNotThrow(function() { container.set("testskeletonstring", ""); }, Error, "normal running with skeleton throw an error");
				assert.doesNotThrow(function() { container.set("testskeletonstring", 5); }, Error, "normal running with skeleton throw an error");

				assert.strictEqual("5", container.get("testskeletonstring"), "normal running has invalid return");

				assert.strictEqual(1, container.size, "normal running has invalid return");

			});

		});

		describe("boolean", function() {

			before(function() { container.clearData(); });
			after(function() { container.clearData(); });

			it("should check normal running with boolean skeleton", function() {

				assert.doesNotThrow(function() { container.set("testskeletonboolean", true); }, Error, "normal running with boolean skeleton throw an error");
				assert.strictEqual(true, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(function() { container.set("testskeletonboolean", "true"); }, Error, "normal running with boolean skeleton throw an error");
				assert.strictEqual(true, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(function() { container.set("testskeletonboolean", "yes"); }, Error, "normal running with boolean skeleton throw an error");
				assert.strictEqual(true, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(function() { container.set("testskeletonboolean", "y"); }, Error, "normal running with boolean skeleton throw an error");
				assert.strictEqual(true, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(function() { container.set("testskeletonboolean", "1"); }, Error, "normal running with boolean skeleton throw an error");
				assert.strictEqual(true, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(function() { container.set("testskeletonboolean", 1); }, Error, "normal running with boolean skeleton throw an error");
				assert.strictEqual(true, container.get("testskeletonboolean"), "normal running has invalid return");

				assert.doesNotThrow(function() { container.set("testskeletonboolean", false); }, Error, "normal running with boolean skeleton throw an error");
				assert.strictEqual(false, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(function() { container.set("testskeletonboolean", "false"); }, Error, "normal running with boolean skeleton throw an error");
				assert.strictEqual(false, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(function() { container.set("testskeletonboolean", "no"); }, Error, "normal running with boolean skeleton throw an error");
				assert.strictEqual(false, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(function() { container.set("testskeletonboolean", "n"); }, Error, "normal running with boolean skeleton throw an error");
				assert.strictEqual(false, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(function() { container.set("testskeletonboolean", "0"); }, Error, "normal running with boolean skeleton throw an error");
				assert.strictEqual(false, container.get("testskeletonboolean"), "normal running has invalid return");
				assert.doesNotThrow(function() { container.set("testskeletonboolean", 0); }, Error, "normal running with boolean skeleton throw an error");
				assert.strictEqual(false, container.get("testskeletonboolean"), "normal running has invalid return");

				assert.doesNotThrow(function() { container.set("testskeletonboolean.recursive", "y"); }, Error, "normal running with boolean skeleton throw an error");
				assert.strictEqual(true, container.get("testskeletonboolean.recursive"), "normal running has invalid return");

				assert.strictEqual(1, container.size, "normal running has invalid return");

			});

		});

		describe("number", function() {

			before(function() { container.clearData(); });
			after(function() { container.clearData(); });

			it("should check normal running with number skeleton", function() {

				assert.doesNotThrow(function() { container.set("testskeletonnumber", 5.5); }, Error, "normal running with number skeleton throw an error");
				assert.doesNotThrow(function() { container.set("testskeletonnumber", "5.5"); }, Error, "normal running with number skeleton throw an error");

				assert.strictEqual(5.5, container.get("testskeletonnumber"), "normal running with number has invalid return");

				assert.strictEqual(1, container.size, "normal running with number has invalid size");

			});

			it("should check normal running with float skeleton", function() {

				assert.doesNotThrow(function() { container.set("testskeletonfloat", 5.5); }, Error, "normal running with float skeleton throw an error");
				assert.doesNotThrow(function() { container.set("testskeletonfloat", "5.5"); }, Error, "normal running with float skeleton throw an error");

				assert.strictEqual(5.5, container.get("testskeletonfloat"), "normal running with float has invalid return");

				assert.strictEqual(2, container.size, "normal running with float has invalid size");

			});

			it("should check normal running with integer skeleton", function() {

				assert.doesNotThrow(function() { container.set("testskeletoninteger", 5); }, Error, "normal running with integer skeleton throw an error");
				assert.doesNotThrow(function() { container.set("testskeletoninteger", "5"); }, Error, "normal running with integer skeleton throw an error");

				assert.strictEqual(5, container.get("testskeletoninteger"), "normal running with integer has invalid return");

				assert.strictEqual(3, container.size, "normal running with integer has invalid size");

			});

		});

		describe("array", function() {

			before(function() { container.clearData(); });
			after(function() { container.clearData(); });

			it("should check normal running with array skeleton", function() {

				assert.doesNotThrow(function() { container.set("testskeletonarray", []); }, Error, "normal running with array skeleton throw an error");
				assert.doesNotThrow(function() { container.set("testskeletonarray", "[\"test\", \"test2\"]"); }, Error, "normal running with array skeleton throw an error");

				assert.deepStrictEqual(["test", "test2"], container.get("testskeletonarray"), "normal running with array has invalid return");

				assert.strictEqual(1, container.size, "normal running with array has invalid size");

			});

		});

		describe("object", function() {

			before(function() { container.clearData(); });
			after(function() { container.clearData(); });

			it("should check normal running with object skeleton", function() {

				assert.doesNotThrow(function() { container.set("testskeletonobject", []); }, Error, "normal running with object skeleton throw an error");
				assert.doesNotThrow(function() { container.set("testskeletonobject", "{ \"test\": \"test\"}"); }, Error, "normal running with object skeleton throw an error");

				assert.deepStrictEqual({ "test": "test"}, container.get("testskeletonobject"), "normal running with object skeleton has invalid return");

				assert.strictEqual(1, container.size, "normal running with object skeleton has invalid size");

			});

		});

	});

});

describe("has", function() {

	before(function() { container.clearData(); });
	after(function() { container.clearData(); });

	it("should check type value", function() {
		assert.throws(function() { container.has(false); }, "check type value has an invalid key");
		assert.throws(function() { container.has(""); }, "check type value has an invalid key");
	});

	it("should check normal running", function() {
		assert.strictEqual(true, container.set("test", "test").has("test"), "normal running has invalid return");
		assert.strictEqual(false, container.has("test2"), "normal running has invalid return");
		assert.strictEqual("test", container.get("tesT"), "normal running has invalid return");
	});

	it("should check recursive running", function() {
		assert.strictEqual(false, container.set("lvl1", "test").has("lvl1.lvl2"), "normal recursive running has invalid return");
		assert.strictEqual(true, container.clearData().set("lvl1.lvl2", "test").has("lvl1.lvl2"), "normal recursive running has invalid return");
		assert.strictEqual(true, container.clearData().set("lvl1.lvl2", true).has("lvl1.lvl2"), "normal recursive running has invalid return for boolean value (true)");
		assert.strictEqual(true, container.clearData().set("lvl1.lvl2", false).has("lvl1.lvl2"), "normal recursive running has invalid return for boolean value (false)");
	});

});

describe("get", function() {

	before(function() { container.clearData(); });
	after(function() { container.clearData(); });

	it("should check type value", function() {
		assert.throws(function() { container.get(false); }, Error, "check type value does not throw an error");
		assert.throws(function() { container.get(""); }, Error, "check type value does not throw an error");
	});

	it("should check normal running", function() {
		assert.strictEqual("test", container.set("test", "test").get("test"), "normal running has invalid return");
		assert.strictEqual("test", container.get("tesT"), "normal running has invalid return");
	});

	it("should check wrong recursive running", function() {
		container.clearData().set("usr.login", "login");
		assert.throws(function() { container.get("usr.test"); }, Error, "wrong recursive running does not throw an error");
	});

	it("should check normal recursive running", function() {

		container.clearData().set("usr.login", "login");

		assert.deepStrictEqual({ "login": "login" }, container.get("usr"), "normal recursive running has invalid return (get)");
		assert.strictEqual("login", container.get("usr.login"), "normal recursive running has invalid return (get)");
		assert.strictEqual(1, container.size, "normal recursive running has invalid size");

		assert.strictEqual(true, container.clearData().set("lvl1.lvl2", true).get("lvl1.lvl2"), "normal recursive running has invalid return for boolean value (true)");
		assert.strictEqual(false, container.clearData().set("lvl1.lvl2", false).get("lvl1.lvl2"), "normal recursive running has invalid return for boolean value (false)");

	});

});

describe("delete", function() {

	before(function() { container.clearData(); });
	after(function() { container.clear(); });

	it("should check normal running", function() {
		assert.strictEqual(true, container.set("test", "test").delete("test") instanceof Container, "normal running has invalid return");
		assert.strictEqual(0, container.set("test", "test").delete("test").size, "normal running has invalid return");
	});

});
