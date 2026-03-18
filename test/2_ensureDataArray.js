// deps

    // natives
    const { strictEqual, deepStrictEqual } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const ensureDataArray = require(join(__dirname, "..", "lib", "cjs", "utils", "ensureDataArray.js")).default;

// tests

describe("ensureDataArray", () => {

    it("should check array", () => {

        strictEqual(ensureDataArray("test", "string", "test"), "test", "checked data is invalid");

        deepStrictEqual(ensureDataArray("test", "array", [
            1,
            2,
            3
        ]), [
            1,
            2,
            3
        ], "checked data is invalid");

        deepStrictEqual(ensureDataArray("test", "array", "[ 1, 2, 3 ]"), [
            1,
            2,
            3
        ], "checked data is invalid");

    });

});
