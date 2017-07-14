'use strict';

import * as assert from 'assert';
import {shallow} from 'enzyme';
import * as React from 'react';
import {Accordion, getDefaultAccordionProps} from '../index';

test('Test retrieval of Accordion props object', () => {
	const props = getDefaultAccordionProps();

	assert(props);

	assert('children' in props);
	assert.equal(props.children, null);
});

test('Test the creation of a Accordion control container', () => {
	const li = <li>some list item</li>;
	const ctl = shallow(
		<Accordion id="1234" className="test-class">
			{li}
		</Accordion>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

// TODO: disabling the container
// TODO: make the container invisible
