'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {Button} from '../../button';
import {Justify} from '../../shared';
import {ButtonBar, getDefaultButtonBarProps} from '../index';

test('Test retrieval of ButtonBar props object', () => {
	const props = getDefaultButtonBarProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a simple ButtonBar instance', () => {
	const ctl = mount(
		<ButtonBar
			buttonSize="32px"
			className="test-class"
			testing
		>
			<Button />
			<Button />
		</ButtonBar>
	);

	assert(ctl)	;
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a ButtonBar with left justify', () => {
	const ctl = shallow(
		<ButtonBar justify={Justify.left} testing/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a ButtonBar with right justify', () => {
	const ctl = shallow(
		<ButtonBar justify={Justify.right} testing/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a ButtonBar with center justify', () => {
	const ctl = shallow(
		<ButtonBar justify={Justify.center} testing/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of the ButtonBar control', () => {
	const ctl = mount(
		<ButtonBar disabled={true} testing>
			<Button />
			<Button />
		</ButtonBar>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test making the ButtonBar invisible', () => {
	const ctl = mount(
		<ButtonBar visible={false} testing/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
