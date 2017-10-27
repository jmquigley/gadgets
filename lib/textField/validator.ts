'use strict';

import {regexEmail, regexURL} from 'util.constants';

export type ValidatorFn = (text: string, option?: any) => boolean;

/**
 * A container class used to hold validation code.  Creating an instance
 * of this class guarantees that the validation function, success, and failure
 * information is available in the instance.  The validator is then used
 * by a TextField control to call the validation routine within the class.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Validator} from 'gadgets';
 *
 * const x = new Validator(
 *     (value: string) => {
 *         return true;
 *     },
 *     'failure',
 *     'success'
 * );
 * ```
 *
 * The function passed to the `Validator` class returns a boolean value.
 * If true is returned, then the validation call is successful, otherwise
 * validation has failed.  The success/failure messages are associated
 * with this validation routine and can be used to prompt with validation
 * info for this object.
 *
 * These instances are passed to the `validators` array list property on the
 * `TextField` control.  The `TextField` calls the `validate()`, with
 * the input data to determine, if the current state of that data is
 * valid.  This validators array can hold multiple instances of these
 * validation classes (generally different validations).  The validation
 * routine in the `TextField` will iterate through this array and use
 * the function and success/failure to perform this validation.
 *
 */
export class Validator {

	private _failure: string = '';
	private _success: string = '';

	constructor(fn: ValidatorFn, failure: string, success?: string) {
		if (fn != null && typeof fn === 'function') this.validate = fn;
		if (failure != null) this._failure = failure;
		if (success != null) this._success = success;
	}

	get failure(): string {
		return this._failure;
	}

	get success(): string {
		return this._success;
	}

	public validate: ValidatorFn = (text: string, option?: any): boolean => {
		text = '';
		option = '';
		return true;
	}
}

export function validateMaxLength(length: number): Validator {
	return new Validator(
		(value: string, maxLength: number = length) => {
			if (value == null || value.length > maxLength) {
				return false;
			}

			return true;
		},
		`Invalid size > ${length}`,
		`Valid size <= ${length}`
	);
}

export function validateMinLength(length: number): Validator {
	return new Validator(
		(value: string, minLength: number = length) => {
			if (value == null || value.length < minLength) {
				return false;
			}

			return true;
		},
		`Invalid size < ${length}`,
		`Valid size >= ${length}`
	);
}

export function validateEmail(): Validator {
	return new Validator(
		(value: string) => {
			if (regexEmail.test(value)) {
				return true;
			}

			return false;
		},
		'Invalid email address',
		'Valid email address'
	);
}

export function validateURL(): Validator {
	return new Validator(
		(value: string) => {
			if (regexURL.test(value)) {
				return true;
			}

			return false;
		},
		'Invalid URL',
		'Valid URL'
	);
}

export function validateRegex(regex: RegExp = /.*/): Validator {
	return new Validator(
		(value: string, re: RegExp = regex) => {
			return re.test(value);
		},
		`Invalid regex (${regex})`,
		''
	);
}
