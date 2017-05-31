'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {getUUID, regexUUID} from 'util.toolbox';
import {Accordion} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test the creation of a Accordion control container', t => {
	const ctl = mount(
		<Accordion id={getUUID()} className="test-class">
			<li>some list item</li>
		</Accordion>
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.regex(ctl.prop('id'), regexUUID);
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.ui-accordion').length, 1);
	t.is(ctl.find('.accordion').length, 1);
	t.is(ctl.find('.test-class').length, 1);
});
