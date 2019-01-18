'use strict';

import * as assert from 'assert';
import {
	validateEmail,
	validateMaxLength,
	validateMinLength,
	validateRegex,
	validateURL,
	Validator
} from './index';

test('Test creation of the default validator object', () => {
	const validator = new Validator(null, null, null);

	assert(validator);
	expect(validator).toMatchSnapshot();
});

test('Create a dummy valiator class and verify', () => {
	const validator: Validator = new Validator(
		(value: string) => {
			if (value === 'a') {
				return true;
			}

			return false;
		},
		'failure message',
		'success message'
	);

	assert(validator);
	assert(validator.validate('a'));
	assert(!validator.validate('b'));
	assert(validator.success === 'success message');
	assert(validator.failure === 'failure message');
});

test('Validate builtin min length validator', () => {
	const validator: Validator = validateMinLength(5);

	assert(validator);
	assert(validator.validate('abcdef'));
	assert(validator.validate('abcde'));
	assert(!validator.validate('abcd'));
	assert(!validator.validate(''));
});

test('Validate builtin max length validator', () => {
	const validator: Validator = validateMaxLength(5);

	assert(validator);
	assert(validator.validate(''));
	assert(validator.validate('abcd'));
	assert(validator.validate('abcde'));
	assert(!validator.validate('abcdef'));
});

test('Validate builtin email validator', () => {
	const validator: Validator = validateEmail();

	assert(validator);
	assert(validator.validate('example@example.com'));
	assert(!validator.validate('blah'));
});

test('Validate builtin url validator', () => {
	const validator: Validator = validateURL();

	assert(validator);
	assert(validator.validate('http://example.com'));
	assert(validator.validate('https://example.com'));
	assert(!validator.validate('blah'));
});

test('Validate builtin regex validator', () => {
	let validator: Validator = validateRegex(/^[0-9a-zA-Z]+$/);

	assert(validator);
	assert(validator.validate('abcABC123'));
	assert(!validator.validate('abcABC@123'));

	validator = validateRegex();
	assert(validator);
	assert(validator.validate('aaaaaaaaaa'));
	assert(validator.validate(''));
	assert(validator.validate('1232352@$^@$%@^&@$%aldgkjalkdgjadlf'));
});

test('Test creation of a Validator with bad params', () => {
	const validator: Validator = new Validator(
		null,
		null,
		null
	);

	assert(validator);
	assert(validator.validate('blah'));
	assert(validator.success === '');
	assert(validator.failure === '');
});
