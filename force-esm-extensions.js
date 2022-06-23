"use strict";

// deps

	// natives
	const { join } = require("path");

	// externals
	const { readdir, rename, lstat } = require("fs-extra");

// consts

	const ESM_DIR = join(__dirname, "lib", "esm");

// private

	// methods

	/**
	 * @param {string} dir: is file directory ?
	 * @returns {Promise<boolean>} operation result
	 */
	function _isDirectory (dir) {

		return new Promise((resolve) => {

			lstat(dir, (err, stats) => {
				return resolve(Boolean(!err && stats.isDirectory()));
			});

		});

	}

	/**
	 * @param {string} dir: concerned directory
	 * @returns {Promise<void>} operation result
	 */
	function _renameDirContent (dir) {

		return readdir(dir).then((content) => {

			return Promise.all(content.map((file) => {

				const FILE = join(dir, file);

				return _isDirectory(FILE).then((isDir) => {

					if (isDir) {
						return _renameDirContent(FILE);
					}
					else if (file.endsWith(".js")) {
						return rename(FILE, FILE.replace(".js", ".mjs"));
					}
					else if (file.endsWith(".d.ts")) {
						return rename(FILE, FILE.replace(".d.ts", ".d.mts"));
					}
					else {
						return Promise.resolve();
					}

				});

			}));

		});

	}

// module

_isDirectory(ESM_DIR).then((isDir) => {
	return isDir ? _renameDirContent(ESM_DIR) : Promise.reject(new ReferenceError("This directory does not exists"));
}).catch((err) => {

	(0, console).error(err);

	(0, process).exitCode = 1;
	(0, process).exit(1);

});
