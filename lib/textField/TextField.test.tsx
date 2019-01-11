'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultTextFieldProps, TextField} from '../../dist/bundle';

test('Test retrieval of TextField props object', () => {
	const props = getDefaultTextFieldProps();

	console.log(props);

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

// test('Test making the TextField invisible', () => {
// 	const ctl = mount(<TextField visible={false} />);
//
// 	assert(ctl);
// 	expect(ctl).toMatchSnapshot();
// });
//
// test('Test creating TextField and saving on blur', () => {
// 	const blur = jest.fn();
// 	const change = jest.fn();
// 	const validation = jest.fn();
// 	const ctl = mount(
// 		<TextField
// 			onBlur={blur}
// 			onChange={change}
// 			onValidation={validation}
// 		/>
// 	);
//
// 	assert(ctl);
// 	expect(ctl).toMatchSnapshot();
//
// 	const instance = ctl.instance() as TextField;
// 	assert(instance);
//
// 	ctl.find('input').simulate('change', {target: {value: 'a'}});
// 	assert.equal(instance.value, 'a');
// 	expect(change).toHaveBeenCalled();
// 	expect(validation).not.toHaveBeenCalled();
//
// 	ctl.find('input').simulate('blur', {target: {value: 'abcde'}});
// 	expect(blur).toHaveBeenCalled();
// 	expect(validation).not.toHaveBeenCalled();
// 	assert(ctl.state('valid'));
// 	assert(instance.value, 'abcde');
// });
//
// test('Create text, change and revert with Enter/Escape in TextField', () => {
// 	const change = jest.fn();
// 	const keyDown = jest.fn();
// 	const keyPress = jest.fn();
// 	const validation = jest.fn();
// 	const ctl = mount(
// 		<TextField
// 			onChange={change}
// 			onKeyDown={keyDown}
// 			onKeyPress={keyPress}
// 			onValidation={validation}
// 		/>
// 	);
//
// 	assert(ctl);
// 	expect(ctl).toMatchSnapshot();
//
// 	const instance = ctl.instance() as TextField;
// 	assert(instance);
//
// 	const input = ctl.find('input');
// 	assert(input);
// 	assert(ctl.state('valid'));
//
// 	// Add initial text 'abcde'
// 	input.simulate('change', {target: {value: 'abcde'}});
// 	expect(change).toHaveBeenCalled();
// 	expect(validation).not.toHaveBeenCalled();
// 	assert.equal(instance.value, 'abcde');
// 	assert(ctl.state('valid'));
//
// 	// Add another character 'f' and press enter commiting it
// 	input.simulate('change', {target: {value: 'abcdef'}});
// 	input.simulate('keyPress', {key: 'Enter', target: {value: 'abcdef'}});
// 	expect(validation).not.toHaveBeenCalled();
// 	expect(keyPress).toHaveBeenCalled();
// 	assert.equal(instance.value, 'abcdef');
// 	assert.equal(ctl.state('previousText'), 'abcdef');
// 	assert(ctl.state('valid'));
//
// 	// Remove characters and make text abc, press escape reverting it
// 	input.simulate('change', {target: {value: 'abc'}});
// 	assert.equal(instance.value, 'abc');
// 	input.simulate('keyDown', {key: 'Escape'});
// 	expect(validation).not.toHaveBeenCalled();
// 	expect(keyDown).toHaveBeenCalled();
// 	assert.equal(instance.value, 'abcdef');
// 	assert(ctl.state('valid'));
// });
//
// test('Test creation of a textfield with min/max validation', () => {
// 	const change = jest.fn();
// 	const keypress = jest.fn();
// 	const validation = jest.fn();
// 	const ctl = mount(
// 		<TextField
// 			maxLength="10"
// 			minLength="5"
// 			onChange={change}
// 			onKeyPress={keypress}
// 			onValidation={validation}
// 			type="text"
// 			usevalidation
// 			value=""
// 		/>
// 	);
//
// 	assert(ctl);
// 	expect(ctl).toMatchSnapshot();
//
// 	const instance = ctl.instance() as TextField;
// 	assert(instance);
// 	assert(instance.input);
//
// 	const input = ctl.find('input');
// 	assert(input);
// 	assert(ctl.state('valid'));
//
// 	// Min length failure with "a"
// 	input.simulate('change', {target: {value: 'a'}});
// 	expect(change).toHaveBeenCalled();
// 	expect(validation).not.toHaveBeenCalled();
// 	assert.equal(instance.value, 'a');
// 	assert(!ctl.state('valid'));
// 	assert.equal(ctl.state('message'), 'Invalid size < 5');
//
// 	// Min/Max success with 'abcde'
// 	input.simulate('change', {target: {value: 'abcde'}});
// 	assert.equal(instance.value, 'abcde');
// 	assert(ctl.state('valid'));
// 	assert.equal(ctl.state('message'), 'Valid size >= 5');
//
// 	// Max size failure
// 	input.simulate('change', {target: {value: 'abcdefghijk'}});
// 	assert.equal(instance.value, 'abcdefghijk');
// 	assert(!ctl.state('valid'));
// 	assert.equal(ctl.state('message'), 'Invalid size > 10');
//
// 	// Final validation success call on enter
// 	input.simulate('keyPress', {key: 'Enter', target: {value: 'abcdef'}});
// 	expect(keypress).toHaveBeenCalled();
// 	expect(validation).toHaveBeenCalled();
// 	assert(validation.mock.calls[0][0]);
// });
//
// test('Test creation of a TextField with email validation', () => {
// 	const change = jest.fn();
// 	const keypress = jest.fn();
// 	const validation = jest.fn();
// 	const ctl = mount(
// 		<TextField
// 			onChange={change}
// 			onKeyPress={keypress}
// 			onValidation={validation}
// 			type="email"
// 			usevalidation
// 		/>
// 	);
//
// 	assert(ctl);
// 	expect(ctl).toMatchSnapshot();
//
// 	const instance = ctl.instance() as TextField;
// 	assert(instance);
// 	assert(instance.input);
//
// 	const input = ctl.find('input');
// 	assert(input);
// 	assert(ctl.state('valid'));
//
// 	// Add an invalid email address value
// 	input.simulate('change', {target: {value: 'a'}});
// 	expect(change).toHaveBeenCalled();
// 	expect(validation).not.toHaveBeenCalled();
// 	assert.equal(instance.value, 'a');
// 	assert(!ctl.state('valid'));
// 	assert.equal(ctl.state('message'), 'Invalid email address');
//
// 	// Use a valid email address
// 	input.simulate('change', {target: {value: 'example@example.com'}});
// 	assert.equal(instance.value, 'example@example.com');
// 	assert(ctl.state('valid'));
// 	assert.equal(ctl.state('message'), 'Valid email address');
//
// 	// Make final change an invalid email to show onValidation failure
// 	input.simulate('keyPress', {key: 'Enter', target: {value: 'abcdef'}});
// 	expect(keypress).toHaveBeenCalled();
// 	expect(validation).toHaveBeenCalled();
// 	assert(!validation.mock.calls[0][0]);
// });
//
// test('Test creation of a TextField with url validation', () => {
// 	const change = jest.fn();
// 	const keypress = jest.fn();
// 	const validation = jest.fn();
// 	const ctl = mount(
// 		<TextField
// 			onChange={change}
// 			onKeyPress={keypress}
// 			onValidation={validation}
// 			type="url"
// 			usevalidation
// 		/>
// 	);
// 	const url: string = 'http://example.com';
//
// 	assert(ctl);
// 	expect(ctl).toMatchSnapshot();
//
// 	const instance = ctl.instance() as TextField;
// 	assert(instance);
// 	assert(instance.input);
//
// 	const input = ctl.find('input');
// 	assert(input);
// 	assert(ctl.state('valid'));
//
// 	// Add an invalid URL
// 	input.simulate('change', {target: {value: 'a'}});
// 	expect(change).toHaveBeenCalled();
// 	expect(validation).not.toHaveBeenCalled();
// 	assert.equal(instance.value, 'a');
// 	assert(!ctl.state('valid'));
// 	assert.equal(ctl.state('message'), 'Invalid URL');
//
// 	// Change to a valid URL
// 	input.simulate('change', {target: {value: url}});
// 	assert.equal(instance.value, url);
// 	assert(ctl.state('valid'));
// 	assert.equal(ctl.state('message'), 'Valid URL');
//
// 	// Perform final validation with a valid URL
// 	input.simulate('keyPress', {key: 'Enter', target: {value: url}});
// 	expect(keypress).toHaveBeenCalled();
// 	expect(validation).toHaveBeenCalled();
// 	assert(validation.mock.calls[0][0]);
// });
//
