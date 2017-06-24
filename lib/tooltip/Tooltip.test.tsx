'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {Tooltip, getDefaultTooltipProps} from './index';
import {Location} from '../shared';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of Tooltip props object', t => {
	const props = getDefaultTooltipProps();

	t.truthy(props);

	t.true('color' in props);
	t.is(props.color, 'white');

	t.true('backgroundColor' in props);
	t.is(props.backgroundColor, 'gray');

	t.true('location' in props);
	t.is(props.location, Location.middleRight);

	t.true('show' in props);
	t.false(props.show);
});

test('Test creation of a Tooltip control with each location setting', t => {
	let msg = <span>Test Text</span>;
	let ctl = mount(<Tooltip location={Location.topLeft}>{msg}</Tooltip>);
	t.truthy(ctl);
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('location'), Location.topLeft);
	t.true(ctl.contains(msg));

	ctl = mount(<Tooltip location={Location.top}>{msg}</Tooltip>);
	t.truthy(ctl);
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('location'), Location.top);
	t.true(ctl.contains(msg));

	ctl = mount(<Tooltip location={Location.topRight}>{msg}</Tooltip>);
	t.truthy(ctl);
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('location'), Location.topRight);
	t.true(ctl.contains(msg));

	ctl = mount(<Tooltip location={Location.middleLeft}>{msg}</Tooltip>);
	t.truthy(ctl);
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('location'), Location.middleLeft);
	t.true(ctl.contains(msg));

	ctl = mount(<Tooltip location={Location.middle}>{msg}</Tooltip>);
	t.truthy(ctl);
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('location'), Location.middle);
	t.true(ctl.contains(msg));

	ctl = mount(<Tooltip location={Location.middleRight}>{msg}</Tooltip>);
	t.truthy(ctl);
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('location'), Location.middleRight);
	t.true(ctl.contains(msg));

	ctl = mount(<Tooltip location={Location.bottomLeft}>{msg}</Tooltip>);
	t.truthy(ctl);
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('location'), Location.bottomLeft);
	t.true(ctl.contains(msg));

	ctl = mount(<Tooltip location={Location.bottom}>{msg}</Tooltip>);
	t.truthy(ctl);
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('location'), Location.bottom);
	t.true(ctl.contains(msg));

	ctl = mount(<Tooltip location={Location.bottomRight}>{msg}</Tooltip>);
	t.truthy(ctl);
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('location'), Location.bottomRight);
	t.true(ctl.contains(msg));

	ctl = mount(<Tooltip location={Location.none}>{msg}</Tooltip>);
	t.truthy(ctl);
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('location'), Location.none);
	t.true(ctl.contains(msg));
});

test('Test creation of a Tooltip control', t => {
	let msg = <span>Test Text</span>;
	const ctl = mount(
		<Tooltip className="test-class" location={Location.middleRight} show>
			{msg}
		</Tooltip>
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('location'), Location.middleRight);
	t.true(ctl.prop('show'));
	t.true(ctl.contains(msg));

	t.is(ctl.find('.test-class').length, 1);
	t.is(ctl.find('.ui-tooltip').length, 1);
});

test('Test disabling of a Tooltip', t => {
	const ctl = mount(
		<Tooltip disabled={true} />
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('id'), '');
	t.true(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
});

test('Test making a Tooltip invisible', t => {
	const ctl = mount(
		<Tooltip visible={false} />
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.false(ctl.prop('visible'));
});
