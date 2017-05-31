'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {AccordionItem} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test the creation of a AccordionItem control', t => {
	const ctl = mount(
		<AccordionItem className="test-class" title="Test Title" />
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.ui-accordionitem').length, 1);
	t.is(ctl.find('.accordionItem').length, 1);
	t.is(ctl.find('.test-class').length, 1);
});
