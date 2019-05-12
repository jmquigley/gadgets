/**
 * Responsible for loading required global objects before all other objects
 * in the library.  This module is imported once at the beginning of the
 * index.ts script at the root of the library.  Anything that must be
 * present in the global environment before the rest of the application
 * is loaded must be here.
 *
 * @module globals
 */

import {configure} from "react-hotkeys";
import "util.obj-cycle";
import "util.string";
import {globalize} from "./shared/helpers";

globalize("hljs", require("highlight.js"));
globalize("Quill", require("quill"));

// Configuration options for react HotKeys.  This turns off the tag
// ignore function.  If this is not turned off, then the default
// key handler will not "bubble up" events in composite controls.
configure({
	ignoreTags: []
});
