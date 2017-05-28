'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {Label} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test creation of a Label control', t => {
	const ctl = mount(<Label>Test label text</Label>);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('id'), undefined);
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.ui-label').length, 1);
});

// :TODO: test disable of Label
// :TODO: test invisible Label
