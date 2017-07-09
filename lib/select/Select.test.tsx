'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {Select} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test creation of a Select control', t => {
	const ctl = mount(<Select className="test-class" />);

	t.truthy(ctl);

	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.test-class').length, 1);
	t.is(ctl.find('.ui-select').length, 1);
});

// TODO: disabling the badge control
// TODO: make the badge invisible
// TODO: test adding/retrieving text example from the Select control
