'use strict';

import {regexEmail, regexURL} from 'util.toolbox';

export type ValidatorFn = (text: string, option?: any) => boolean;

/**
 * A container class used to hold validation code.  Creating an instance
 * of this class guarantees that the validation function, success, and failure
 * information is available in the instance.  The valiator is then used
 * by a TextField control to call the validation routine within the class.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Validator} from 'gadgets';
 *
 * let fn = (value) => {
 *    return true;
 * }
 *
 * let x = new Validator(fn, 'failure', 'success');
 * ```
 * This instance is passed in the `validators` array list property to the
 * `TextField` control.  The `TextField` calls the `validate()`, with
 * the input data, to determine if the current state of that data is
 * valid.
 *
 */
export class Validator {

	private _success: string;
	private _failure: string;
	private _fn: ValidatorFn;

	constructor(fn: ValidatorFn, failure: string, success: string = '') {
		this._fn = fn;
		this._failure = failure;
		this._success = success;
	}

	get failure(): string {
		return this._failure;
	}

	get success(): string {
		return this._success;
	}

	public validate(text: string, option?: any): boolean {
		return this._fn(text, option);
	}
}

export function validateMaxLength(length: number): Validator {
	const fn = (value: string, maxLength: number = length) => {
		if (value.length > maxLength) {
			return false;
		}

		return true;
	};

	return new Validator(fn, `Invalid size > ${length}`, `Valid size <= ${length}`);
}

export function validateMinLength(length: number): Validator {
	const fn = (value: string, minLength: number = length) => {
		if (value.length < minLength) {
			return false;
		}

		return true;
	};

	return new Validator(fn, `Invalid size < ${length}`, `Valid size >= ${length}`);
}

export function validateEmail(): Validator {
	const fn = (value: string) => {
		if (regexEmail.test(value)) {
			return true;
		}

		return false;
	};

	return new Validator(fn, 'Invalid email address', 'Valid email address');
}

export function validateURL(): Validator {
	const fn = (value: string) => {
		if (regexURL.test(value)) {
			return true;
		}

		return false;
	};

	return new Validator(fn, 'Invalid URL', 'Valid URL');
}
