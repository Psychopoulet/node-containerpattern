/*
	eslint max-lines: 0
*/

"use strict";

// deps

	// natives
	const { strictEqual, deepStrictEqual, throws, doesNotThrow } = require("assert");
	const { join } = require("path");

	// locals
	const Container = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// private

	const container = new Container(".");

// tests

describe("set", () => {

	it("should check normal running for skeletons", () => {

		doesNotThrow(() => {

			container.clear();

			container
				.skeleton("testskeletonarray", "array")
				.skeleton("testskeletonboolean", "boolean")
				.skeleton("testskeletoncolor", "color")
				.skeleton("testskeletonemail", "email")
				.skeleton("testskeletonfloat", "float")
				.skeleton("testskeletoninteger", "integer")
				.skeleton("testskeletonipv4", "ipv4")
				.skeleton("testskeletonipv6", "ipv6")
				.skeleton("testskeletonurl", "url")
				.skeleton("testskeletonserial", "serial")
				.skeleton("testskeletonobject", "object")
				.skeleton("testskeletonbooleans", "object")
					.skeleton("testskeletonbooleans.recursive", "boolean")
				.skeleton("testskeletonstring", "string");

		}, Error, "check right skeletons throws an error");

		throws(() => {
			container.skeleton("test", "test");
		}, Error, "check wrong skeleton does not throw an error");

	});

	it("should check wrong data", () => {

		throws(() => {
			container.set("");
		}, Error, "check type value does not throw an error");

		throws(() => {
			container.set("test");
		}, Error, "check type value does not throw an error");

	});

	it("should check normal running", () => {

		strictEqual(container.clearData().size, 0, "normal running has invalid size");
		strictEqual(container.set("test", "test") instanceof Container, true, "normal running has invalid return");
		strictEqual(container.size, 1, "normal running has invalid size");
		strictEqual(container.clearData().size, 0, "normal running has invalid size");

	});

	it("should check normal recursive running", () => {

		strictEqual(container.clearData().size, 0, "normal recursive running has invalid size");

		strictEqual(
			container.set("usr.login", "login") instanceof Container, true,
			"normal recursive running has invalid return (set login)"
		);

		deepStrictEqual(container.get("usr"), {
			"login": "login"
		}, "normal recursive running has invalid return (get 1)");

		strictEqual(
			true, container.set("usr.password", "password") instanceof Container,
			"normal recursive running has invalid return (set password)"
		);

		deepStrictEqual(container.get("usr"), {
			"login": "login",
			"password": "password"
		}, "normal recursive running has invalid return (get 2)");

		strictEqual(container.set("usr.mail", {
			"email": "test@test.com",
			"password": "password"
		}) instanceof Container, true, "normal recursive running has invalid return (set mail)");

		deepStrictEqual(container.get("usr"), {
			"login": "login",
			"password": "password",
			"mail": {
				"email": "test@test.com",
				"password": "password"
			}
		}, "normal recursive running has invalid return (get 3)");

		strictEqual(1, container.size, "normal recursive running has invalid size");

	});

	it("should check type value", () => {

		throws(() => {
			container.set(false);
		}, Error, "check type value does not throw an error");

		throws(() => {
			container.set("");
		}, Error, "check type value does not throw an error");

		throws(() => {
			container.set("test");
		}, Error, "check type value does not throw an error");

		throws(() => {
			container.set("testskeletonarray", "test");
		}, Error, "check type value of \"testskeletonarray\" => test does not throw an error");

		throws(() => {
			container.set("testskeletonarray", "[\"test\", \"test2]");
		}, Error, "check type value \"testskeletonarray\" => [\"test\", \"test2] does not throw an error");

		strictEqual(
			container.set("testskeletonarray", []).get("testskeletonarray") instanceof Array, true,
			"check type value \"testskeletonarray\" has invalid return"
		);

		throws(() => {
			container.set("testskeletoninteger", []);
		}, Error, "check type value \"testskeletoninteger\" does not throw an error");

		strictEqual(
			typeof container.set("testskeletoninteger", 1).get("testskeletoninteger"), "number",
			"check type value \"testskeletoninteger\" has invalid return"
		);

		throws(() => {
			container.set("testskeletonfloat", []);
		}, Error, "check type value \"testskeletonfloat\" does not throw an error");

		strictEqual(
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

				doesNotThrow(() => {
					container.set("testskeletonarray", []);
				}, Error, "normal running with array skeleton throws an error");

				doesNotThrow(() => {
					container.set("testskeletonarray", [ "test", "test" ]);
				}, Error, "normal running with array skeleton throws an error");

				doesNotThrow(() => {
					container.set("testskeletonarray", "[ \"test\", \"test2\" ]");
				}, Error, "normal running with array skeleton throws an error");

				deepStrictEqual(
					container.get("testskeletonarray"), [ "test", "test2" ],
					"normal running with array has invalid return"
				);

				strictEqual(container.size, 1, "normal running with array has invalid size");

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

				doesNotThrow(() => {
					container.set("testskeletonboolean", true);
				}, Error, "normal running with boolean skeleton throws an error");

				strictEqual(container.get("testskeletonboolean"), true, "normal running has invalid return");

				doesNotThrow(() => {
					container.set("testskeletonboolean", "true");
				}, Error, "normal running with boolean skeleton throws an error");

				strictEqual(container.get("testskeletonboolean"), true, "normal running has invalid return");

				doesNotThrow(() => {
					container.set("testskeletonboolean", "yes");
				}, Error, "normal running with boolean skeleton throws an error");

				strictEqual(container.get("testskeletonboolean"), true, "normal running has invalid return");

				doesNotThrow(() => {
					container.set("testskeletonboolean", "y");
				}, Error, "normal running with boolean skeleton throws an error");

				strictEqual(container.get("testskeletonboolean"), true, "normal running has invalid return");

				doesNotThrow(() => {
					container.set("testskeletonboolean", "1");
				}, Error, "normal running with boolean skeleton throws an error");

				strictEqual(container.get("testskeletonboolean"), true, "normal running has invalid return");

				doesNotThrow(() => {
					container.set("testskeletonboolean", 1);
				}, Error, "normal running with boolean skeleton throws an error");

				strictEqual(container.get("testskeletonboolean"), true, "normal running has invalid return");

				doesNotThrow(() => {
					container.set("testskeletonboolean", false);
				}, Error, "normal running with boolean skeleton throws an error");

				strictEqual(container.get("testskeletonboolean"), false, "normal running has invalid return");

				doesNotThrow(() => {
					container.set("testskeletonboolean", "false");
				}, Error, "normal running with boolean skeleton throws an error");

				strictEqual(container.get("testskeletonboolean"), false, "normal running has invalid return");

				doesNotThrow(() => {
					container.set("testskeletonboolean", "no");
				}, Error, "normal running with boolean skeleton throws an error");

				strictEqual(container.get("testskeletonboolean"), false, "normal running has invalid return");

				doesNotThrow(() => {
					container.set("testskeletonboolean", "n");
				}, Error, "normal running with boolean skeleton throws an error");

				strictEqual(container.get("testskeletonboolean"), false, "normal running has invalid return");

				doesNotThrow(() => {
					container.set("testskeletonboolean", "0");
				}, Error, "normal running with boolean skeleton throws an error");

				strictEqual(container.get("testskeletonboolean"), false, "normal running has invalid return");

				doesNotThrow(() => {
					container.set("testskeletonboolean", 0);
				}, Error, "normal running with boolean skeleton throws an error");

				strictEqual(container.get("testskeletonboolean"), false, "normal running has invalid return");

				strictEqual(container.size, 1, "normal running has invalid return");

			});

			it("should check normal running with recursive boolean skeleton", () => {

				doesNotThrow(() => {
					container.set("testskeletonbooleans.recursive", "y");
				}, Error, "normal running with recursive boolean skeleton throws an error");

				strictEqual(
					container.get("testskeletonbooleans.recursive"), true,
					"normal running with recursive boolean skeleton has invalid return"
				);

				doesNotThrow(() => {
					container.set("testskeletonbooleans", { "recursive": "y" });
				}, Error, "normal running with recursive boolean skeleton throws an error");

				strictEqual(
					container.get("testskeletonbooleans").recursive, true,
					"normal running with recursive boolean skeleton has invalid return"
				);

				strictEqual(container.size, 1, "normal running with recursive boolean skeleton has invalid return");

			});

			it("should check normal running with limited boolean skeleton", () => {

				doesNotThrow(() => {
					container.limit("testskeletonboolean", [ true, false ]).set("testskeletonboolean", true);
				}, Error, "normal running with limited boolean skeleton throws an error");

				strictEqual(container.get("testskeletonboolean"), true, "normal running with limited boolean skeleton has invalid return");

				throws(() => {
					container.limit("testskeletonboolean", [ true, false ]).set("testskeletonboolean", "y");
				}, Error, "normal running with limited boolean skeleton does not throws an error");

				strictEqual(container.get("testskeletonboolean"), true, "normal running with limited boolean skeleton has invalid return");

				strictEqual(container.size, 1, "normal running with limited boolean skeleton has invalid return");

			});

			it("should check normal running with limited recursive boolean skeleton", () => {

				doesNotThrow(() => {
					container.limit("testskeletonbooleans.recursive", [ true, false ]);
				}, Error, "normal running with limited recursive boolean skeleton throws an error");

				// check key recursivity
				throws(() => {
					container.set("testskeletonbooleans.recursive", "y");
				}, Error, "normal running with limited recursive boolean skeleton does not throw an error");

				doesNotThrow(() => {
					container.set("testskeletonbooleans.recursive", true);
				}, Error, "normal running with limited recursive boolean skeleton throws an error");

				strictEqual(
					container.get("testskeletonbooleans.recursive"), true,
					"normal running with limited recursive boolean skeleton return"
				);

				// check content recursivity
				throws(() => {
					container.set("testskeletonbooleans", { "recursive": "y" });
				}, Error, "normal running with limited recursive boolean skeleton does not throw an error");

				doesNotThrow(() => {
					container.set("testskeletonbooleans", { "recursive": true });
				}, Error, "normal running with limited recursive boolean skeleton throws an error");

				strictEqual(
					container.get("testskeletonbooleans").recursive, true,
					"normal running with limited recursive boolean skeleton has invalid return");

				strictEqual(container.size, 1, "normal running with limited recursive boolean skeleton has invalid return");

			});

		});

		describe("color", () => {

			before(() => {
				container.clearData();
			});

			after(() => {
				container.clearData();
			});

			it("should check normal running with skeleton", () => {

				doesNotThrow(() => {
					container.set("testskeletoncolor", "");
				}, Error, "empty running with skeleton throws an error");

				throws(() => {
					container.set("testskeletoncolor", 5);
				}, Error, "wrong running with skeleton does not throw an error");

				throws(() => {
					container.set("testskeletoncolor", "test");
				}, Error, "wrong running with skeleton does not throw an error");

				doesNotThrow(() => {
					container.set("testskeletoncolor", "#ffffff");
				}, Error, "normal running with skeleton throws an error");

				strictEqual(container.get("testskeletoncolor"), "#ffffff", "normal running has invalid return");

				strictEqual(container.size, 1, "normal running has invalid return");

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

				doesNotThrow(() => {
					container.set("testskeletonemail", "");
				}, Error, "empty running with skeleton throws an error");

				throws(() => {
					container.set("testskeletonemail", 5);
				}, Error, "wrong running with skeleton does not throw an error");

				throws(() => {
					container.set("testskeletonemail", "test");
				}, Error, "wrong running with skeleton does not throw an error");

				doesNotThrow(() => {
					container.set("testskeletonemail", "myaddress@provider.com");
				}, Error, "normal running with skeleton throws an error");

				strictEqual(container.get("testskeletonemail"), "myaddress@provider.com", "normal running has invalid return");

				strictEqual(container.size, 1, "normal running has invalid return");

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

				doesNotThrow(() => {
					container.set("testskeletonipv4", "");
				}, Error, "empty running with skeleton throws an error");

				throws(() => {
					container.set("testskeletonipv4", 5);
				}, Error, "wrong running with skeleton does not throw an error");

				throws(() => {
					container.set("testskeletonipv4", "10.10");
				}, Error, "wrong running with skeleton does not throw an error");

				doesNotThrow(() => {
					container.set("testskeletonipv4", "212.212.100.110");
				}, Error, "normal running with skeleton throws an error");

				strictEqual(container.get("testskeletonipv4"), "212.212.100.110", "normal running has invalid return");

				strictEqual(container.size, 1, "normal running has invalid return");

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

				doesNotThrow(() => {
					container.set("testskeletonipv6", "");
				}, Error, "empty running with skeleton throws an error");

				throws(() => {
					container.set("testskeletonipv6", 5);
				}, Error, "wrong running with skeleton does not throw an error");

				throws(() => {
					container.set("testskeletonipv6", "10.10");
				}, Error, "wrong running with skeleton does not throw an error");

				doesNotThrow(() => {
					container.set("testskeletonipv6", "0000:0000:0000:0000:0000:0000:0000:0001");
				}, Error, "normal running with skeleton throws an error");

				strictEqual(container.get("testskeletonipv6"), "0000:0000:0000:0000:0000:0000:0000:0001", "normal running has invalid return");

				strictEqual(container.size, 1, "normal running has invalid return");

			});

		});

		describe("url", () => {

			before(() => {
				container.clearData();
			});

			after(() => {
				container.clearData();
			});

			it("should check normal running with skeleton", () => {

				doesNotThrow(() => {
					container.set("testskeletonurl", "");
				}, Error, "empty running with skeleton throws an error");

				throws(() => {
					container.set("testskeletonurl", 5);
				}, Error, "wrong running with skeleton does not throw an error");

				throws(() => {
					container.set("testskeletonurl", "test");
				}, Error, "wrong running with skeleton does not throw an error");

				doesNotThrow(() => {
					container.set("testskeletonurl", "http://localhost:8080");
				}, Error, "normal running with skeleton throws an error");

				strictEqual(container.get("testskeletonurl"), "http://localhost:8080", "normal running has invalid return");

				strictEqual(container.size, 1, "normal running has invalid return");

			});

		});

		describe("serial", () => {

			before(() => {
				container.clearData();
			});

			after(() => {
				container.clearData();
			});

			it("should check normal running with skeleton", () => {

				doesNotThrow(() => {
					container.set("testskeletonserial", "");
				}, Error, "empty running with skeleton throws an error");

				throws(() => {
					container.set("testskeletonserial", 5);
				}, Error, "wrong running with skeleton does not throw an error");

				throws(() => {
					container.set("testskeletonserial", "test");
				}, Error, "wrong running with skeleton does not throw an error");

				doesNotThrow(() => {
					container.set("testskeletonserial", "COM1");
				}, Error, "normal running with skeleton throws an error");

				strictEqual(container.get("testskeletonserial"), "COM1", "normal running has invalid return");

				doesNotThrow(() => {
					container.set("testskeletonserial", "/dev/tty-test");
				}, Error, "normal running with skeleton throws an error");

				strictEqual(container.get("testskeletonserial"), "/dev/tty-test", "normal running has invalid return");

				strictEqual(container.size, 1, "normal running has invalid return");

			});

		});

		describe("float", () => {

			before(() => {
				container.clearData();
			});

			afterEach(() => {
				container.clearData();
			});

			it("should check normal running with float skeleton", () => {

				doesNotThrow(() => {
					container.set("testskeletonfloat", 5.5);
				}, Error, "normal running with float skeleton throws an error");

				doesNotThrow(() => {
					container.set("testskeletonfloat", "5.5");
				}, Error, "normal running with float skeleton throws an error");

				strictEqual(container.get("testskeletonfloat"), 5.5, "normal running with float has invalid return");

				strictEqual(container.size, 1, "normal running with float has invalid size");

			});

			it("should check normal running with integer skeleton", () => {

				doesNotThrow(() => {
					container.set("testskeletoninteger", 5);
				}, Error, "normal running with integer skeleton throws an error");

				doesNotThrow(() => {
					container.set("testskeletoninteger", "5");
				}, Error, "normal running with integer skeleton throws an error");

				strictEqual(container.get("testskeletoninteger"), 5, "normal running with integer has invalid return");

				strictEqual(container.size, 1, "normal running with integer has invalid size");

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

				throws(() => {
					container.set("testskeletonobject", "test");
				}, Error, "check type value does not throw an error");

				throws(() => {
					container.set("testskeletonobject", "{ \"test\" ");
				}, Error, "check type value does not throw an error");

				throws(() => {
					container.set("testskeletonobject", "\"test\" }");
				}, Error, "check type value does not throw an error");

			});

			it("should check normal running with object skeleton", () => {

				doesNotThrow(() => {
					container.set("testskeletonobject", {});
				}, Error, "normal running with object skeleton throws an error");

				doesNotThrow(() => {
					container.set("testskeletonobject", {
						"test": "test"
					});
				}, Error, "normal running with object skeleton throws an error");

				doesNotThrow(() => {
					container.set("testskeletonobject", "{ \"test\": \"test\" }");
				}, Error, "normal running with object skeleton throws an error");

				deepStrictEqual(container.get("testskeletonobject"), {
					"test": "test"
				}, "normal running with object skeleton has invalid return");

				strictEqual(container.size, 1, "normal running with object skeleton has invalid size");

			});

			it("should check recursive running", () => {

				doesNotThrow(() => {

					container.set("testrecursiveobject", {
						"recursiveobject": {
							"object1": {
								"object2": "test"
							}
						}
					});

				}, Error, "normal running with object skeleton throws an error");

				strictEqual(container.size, 1, "normal running with object skeleton has invalid size");

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

				doesNotThrow(() => {
					container.set("testskeletonstring", "");
				}, Error, "empty running with skeleton throws an error");

				doesNotThrow(() => {
					container.set("testskeletonstring", 5);
				}, Error, "numeric running with skeleton throws an error");

				doesNotThrow(() => {
					container.set("testskeletonstring", "5");
				}, Error, "normal running with skeleton throws an error");

				strictEqual(container.get("testskeletonstring"), "5", "normal running has invalid return");

				strictEqual(container.size, 1, "normal running has invalid return");

			});

		});

	});

});
