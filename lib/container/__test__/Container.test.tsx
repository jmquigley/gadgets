'use strict';

import * as assert from 'assert';
import {shallow} from 'enzyme';
import * as React from 'react';
import {Container, getDefaultContainerProps} from '../index';

test('Test retrieval of Container props object', () => {
	const props = getDefaultContainerProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a Container control', () => {
	const ctl = shallow(
		<Container>
			<p>Test Container</p>
		</Container>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Container control with an id value', () => {
	const ctl = shallow(
		<Container id="testid">
			<p>Test Container</p>
		</Container>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test adding custom className to Container control', () => {
	const ctl = shallow(
		<Container id="testid" className="test-classname">
			<p>Test Container</p>
		</Container>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
