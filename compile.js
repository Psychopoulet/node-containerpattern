"use strict";

// deps

	// natives
	const { join } = require("path");
	const { exec } = require("child_process");

	// externals
	const { remove } = require("fs-extra");

// consts

	const ARGS = [ ...process.argv.slice(2, process.argv.length) ];

// module

Promise.resolve().then(() => {

	return ARGS.includes("--module") ? Promise.resolve() : Promise.reject(new ReferenceError("Missing --module parameter"));

}).then(() => {

	const foundAt = ARGS.findIndex((a) => {
		return "--module" === a;
	});

	return foundAt + 1 < ARGS.length ?
		Promise.resolve(ARGS[foundAt + 1].toLowerCase()) :
		Promise.reject(new ReferenceError("Missing --module value"));

}).then((moduleValue) => {

	switch (moduleValue) {

		case "commonjs":

			return Promise.resolve({
				"name": moduleValue,
				"directory": "commonjs",
				"extensionJS": "cjs",
				"extensionTS": "cts"
			});

		case "es2022":

			return Promise.resolve({
				"name": moduleValue,
				"directory": "esm",
				"extensionJS": "mjs",
				"extensionTS": "mts"
			});

		default:

			return Promise.reject(new RangeError(
				"--module value \"" + moduleValue + "\" is not allowed. Only [ \"commonjs\", \"es2022\" ] values are allowed"
			));

	}

}).then((m) => {

	return remove(join(__dirname, "lib", m.directory)).then(() => {
		return Promise.resolve(m);
	});

}).then((m) => {

	return new Promise((resolve, reject) => {

		exec([

			"npx tsc", // command
			"\"" + join(__dirname, "src", "main." + m.extensionTS) + "\"", // input file

			"--alwaysStrict --strict", // generic stric commands
			"--target es6", // force current gen type files

			"--declaration --declarationDir \"" + join(__dirname, "lib", m.directory) + "\"", // declaration file

			"--module " + m.name, // specify wanted module
			"--outDir \"" + join(__dirname, "lib", m.directory) + "\"", // specify module directory

			"--downlevelIteration" // specific to this module

		].join(" "), (err, stderr) => {
			return err ? reject(new Error(err + "\n" + stderr)) : resolve(m);
		});

	});

}).catch((err) => {

	(0, console).error(err);

	(0, process).exitCode = 1;
	(0, process).exit(1);

});
