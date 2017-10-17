'use strict';

const debug = require('debug')('Dropdown.test');

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {Dropdown, DropdownOption, getDefaultDropdownProps} from '../index';

const testData: DropdownOption[] = [
	{value: 'idstr1', label: 'lstr1'},
	{value: 'idstr2', label: 'lstr2'},
	{value: 'idstr3', label: 'lstr3'}
];

test('Test retrieval of Dropdown props object', () => {
	const props = getDefaultDropdownProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Creation of the Dropdown control', () => {
	const ctl = shallow(
		<Dropdown
			defaultVal="idstr2"
			items={testData}
			testing
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Disable the Dropdown control', () => {
	const change = jest.fn();
	const ctl = mount(
		<Dropdown
			defaultVal="idstr2"
			disabled
			items={testData}
			onSelect={change}
			testing
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
	ctl.find('.ui-dropdown').simulate('change', {target: {value: 'idstr2'}});
	expect(change).not.toHaveBeenCalled();
});

test('Make the Dropdown control invisible', () => {
	const change = jest.fn();
	const ctl = shallow(
		<Dropdown
			defaultVal="idstr2"
			items={testData}
			testing
			visible={false}
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the Dropdown click event', () => {
	const change = jest.fn();
	const ctl = mount(
		<Dropdown
			defaultVal="idstr1"
			items={testData}
			onSelect={change}
			testing
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-dropdown').simulate('change', {target: {value: 'idstr1'}});
	expect(change).toHaveBeenCalled();
	assert.equal(change.mock.calls[0][0], 'idstr1');
});
