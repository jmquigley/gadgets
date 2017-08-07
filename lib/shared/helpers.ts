'use strict';

/**
 * Takes a Set of strings and converts it to a string that is joined by spaces
 * This string represents a className string.
 * @param obj {Set<string>} the set of strings that will be joined together
 * @return {string} a className string
 */
export function cls(obj: Set<string>): string {
	return Array.from(obj).join(' ');
}
