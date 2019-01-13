'use strict';

import {shallow} from 'enzyme';
import * as React from 'react';
import {Accordion, getDefaultAccordionProps} from '../../dist/bundle';

test('Test retrieval of Accordion props object', () => {
	const props = getDefaultAccordionProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test the creation of a Accordion control container', () => {
	const li = <li>some list item</li>;
	const ctl = shallow(
		<Accordion id="1234" className="test-class">
			{li}
		</Accordion>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test the disabling of the Accordion control container', () => {
	const li = <li>some list item</li>;
	const ctl = shallow(
		<Accordion
			className="test-class"
			disabled
			id="1234"
		>
			{li}
		</Accordion>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test making the accordion control invisible', () => {
	const li = <li>some list item</li>;
	const ctl = shallow(
		<Accordion
			className="test-class"
			id="1234"
			visible={false}
		>
			{li}
		</Accordion>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});
