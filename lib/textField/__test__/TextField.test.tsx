'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultTextFieldProps, TextField} from '../index';

test('Test retrieval of TextField props object', () => {
	const props = getDefaultTextFieldProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a TextField control', () => {
	const ctl = shallow(<TextField className="test-class" />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a TextField control', () => {
	const ctl = mount(<TextField disabled />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test making the TextField invisible', () => {
	const ctl = mount(<TextField visible={false} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creating TextField and saving on blur', () => {
	const blur = jest.fn();
	const change = jest.fn();
	const validation = jest.fn();
	const ctl = mount(
		<TextField
			onBlur={blur}
			onChange={change}
			onValidation={validation}
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const instance = ctl.instance() as TextField;
	assert(instance);

	ctl.find('input').simulate('change', {target: {value: 'a'}});
	assert.equal(instance.value, 'a');
	expect(change).toHaveBeenCalled();
	expect(validation).not.toHaveBeenCalled();

	ctl.find('input').simulate('blur', {target: {value: 'abcde'}});
	expect(blur).toHaveBeenCalled();
	expect(validation).not.toHaveBeenCalled();
	assert(ctl.state('valid'));
	assert(instance.value, 'abcde');
});

test('Test creation of a textfield with min/max validation', () => {
	const change = jest.fn();
	const validation = jest.fn();
	const ctl = mount(
		<TextField
			maxLength="10"
			minLength="5"
			onChange={change}
			onValidation={validation}
			type="text"
			usevalidation
			value=""
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const instance = ctl.instance() as TextField;
	assert(instance);
	assert(instance.input);

	assert(ctl.state('valid'));
	ctl.find('input').simulate('change', {target: {value: 'a'}});
	expect(change).toHaveBeenCalled();
	expect(validation).not.toHaveBeenCalled();
	assert.equal(instance.value, 'a');
	assert(!ctl.state('valid'));
	assert.equal(ctl.state('message'), 'Invalid size < 5');

	ctl.find('input').simulate('change', {target: {value: 'abcde'}});
	assert.equal(instance.value, 'abcde');
	assert(ctl.state('valid'));
	assert.equal(ctl.state('message'), 'Valid size >= 5');

	ctl.find('input').simulate('change', {target: {value: 'abcdefghijk'}});
	assert.equal(instance.value, 'abcdefghijk');
	assert(!ctl.state('valid'));
	assert.equal(ctl.state('message'), 'Invalid size > 10');
});

test('Test creation of a TextField with email validation', () => {
	const change = jest.fn();
	const validation = jest.fn();
	const ctl = mount(
		<TextField
			onChange={change}
			onValidation={validation}
			type="email"
			usevalidation
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const instance = ctl.instance() as TextField;
	assert(instance);
	assert(instance.input);

	assert(ctl.state('valid'));
	ctl.find('input').simulate('change', {target: {value: 'a'}});
	expect(change).toHaveBeenCalled();
	expect(validation).not.toHaveBeenCalled();
	assert.equal(instance.value, 'a');
	assert(!ctl.state('valid'));
	assert.equal(ctl.state('message'), 'Invalid email address');

	ctl.find('input').simulate('change', {target: {value: 'example@example.com'}});
	assert.equal(instance.value, 'example@example.com');
	assert(ctl.state('valid'));
	assert.equal(ctl.state('message'), 'Valid email address');
});

test('Test creation of a TextField with url validation', () => {
	const change = jest.fn();
	const ctl = mount(
		<TextField
			onChange={change}
			type="url"
			usevalidation
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const instance = ctl.instance() as TextField;
	assert(instance);
	assert(instance.input);

	assert(ctl.state('valid'));

	ctl.find('input').simulate('change', {target: {value: 'a'}});
	expect(change).toHaveBeenCalled();
	assert.equal(instance.value, 'a');
	assert(!ctl.state('valid'));
	assert.equal(ctl.state('message'), 'Invalid URL');

	ctl.find('input').simulate('change', {target: {value: 'http://example.com'}});
	assert.equal(instance.value, 'http://example.com');
	assert(ctl.state('valid'));
	assert.equal(ctl.state('message'), 'Valid URL');
});

// TODO: call change/commit to show onValidation call
// TODO: add keydown/keypress event tests with commit
// TODO: add keydown/keypress event tests with rollback
