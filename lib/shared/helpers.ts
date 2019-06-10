import {isNode} from "util.toolbox";

const debug = require("debug")("gadgets.shared.helpers");
const pkg = require("../../package.json");

/**
 * Takes a variable name and an object and places that name and associated
 * object into the global node space.  If the object is already in the
 * global space, then that reference is used and returned.  The replace
 * flag is used to override the current global reference.
 * @param name {string} the name of the variable to store globally
 * @param pkg {object} the object associated with the variable name
 * @param replace {boolean} if true, then it will always overwrite the
 * current global (if it exists)
 * @return {object} the global instance reference
 */
export function globalize(
	name: string,
	pkgname: any,
	replace: boolean = false
) {
	let ref: any = pkgname;
	if (!(global as any)[name] || replace) {
		(window as any)[name] = (global as any)[name] = pkgname;
		debug("Adding global variable %o -> %O", name, (global as any)[name]);
	} else {
		ref = (global as any)[name];
	}

	return ref;
}

/**
 * Checks the environment for the debug flag environment variable.  If it is
 * defined, then it will resolve to true.  If it doesn't, exists, then the
 * package.json debug flag is checked.  If it exists it is returned as the
 * debug flag.  If it doesn't exist, then false is returned and debugging
 * is turned off.
 *
 * The name of the environment variable for debugging is DEBUG_GADGETS if
 * in a node environment.
 * @return true if debugging is turned on, otherwise false.
 */
export function isDebug(): boolean {
	if (isNode() && "DEBUG_GADGETS" in process.env) {
		return true;
	}

	if (pkg.debug) {
		return pkg.debug;
	}

	return false;
}
