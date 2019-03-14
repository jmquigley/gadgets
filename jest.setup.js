const pkg = require("./package.json");
process.env["DEBUG"] = pkg.debug ? "*" : "";
