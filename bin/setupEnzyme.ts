// The latest version of Enzyme (upgrade from 2 to 3) has some breaking
// changes.  They now use an adapter approach for different versions
// of react.
//
// https://github.com/airbnb/enzyme/blob/master/docs/guides/migration-from-2-to-3.md
//
// We now must load an adapter before each test.  This shim is used during
// jest configurtion to load the adapter before each test in package.json
//
// ...
// "setupFiles": [
//     "<rootDir>/bin/setupEnzyme.js"
// ],
// ...
//

process.env["NODE_ENV"] = "test";

const debug = require("debug")("setupEnzyme");
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

debug("Enzyme: %O, Adapter: %O", Enzyme, Adapter);

Enzyme.configure({
	adapter: new Adapter()
});
