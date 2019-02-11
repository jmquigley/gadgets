"use strict";

import {
	validateEmail,
	validateMaxLength,
	validateMinLength,
	validateRegex,
	validateURL,
	Validator
} from "./index";

test("Test creation of the default validator object", () => {
	const validator = new Validator(null, null, null);

	expect(validator).toBeDefined();
	expect(validator).toMatchSnapshot();
});

test("Create a dummy valiator class and verify", () => {
	const validator: Validator = new Validator(
		(value: string) => {
			if (value === "a") {
				return true;
			}

			return false;
		},
		"failure message",
		"success message"
	);

	expect(validator).toBeDefined();
	expect(validator.validate("a")).toBe(true);
	expect(validator.validate("b")).toBe(false);
	expect(validator.success === "success message").toBe(true);
	expect(validator.failure === "failure message").toBe(true);
});

test("Validate builtin min length validator", () => {
	const validator: Validator = validateMinLength(5);

	expect(validator).toBeDefined();
	expect(validator.validate("abcdef")).toBe(true);
	expect(validator.validate("abcde")).toBe(true);
	expect(validator.validate("abcd")).toBe(false);
	expect(validator.validate("")).toBe(false);
});

test("Validate builtin max length validator", () => {
	const validator: Validator = validateMaxLength(5);

	expect(validator).toBeDefined();
	expect(validator.validate("")).toBe(true);
	expect(validator.validate("abcd")).toBe(true);
	expect(validator.validate("abcde")).toBe(true);
	expect(validator.validate("abcdef")).toBe(false);
});

test("Validate builtin email validator", () => {
	const validator: Validator = validateEmail();

	expect(validator).toBeDefined();
	expect(validator.validate("example@example.com")).toBe(true);
	expect(validator.validate("blah")).toBe(false);
});

test("Validate builtin url validator", () => {
	const validator: Validator = validateURL();

	expect(validator).toBeDefined();
	expect(validator.validate("http://example.com")).toBe(true);
	expect(validator.validate("https://example.com")).toBe(true);
	expect(validator.validate("blah")).toBe(false);
});

test("Validate builtin regex validator", () => {
	let validator: Validator = validateRegex(/^[0-9a-zA-Z]+$/);

	expect(validator).toBeDefined();
	expect(validator.validate("abcABC123")).toBe(true);
	expect(validator.validate("abcABC@123")).toBe(false);

	validator = validateRegex();
	expect(validator).toBeDefined();
	expect(validator.validate("aaaaaaaaaa")).toBe(true);
	expect(validator.validate("")).toBe(true);
	expect(validator.validate("1232352@$^@$%@^&@$%aldgkjalkdgjadlf")).toBe(
		true
	);
});

test("Test creation of a Validator with bad params", () => {
	const validator: Validator = new Validator(null, null, null);

	expect(validator).toBeDefined();
	expect(validator.validate("blah")).toBe(true);
	expect(validator.success === "").toBe(true);
	expect(validator.failure === "").toBe(true);
});
