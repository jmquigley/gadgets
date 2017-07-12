'use strict';

import test from 'ava';
import {
	validateEmail,
	validateMaxLength,
	validateMinLength,
	validateRegex,
	validateURL,
	Validator
} from './validator';

test('Create a dummy valiator class and verify', t => {
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

	t.truthy(validator);
	t.true(validator.validate('a'));
	t.false(validator.validate('b'));
	t.is(validator.success, 'success message');
	t.is(validator.failure, 'failure message');

});

test('Validate builtin min length validator', t => {
	const validator: Validator = validateMinLength(5);

	t.truthy(validator);
	t.true(validator.validate('abcdef'));
	t.true(validator.validate('abcde'));
	t.false(validator.validate('abcd'));
	t.false(validator.validate(''));
});

test('Validate builtin max length validator', t => {
	const validator: Validator = validateMaxLength(5);

	t.truthy(validator);
	t.true(validator.validate(''));
	t.true(validator.validate('abcd'));
	t.true(validator.validate('abcde'));
	t.false(validator.validate('abcdef'));
});

test('Validate builtin email validator', t => {
	const validator: Validator = validateEmail();

	t.truthy(validator);
	t.true(validator.validate('example@example.com'));
	t.false(validator.validate('blah'));
});

test('Validate builtin url validator', t => {
	const validator: Validator = validateURL();

	t.truthy(validator);
	t.true(validator.validate('http://example.com'));
	t.true(validator.validate('https://example.com'));
	t.false(validator.validate('blah'));
});

test('Validate builtin regex validator', t => {
	let validator: Validator = validateRegex(/^[0-9a-zA-Z]+$/);

	t.truthy(validator);
	t.true(validator.validate('abcABC123'));
	t.false(validator.validate('abcABC@123'));

	validator = validateRegex();
	t.truthy(validator);
	t.true(validator.validate('aaaaaaaaaa'));
	t.true(validator.validate(''));
	t.true(validator.validate('1232352@$^@$%@^&@$%aldgkjalkdgjadlf'));
});

test('Test creation of a Validator with bad params', t => {
	const validator: Validator = new Validator(
		null,
		null,
		null
	);

	t.truthy(validator);
	t.true(validator.validate('blah'));
	t.is(validator.success, '');
	t.is(validator.failure, '');
});
