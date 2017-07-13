'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {getUUID, regexUUID} from 'util.toolbox';
import {Accordion, getDefaultAccordionProps} from '../index';

test('Test retrieval of Accordion props object', () => {
	const props = getDefaultAccordionProps();

	expect(props).toBeTruthy();

	expect('children' in props).toBe(true);
	expect(props.children).toBe(null);
});

test('Test the creation of a Accordion control container', () => {
	const li = <li>some list item</li>;
	const ctl = mount(
		<Accordion id={getUUID()} className="test-class">
			{li}
		</Accordion>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('id')).toMatch(regexUUID);
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);

	expect(ctl.find('.ui-accordion').length).toBe(1);
	expect(ctl.find('.test-class').length).toBe(1);
	expect(ctl.contains(li)).toBe(true);
});

// TODO: disabling the container
// TODO: make the container invisible
