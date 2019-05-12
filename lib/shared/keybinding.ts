/*
 * Interface defnintion used by the key map and bindings for components.  The
 * library uses the [react-hotkeys](https://www.npmjs.com/package/react-hotkeys)
 * module.  Note that all keybindings are on that component (not global), so
 * the components require focus to use the given binding.
 *
 * @module keybinding
 */

import {KeyMapOptions} from "react-hotkeys";

export interface KeyMap {
	[key: string]: string | KeyMapOptions;
}

export interface KeyHandler {
	[key: string]: (...args) => void;
}
