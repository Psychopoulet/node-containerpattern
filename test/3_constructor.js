// deps

    // natives
    const { strictEqual } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const Container = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// tests

describe("constructor", () => {

    it("should check no parameter", () => {
        const container = new Container();
        strictEqual(container.recursionSeparator, ".", "_recursionSeparator data is invalid");
    });

    it("should check wrong parameter", () => {
        const container = new Container(false);
        strictEqual(container.recursionSeparator, ".", "_recursionSeparator data is invalid");
    });

    it("should check wrong parameter", () => {
        const container = new Container("test");
        strictEqual(container.recursionSeparator, "test", "_recursionSeparator data is invalid");
    });

});
