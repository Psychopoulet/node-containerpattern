// deps

    // natives
    const { strictEqual, throws } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const Container = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// private

    const container = new Container();

// tests

describe("meta", () => {

    describe("document", () => {

        before(() => {
            container.clear();
        });

        after(() => {
            container.clear();
        });

        it("should check type value", () => {

            throws(() => {
                container.document();
            }, ReferenceError, "check type value does not throw an error");

            throws(() => {
                container.document(false);
            }, TypeError, "check type value does not throw an error");

            throws(() => {
                container.document("testdocument");
            }, ReferenceError, "check type value does not throw an error");

            throws(() => {
                container.document("testdocument", false);
            }, TypeError, "check type value does not throw an error");

            throws(() => {
                container.document("testdocument", String);
            }, Error, "check type value does not throw an error");

            throws(() => {
                container.document("testdocument", "");
            }, RangeError, "check type value does not throw an error");

        });

        it("should check normal running", () => {

            strictEqual(
                container.document("documentstring", "This is a random string") instanceof Container, true,
                "normal running has invalid return"
            );
        });

    });

    describe("limit", () => {

        before(() => {
            container.clear();
        });

        after(() => {
            container.clear();
        });

        it("should check type value", () => {

            throws(() => {
                container.limit();
            }, ReferenceError, "check type value does not throw an error");

            throws(() => {
                container.limit(false);
            }, TypeError, "check type value does not throw an error");

            throws(() => {
                container.limit("testslimit");
            }, ReferenceError, "check type value does not throw an error");

            throws(() => {
                container.limit("testslimit", String);
            }, TypeError, "check type value does not throw an error");

            throws(() => {
                container.limit("testslimit", "String");
            }, Error, "check type value does not throw an error");

        });

        it("should check normal running", () => {

            strictEqual(container.limit("testslimit", [ "test1", "test2" ]) instanceof Container, true, "normal running has invalid return");

            throws(() => {
                container.set("testslimit", "test");
            }, Error, "check value does not throw an error");

            strictEqual(container.set("testslimit", "test1") instanceof Container, true, "normal running has invalid return");
            strictEqual(container.set("testslimit", "test2") instanceof Container, true, "normal running has invalid return");

        });

        it("should check recursive running", () => {

            strictEqual(
                container.limit("testslimitrecursive.string", [ "test1", "test2" ]) instanceof Container, true,
                "recursive running has invalid return"
            );

            throws(() => {
                container.set("testslimitrecursive.string", "test");
            }, Error, "check value does not throw an error");

            strictEqual(
                container.set("testslimitrecursive.string", "test1") instanceof Container, true,
                "recursive running has invalid return"
            );

            strictEqual(
                container.set("testslimitrecursive.string", "test2") instanceof Container, true,
                "recursive running has invalid return"
            );

            throws(() => {
                container.set("testslimitrecursive", { "string": "test" });
            }, Error, "check value does not throw an error");

            strictEqual(
                container.set("testslimitrecursive", { "string": "test1" }) instanceof Container, true,
                "recursive running has invalid return"
            );

            strictEqual(
                container.set("testslimitrecursive", { "string": "test2" }) instanceof Container, true,
                "recursive running has invalid return"
            );

        });

        it("should check normal recursive array running", () => {

            container.clear();
            container.set("module.authors", [ "Sébastien VIDAL" ]);

            strictEqual(
                container.limit("module.authors.0", [ "Sébastien VIDAL" ]) instanceof Container, true,
                "normal recursive array running has invalid return"
            );

            throws(() => {
                container.set("module.authors.0", 5);
            }, Error, "normal recursive array running does not throw an error");

        });

    });

    describe("skeleton", () => {

        before(() => {
            container.clear();
        });

        after(() => {
            container.clear();
        });

        it("should check type value", () => {

            throws(() => {
                container.skeleton();
            }, ReferenceError, "check type value does not throw an error");

            throws(() => {
                container.skeleton(false);
            }, TypeError, "check type value does not throw an error");

            throws(() => {
                container.skeleton("testskeleton");
            }, ReferenceError, "check type value does not throw an error");

            throws(() => {
                container.skeleton("testskeleton", String);
            }, TypeError, "check type value does not throw an error");

            throws(() => {
                container.skeleton("testskeleton", "");
            }, RangeError, "check type value does not throw an error");

        });

        it("should check normal running", () => {
            strictEqual(container.skeleton("testskeletonarray", "Array") instanceof Container, true, "normal running has invalid return");
            strictEqual(container.skeleton("testskeletonarray", "array") instanceof Container, true, "normal running has invalid return");
            strictEqual(container.skeleton("testskeletoncolor", "color") instanceof Container, true, "normal running has invalid return");
            strictEqual(container.skeleton("testskeletonboolean", "boolean") instanceof Container, true, "normal running has invalid return");
            strictEqual(container.skeleton("testskeletonemail", "email") instanceof Container, true, "normal running has invalid return");
            strictEqual(container.skeleton("testskeletonfloat", "float") instanceof Container, true, "normal running has invalid return");
            strictEqual(container.skeleton("testskeletoninteger", "integer") instanceof Container, true, "normal running has invalid return");
            strictEqual(container.skeleton("testskeletonipv4", "ipv4") instanceof Container, true, "normal running has invalid return");
            strictEqual(container.skeleton("testskeletonipv6", "ipv6") instanceof Container, true, "normal running has invalid return");
            strictEqual(container.skeleton("testskeletonobject", "object") instanceof Container, true, "normal running has invalid return");
            strictEqual(container.skeleton("testskeletonstring", "string") instanceof Container, true, "normal running has invalid return");
            strictEqual(container.skeleton("testskeletonurl", "url") instanceof Container, true, "normal running has invalid return");
            strictEqual(container.skeleton("testskeletonserial", "serial") instanceof Container, true, "normal running has invalid return");
        });

        it("should check normal recursive running", () => {

            strictEqual(
                container.skeleton("testskeletonrecursive.test", "string") instanceof Container, true,
                "normal running has invalid return"
            );

        });

        it("should check normal recursive array running", () => {

            container.clear();
            container.set("module.versions", [ 1 ]);

            strictEqual(
                container.skeleton("module.versions.0", "integer") instanceof Container, true,
                "normal recursive array running has invalid return"
            );

            throws(() => {
                container.set("module.versions.0", "one");
            }, Error, "normal recursive array running does not throw an error");

        });

    });

});
