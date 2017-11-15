'use strict';

// const debug = require('debug')('helpers');

import * as React from 'react';
import {Tooltip} from '../tooltip';

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
export function globalize(name: string, pkg: any, replace: boolean = false) {
	let ref: any = pkg;
	if (!(global as any)[name] || replace) {
		(window as any)[name] = (global as any)[name] = pkg;
	} else {
		ref = (global as any)[name];
	}

	return ref;
}

/**
 * Creates a tooltip object for use within a control.  It will check the given
 * props for a tooltip string.  If it has one, it will create the object and
 * return it.  If it doesn't have it, then NULL is returned.
 * @param props {any} and object representing the props used to generate the
 * tooltip.
 * @return {Tooltip} a new Tooltip reference if there is a given tooltip string
 * otherwise null is returned.
 */
export function tooltip(id: string, props: any) {
	if (props['tooltip']) {
		return (
			<Tooltip
				parent={id}
				sizing={props['sizing']}
			>
				{props['tooltip']}
			</Tooltip>
		);
	}

	return null;
}
