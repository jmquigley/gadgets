/**
 * Responsible for loading required global objects before all other objects
 * in the library.  This module is imported once at the beginning of the
 * index.ts script at the root of the library.  Anything that must be
 * present in the global environment before the rest of the application
 * is loaded must be here.
 *
 * @module globals
 */

const pkg = require("../package.json");

import {configure} from "react-hotkeys";
import "styled-components";
import "util.obj-cycle";
import "util.string";
import {isNode} from "util.toolbox";
import {globalize} from "./shared/helpers";
import {BaseThemeProps} from "./shared/themes";

globalize("hljs", require("highlight.js"));
globalize("Quill", require("quill"));

// Configuration options for react HotKeys.  This turns off the tag
// ignore function.  If this is not turned off, then the default
// key handler will not "bubble up" events in composite controls.
configure({
	ignoreTags: []
});

/**
 * Adds the custom theme properties to the default theme interface
 * within styled components.  This makes all of the properties
 * available by default.  This replaces the old method in the obsolete
 * themed-components module.
 */
declare module "styled-components" {
	export interface DefaultTheme extends BaseThemeProps {}
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
