/**
 * Copies all information from the "bundler" section of the package
 * This is a helper module used by the build process to copy all of the
 * type files into the output distribution.
 */

const copyfiles = require("copyfiles");
const fs = require("fs-extra");
const mkdirp = require("mkdirp");
const pkg = require("../package.json");

// Creates the base distribution directory if it doesn't exist
mkdirp(pkg.bundler.dst);

const exclude = pkg.bundler.exclude;
const paths = pkg.bundler.src;
paths.push(pkg.bundler.dst);

// Copy all of the *.d.ts files to ./dist
copyfiles(paths, {exclude}, () => {});

for (const {src, dst} of pkg.bundler.files) {
	fs.copyFileSync(`${src}`, `${pkg.bundler.dst}/${dst}`);
}
