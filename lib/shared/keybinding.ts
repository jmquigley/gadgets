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

export interface KeyCombo {
	altKey: boolean;
	ctrlKey: boolean;
	key: string;
	metaKey: boolean;
	shiftKey: boolean;
}

/**
 * Takes an keyboard combo in the HotKeys format and breaks it up into its
 * constituent parts.  It returns a `KeyCombo` structure that represents
 * that combo.  This structure includes:
 *
 * - .altKey {boolean}
 * - .ctrlKey {boolean}
 * - .key {string}
 * - .metaKey {boolean}
 * - .shiftKey {boolean}
 *
 * @param combo {string} - the keyboard combo keys to parse
 * @param delimit="+" {string} - the characters that separates each part of
 * the combo input key.  Used to separate it into parts.
 * @returns a `KeyCombo` structure that contains the new key parts.
 */
export function parseKeyCombo(combo: string, delimit: string = "+"): KeyCombo {
	const newCombo: KeyCombo = {
		altKey: false,
		ctrlKey: false,
		key: "",
		metaKey: false,
		shiftKey: false
	};

	if (combo) {
		const tokens = combo.toUpperCase().split(delimit);

		for (const token of tokens) {
			switch (token) {
				case "ALT":
					newCombo.altKey = true;
					break;
				case "CTRL":
					newCombo.ctrlKey = true;
					break;
				case "META":
					newCombo.metaKey = true;
					break;
				case "SHIFT":
					newCombo.shiftKey = true;
					break;
				default:
					newCombo.key = token;
					break;
			}
		}
	}

	return newCombo;
}
