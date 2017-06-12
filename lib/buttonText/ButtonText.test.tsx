'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {ButtonText} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test.skip('Test creation of a ButtonText control', t => {
	const ctl = mount(<ButtonText className="test-class"/>);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'bomb');
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.ui-button').length, 1);
	t.is(ctl.find('.fa').length, 1);
	t.is(ctl.find('.fa-bomb').length, 1);
	t.is(ctl.find('.test-class').length, 1);
});
