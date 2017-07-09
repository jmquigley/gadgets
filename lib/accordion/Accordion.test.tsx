'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {getUUID, regexUUID} from 'util.toolbox';
import {Accordion, getDefaultAccordionProps} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of Accordion props object', t => {
	const props = getDefaultAccordionProps();

	t.truthy(props);

	t.true('children' in props);
	t.is(props.children, null);
});

test('Test the creation of a Accordion control container', t => {
	let li = <li>some list item</li>;
	const ctl = mount(
		<Accordion id={getUUID()} className="test-class">
			{li}
		</Accordion>
	);

	t.truthy(ctl);

	t.regex(ctl.prop('id'), regexUUID);
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.ui-accordion').length, 1);
	t.is(ctl.find('.accordion').length, 1);
	t.is(ctl.find('.test-class').length, 1);

	t.true(ctl.contains(li));
});

// TODO: disabling the container
// TODO: make the container invisible
