'use strict';

const debugEntry = require('debug');
const pkg = require('../../package.json');

/**
 * A wrapper for the debug function.  It uses the package.json to enable or
 * disable debugging information in the library.  It also turns off
 * coverage checks for this function.
 * @param context {string} the name of the module where this debug request
 * is made.
 * @param args {object[]} the list of arguments passed to the the debug
 * function.
 */
export function debug(context: string, ...args: any[]) {
	/* istanbul ignore if  */
	if (pkg.debug) {
		const debugFn = debugEntry(`Gadgets -> ${context}`);
		debugFn(...args);
	}
}

/**
 * Takes a variable name and an object and places that name and associated
 * object into the global node space.  If the object is alread in the
 * global space, then that reference is used and returned.  The replace
 * flag is used to override the current global reference.
 * @param name {string} the name of the variable to store globally
 * @param pkg {object} the object associated with the variable name
 * @param replace {boolean} if true, then it will always overwrite the
 * current global (if it exists)
 * @return {object} the global instance reference
 */
export function globalize(name: string, pkgname: any, replace: boolean = false) {
	let ref: any = pkgname;
	if (!(global as any)[name] || replace) {
		(window as any)[name] = (global as any)[name] = pkgname;
	} else {
		ref = (global as any)[name];
	}

	return ref;
}
