/*
	eslint max-nested-callbacks: [ "error", 6 ]
*/

"use strict";

// deps

	const assert = require("assert");
	const Container = require(require("path").join(__dirname, "..", "lib", "main.js"));

// private

	const container = new Container(".");

// tests

describe("set", () => {

	it("should check normal running for skeletons", () => {

		assert.doesNotThrow(() => {

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

		}, Error, "check right skeletons throws an error");

		assert.throws(() => {
			container.skeleton("test", "test");
		}, Error, "check wrong skeleton does not throw an error");

	});

	it("should check wrong data", () => {

		assert.throws(() => {
			container.set("");
		}, Error, "check type value does not throw an error");

		assert.throws(() => {
			container.set("test");
		}, Error, "check type value does not throw an error");

	});

	it("should check normal running", () => {

		assert.strictEqual(container.clearData().size, 0, "normal running has invalid size");
		assert.strictEqual(container.set("test", "test") instanceof Container, true, "normal running has invalid return");
		assert.strictEqual(container.size, 1, "normal running has invalid size");
		assert.strictEqual(container.clearData().size, 0, "normal running has invalid size");

	});

	it("should check normal recursive running", () => {

		assert.strictEqual(container.clearData().size, 0, "normal recursive running has invalid size");

		assert.strictEqual(
			container.set("usr.login", "login") instanceof Container, true,
			"normal recursive running has invalid return (set login)"
		);

		assert.deepStrictEqual(container.get("usr"), {
			"login": "login"
		}, "normal recursive running has invalid return (get 1)");

		assert.strictEqual(
			true, container.set("usr.password", "password") instanceof Container,
			"normal recursive running has invalid return (set password)"
		);

		assert.deepStrictEqual(container.get("usr"), {
			"login": "login",
			"password": "password"
		}, "normal recursive running has invalid return (get 2)");

		assert.strictEqual(container.set("usr.mail", {
			"email": "test@test.com",
			"password": "password"
		}) instanceof Container, true, "normal recursive running has invalid return (set mail)");

		assert.deepStrictEqual(container.get("usr"), {
			"login": "login",
			"password": "password",
			"mail": {
				"email": "test@test.com",
				"password": "password"
			}
		}, "normal recursive running has invalid return (get 3)");

		assert.strictEqual(1, container.size, "normal recursive running has invalid size");

	});

	it("should check type value", () => {

		assert.throws(() => {
			container.set(false);
		}, Error, "check type value does not throw an error");

		assert.throws(() => {
			container.set("");
		}, Error, "check type value does not throw an error");

		assert.throws(() => {
			container.set("test");
		}, Error, "check type value does not throw an error");

		assert.throws(() => {
			container.set("testskeletonarray", "test");
		}, Error, "check type value of \"testskeletonarray\" => test does not throw an error");

		assert.throws(() => {
			container.set("testskeletonarray", "[\"test\", \"test2]");
		}, Error, "check type value \"testskeletonarray\" => [\"test\", \"test2] does not throw an error");

		assert.strictEqual(
			container.set("testskeletonarray", []).get("testskeletonarray") instanceof Array, true,
			"check type value \"testskeletonarray\" has invalid return"
		);

		assert.throws(() => {
			container.set("testskeletonnumber", []);
		}, Error, "check type value \"testskeletonnumber\" does not throw an error");

		assert.strictEqual(
			typeof container.set("testskeletonnumber", 1).get("testskeletonnumber"), "number",
			"check type value \"testskeletonnumber\" has invalid return"
		);

		assert.throws(() => {
			container.set("testskeletoninteger", []);
		}, Error, "check type value \"testskeletonnumber\" does not throw an error");

		assert.strictEqual(
			typeof container.set("testskeletoninteger", 1).get("testskeletoninteger"), "number",
			"check type value \"testskeletoninteger\" has invalid return"
		);

		assert.throws(() => {
			container.set("testskeletonfloat", []);
		}, Error, "check type value \"testskeletonnumber\" does not throw an error");

		assert.strictEqual(
			typeof container.set("testskeletonfloat", 1.1).get("testskeletonfloat"), "number",
			"check type value \"testskeletonfloat\" has invalid return"
		);

	});

	describe("set with skeleton", () => {

		before(() => {
			container.clearData();
		});

		after(() => {
			container.clearData();
		});

		describe("array", () => {

			before(() => {
				container.clearData();
			});

			after(() => {
				container.clearData();
			});

			it("should check normal running with array skeleton", () => {

				assert.doesNotThrow(() => {
					container.set("testskeletonarray", []);
				}, Error, "normal running with array skeleton throws an error");

				assert.doesNotThrow(() => {
					container.set("testskeletonarray", [ "test", "test" ]);
				}, Error, "normal running with array skeleton throws an error");

				assert.doesNotThrow(() => {
					container.set("testskeletonarray", "[ \"test\", \"test2\" ]");
				}, Error, "normal running with array skeleton throws an error");

				assert.deepStrictEqual(
					container.get("testskeletonarray"), [ "test", "test2" ],
					"normal running with array has invalid return"
				);

				assert.strictEqual(container.size, 1, "normal running with array has invalid size");

			});

		});

		describe("boolean", () => {

			before(() => {
				container.clearData();
			});

			afterEach(() => {
				container.clearData();
			});

			it("should check normal running with boolean skeleton", () => {

				assert.doesNotThrow(() => {
					container.set("testskeletonboolean", true);
				}, Error, "normal running with boolean skeleton throws an error");

				assert.strictEqual(container.get("testskeletonboolean"), true, "normal running has invalid return");

				assert.doesNotThrow(() => {
					container.set("testskeletonboolean", "true");
				}, Error, "normal running with boolean skeleton throws an error");

				assert.strictEqual(container.get("testskeletonboolean"), true, "normal running has invalid return");

				assert.doesNotThrow(() => {
					container.set("testskeletonboolean", "yes");
				}, Error, "normal running with boolean skeleton throws an error");

				assert.strictEqual(container.get("testskeletonboolean"), true, "normal running has invalid return");

				assert.doesNotThrow(() => {
					container.set("testskeletonboolean", "y");
				}, Error, "normal running with boolean skeleton throws an error");

				assert.strictEqual(container.get("testskeletonboolean"), true, "normal running has invalid return");

				assert.doesNotThrow(() => {
					container.set("testskeletonboolean", "1");
				}, Error, "normal running with boolean skeleton throws an error");

				assert.strictEqual(container.get("testskeletonboolean"), true, "normal running has invalid return");

				assert.doesNotThrow(() => {
					container.set("testskeletonboolean", 1);
				}, Error, "normal running with boolean skeleton throws an error");

				assert.strictEqual(container.get("testskeletonboolean"), true, "normal running has invalid return");

				assert.doesNotThrow(() => {
					container.set("testskeletonboolean", false);
				}, Error, "normal running with boolean skeleton throws an error");

				assert.strictEqual(container.get("testskeletonboolean"), false, "normal running has invalid return");

				assert.doesNotThrow(() => {
					container.set("testskeletonboolean", "false");
				}, Error, "normal running with boolean skeleton throws an error");

				assert.strictEqual(container.get("testskeletonboolean"), false, "normal running has invalid return");

				assert.doesNotThrow(() => {
					container.set("testskeletonboolean", "no");
				}, Error, "normal running with boolean skeleton throws an error");

				assert.strictEqual(container.get("testskeletonboolean"), false, "normal running has invalid return");

				assert.doesNotThrow(() => {
					container.set("testskeletonboolean", "n");
				}, Error, "normal running with boolean skeleton throws an error");

				assert.strictEqual(container.get("testskeletonboolean"), false, "normal running has invalid return");

				assert.doesNotThrow(() => {
					container.set("testskeletonboolean", "0");
				}, Error, "normal running with boolean skeleton throws an error");

				assert.strictEqual(container.get("testskeletonboolean"), false, "normal running has invalid return");

				assert.doesNotThrow(() => {
					container.set("testskeletonboolean", 0);
				}, Error, "normal running with boolean skeleton throws an error");

				assert.strictEqual(container.get("testskeletonboolean"), false, "normal running has invalid return");

				assert.strictEqual(container.size, 1, "normal running has invalid return");

			});

			it("should check normal running with recursive boolean skeleton", () => {

				assert.doesNotThrow(() => {
					container.set("testskeletonbooleans.recursive", "y");
				}, Error, "normal running with recursive boolean skeleton throws an error");

				assert.strictEqual(
					container.get("testskeletonbooleans.recursive"), true,
					"normal running with recursive boolean skeleton has invalid return"
				);

				assert.doesNotThrow(() => {
					container.set("testskeletonbooleans", { "recursive": "y" });
				}, Error, "normal running with recursive boolean skeleton throws an error");

				assert.strictEqual(
					container.get("testskeletonbooleans").recursive, true,
					"normal running with recursive boolean skeleton has invalid return"
				);

				assert.strictEqual(container.size, 1, "normal running with recursive boolean skeleton has invalid return");

			});

			it("should check normal running with limited boolean skeleton", () => {

				assert.doesNotThrow(() => {
					container.limit("testskeletonboolean", [ true, false ]).set("testskeletonboolean", true);
				}, Error, "normal running with limited boolean skeleton throws an error");

				assert.strictEqual(container.get("testskeletonboolean"), true, "normal running with limited boolean skeleton has invalid return");

				assert.throws(() => {
					container.limit("testskeletonboolean", [ true, false ]).set("testskeletonboolean", "y");
				}, Error, "normal running with limited boolean skeleton does not throws an error");

				assert.strictEqual(container.get("testskeletonboolean"), true, "normal running with limited boolean skeleton has invalid return");

				assert.strictEqual(container.size, 1, "normal running with limited boolean skeleton has invalid return");

			});

			it("should check normal running with limited recursive boolean skeleton", () => {

				assert.doesNotThrow(() => {
					container.limit("testskeletonbooleans.recursive", [ true, false ]);
				}, Error, "normal running with limited recursive boolean skeleton throws an error");

				// check key recursivity
				assert.throws(() => {
					container.set("testskeletonbooleans.recursive", "y");
				}, Error, "normal running with limited recursive boolean skeleton does not throw an error");

				assert.doesNotThrow(() => {
					container.set("testskeletonbooleans.recursive", true);
				}, Error, "normal running with limited recursive boolean skeleton throws an error");

				assert.strictEqual(
					container.get("testskeletonbooleans.recursive"), true,
					"normal running with limited recursive boolean skeleton return"
				);

				// check content recursivity
				assert.throws(() => {
					container.set("testskeletonbooleans", { "recursive": "y" });
				}, Error, "normal running with limited recursive boolean skeleton does not throw an error");

				assert.doesNotThrow(() => {
					container.set("testskeletonbooleans", { "recursive": true });
				}, Error, "normal running with limited recursive boolean skeleton throws an error");

				assert.strictEqual(
					container.get("testskeletonbooleans").recursive, true,
					"normal running with limited recursive boolean skeleton has invalid return");

				assert.strictEqual(container.size, 1, "normal running with limited recursive boolean skeleton has invalid return");

			});

		});

		describe("email", () => {

			before(() => {
				container.clearData();
			});

			after(() => {
				container.clearData();
			});

			it("should check normal running with skeleton", () => {

				assert.doesNotThrow(() => {
					container.set("testskeletonemail", "");
				}, Error, "empty running with skeleton throws an error");

				assert.throws(() => {
					container.set("testskeletonemail", 5);
				}, Error, "wrong running with skeleton does not throw an error");

				assert.throws(() => {
					container.set("testskeletonemail", "test");
				}, Error, "wrong running with skeleton does not throw an error");

				assert.doesNotThrow(() => {
					container.set("testskeletonemail", "myaddress@provider.com");
				}, Error, "normal running with skeleton throws an error");

				assert.strictEqual(container.get("testskeletonemail"), "myaddress@provider.com", "normal running has invalid return");

				assert.strictEqual(container.size, 1, "normal running has invalid return");

			});

		});

		describe("ipv4", () => {

			before(() => {
				container.clearData();
			});

			after(() => {
				container.clearData();
			});

			it("should check normal running with skeleton", () => {

				assert.doesNotThrow(() => {
					container.set("testskeletonipv4", "");
				}, Error, "empty running with skeleton throws an error");

				assert.throws(() => {
					container.set("testskeletonipv4", 5);
				}, Error, "wrong running with skeleton does not throw an error");

				assert.throws(() => {
					container.set("testskeletonipv4", "10.10");
				}, Error, "wrong running with skeleton does not throw an error");

				assert.doesNotThrow(() => {
					container.set("testskeletonipv4", "212.212.100.110");
				}, Error, "normal running with skeleton throws an error");

				assert.strictEqual(container.get("testskeletonipv4"), "212.212.100.110", "normal running has invalid return");

				assert.strictEqual(container.size, 1, "normal running has invalid return");

			});

		});

		describe("ipv6", () => {

			before(() => {
				container.clearData();
			});

			after(() => {
				container.clearData();
			});

			it("should check normal running with skeleton", () => {

				assert.doesNotThrow(() => {
					container.set("testskeletonipv6", "");
				}, Error, "empty running with skeleton throws an error");

				assert.throws(() => {
					container.set("testskeletonipv6", 5);
				}, Error, "wrong running with skeleton does not throw an error");

				assert.throws(() => {
					container.set("testskeletonipv6", "10.10");
				}, Error, "wrong running with skeleton does not throw an error");

				assert.doesNotThrow(() => {
					container.set("testskeletonipv6", "0000:0000:0000:0000:0000:0000:0000:0001");
				}, Error, "normal running with skeleton throws an error");

				assert.strictEqual(container.get("testskeletonipv6"), "0000:0000:0000:0000:0000:0000:0000:0001", "normal running has invalid return");

				assert.strictEqual(container.size, 1, "normal running has invalid return");

			});

		});

		describe("number", () => {

			before(() => {
				container.clearData();
			});

			afterEach(() => {
				container.clearData();
			});

			it("should check normal running with number skeleton", () => {

				assert.doesNotThrow(() => {
					container.set("testskeletonnumber", 5.5);
				}, Error, "normal running with number skeleton throws an error");

				assert.doesNotThrow(() => {
					container.set("testskeletonnumber", "5.5");
				}, Error, "normal running with number skeleton throws an error");

				assert.strictEqual(container.get("testskeletonnumber"), 5.5, "normal running with number has invalid return");

				assert.strictEqual(container.size, 1, "normal running with number has invalid size");

			});

			it("should check normal running with float skeleton", () => {

				assert.doesNotThrow(() => {
					container.set("testskeletonfloat", 5.5);
				}, Error, "normal running with float skeleton throws an error");

				assert.doesNotThrow(() => {
					container.set("testskeletonfloat", "5.5");
				}, Error, "normal running with float skeleton throws an error");

				assert.strictEqual(container.get("testskeletonfloat"), 5.5, "normal running with float has invalid return");

				assert.strictEqual(container.size, 1, "normal running with float has invalid size");

			});

			it("should check normal running with integer skeleton", () => {

				assert.doesNotThrow(() => {
					container.set("testskeletoninteger", 5);
				}, Error, "normal running with integer skeleton throws an error");

				assert.doesNotThrow(() => {
					container.set("testskeletoninteger", "5");
				}, Error, "normal running with integer skeleton throws an error");

				assert.strictEqual(container.get("testskeletoninteger"), 5, "normal running with integer has invalid return");

				assert.strictEqual(container.size, 1, "normal running with integer has invalid size");

			});

		});

		describe("object", () => {

			before(() => {
				container.clearData();
			});

			afterEach(() => {
				container.clearData();
			});

			it("should check running with wrong data", () => {

				assert.throws(() => {
					container.set("testskeletonobject", "test");
				}, Error, "check type value does not throw an error");

				assert.throws(() => {
					container.set("testskeletonobject", "{ \"test\" ");
				}, Error, "check type value does not throw an error");

				assert.throws(() => {
					container.set("testskeletonobject", "\"test\" }");
				}, Error, "check type value does not throw an error");

			});

			it("should check normal running with object skeleton", () => {

				assert.doesNotThrow(() => {
					container.set("testskeletonobject", {});
				}, Error, "normal running with object skeleton throws an error");

				assert.doesNotThrow(() => {
					container.set("testskeletonobject", {
						"test": "test"
					});
				}, Error, "normal running with object skeleton throws an error");

				assert.doesNotThrow(() => {
					container.set("testskeletonobject", "{ \"test\": \"test\" }");
				}, Error, "normal running with object skeleton throws an error");

				assert.deepStrictEqual(container.get("testskeletonobject"), {
					"test": "test"
				}, "normal running with object skeleton has invalid return");

				assert.strictEqual(container.size, 1, "normal running with object skeleton has invalid size");

			});

		});

		describe("string", () => {

			before(() => {
				container.clearData();
			});

			after(() => {
				container.clearData();
			});

			it("should check normal running with skeleton", () => {

				assert.doesNotThrow(() => {
					container.set("testskeletonstring", "");
				}, Error, "empty running with skeleton throws an error");

				assert.doesNotThrow(() => {
					container.set("testskeletonstring", 5);
				}, Error, "numeric running with skeleton throws an error");

				assert.doesNotThrow(() => {
					container.set("testskeletonstring", "5");
				}, Error, "normal running with skeleton throws an error");

				assert.strictEqual(container.get("testskeletonstring"), "5", "normal running has invalid return");

				assert.strictEqual(container.size, 1, "normal running has invalid return");

			});

		});

	});

});
