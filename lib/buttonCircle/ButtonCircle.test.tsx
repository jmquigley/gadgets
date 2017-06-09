'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {ButtonCircle, getDefaultButtonCircleProps} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of Toast props object', t => {
	const props = getDefaultButtonCircleProps();

	t.true('iconName' in props);
	t.is(props.iconName, 'bomb');
});

test('Test creation of a ButtonCircle control', t => {
	const ctl = mount(<ButtonCircle className="test-class" />);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.test-class').length, 1);
});
