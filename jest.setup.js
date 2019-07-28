//
// To turn on debugging output for jest, edit the package.json file and
// set the "debug" property to true.  If this is false, then the output
// is suppressed.
//

const pkg = require("./package.json");

let debugEnv = "";
if ("DEBUG" in process.env) {
	debugEnv = `${process.env["DEBUG"]},`;
}

process.env["DEBUG"] = pkg.debug ? `${debugEnv}gadgets.test.*` : "";
