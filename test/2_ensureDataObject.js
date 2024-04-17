// deps

    // natives
    const { strictEqual, deepStrictEqual } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const ensureDataObject = require(join(__dirname, "..", "lib", "cjs", "utils", "ensureDataObject.js")).default;

// tests

describe("ensureDataObject", () => {

    it("should check object", () => {

        strictEqual(ensureDataObject("test", "string", "test"), "test", "checked data is invalid");
        deepStrictEqual(ensureDataObject("test", "object", { "test": "test" }), { "test": "test" }, "checked data is invalid");
        deepStrictEqual(ensureDataObject("test", "object", "{ \"test\": \"test\" }"), { "test": "test" }, "checked data is invalid");

    });

});
