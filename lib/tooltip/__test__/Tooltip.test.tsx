'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {Location} from '../../shared';
import {getDefaultTooltipProps, Tooltip} from '../index';

test('Test retrieval of Tooltip props object', () => {
	const props = getDefaultTooltipProps();

	expect(props).toBeTruthy();

	expect('color' in props).toBe(true);
	expect(props.color).toBe('white');

	expect('backgroundColor' in props).toBe(true);
	expect(props.backgroundColor).toBe('gray');

	expect('location' in props).toBe(true);
	expect(props.location).toBe(Location.middleRight);

	expect('show' in props).toBe(true);
	expect(props.show).toBe(false);
});

test('Test creation of a Tooltip control with each location setting', () => {
	const msg = <span>Test Text</span>;
	let ctl = mount(<Tooltip location={Location.topLeft}>{msg}</Tooltip>);
	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('location')).toBe(Location.topLeft);
	expect(ctl.contains(msg)).toBe(true);

	ctl = mount(<Tooltip location={Location.top}>{msg}</Tooltip>);
	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('location')).toBe(Location.top);
	expect(ctl.contains(msg)).toBe(true);

	ctl = mount(<Tooltip location={Location.topRight}>{msg}</Tooltip>);
	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('location')).toBe(Location.topRight);
	expect(ctl.contains(msg)).toBe(true);

	ctl = mount(<Tooltip location={Location.middleLeft}>{msg}</Tooltip>);
	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('location')).toBe(Location.middleLeft);
	expect(ctl.contains(msg)).toBe(true);

	ctl = mount(<Tooltip location={Location.middle}>{msg}</Tooltip>);
	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('location')).toBe(Location.middle);
	expect(ctl.contains(msg)).toBe(true);

	ctl = mount(<Tooltip location={Location.middleRight}>{msg}</Tooltip>);
	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('location')).toBe(Location.middleRight);
	expect(ctl.contains(msg)).toBe(true);

	ctl = mount(<Tooltip location={Location.bottomLeft}>{msg}</Tooltip>);
	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('location')).toBe(Location.bottomLeft);
	expect(ctl.contains(msg)).toBe(true);

	ctl = mount(<Tooltip location={Location.bottom}>{msg}</Tooltip>);
	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('location')).toBe(Location.bottom);
	expect(ctl.contains(msg)).toBe(true);

	ctl = mount(<Tooltip location={Location.bottomRight}>{msg}</Tooltip>);
	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('location')).toBe(Location.bottomRight);
	expect(ctl.contains(msg)).toBe(true);

	ctl = mount(<Tooltip location={Location.none}>{msg}</Tooltip>);
	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('location')).toBe(Location.none);
	expect(ctl.contains(msg)).toBe(true);
});

test('Test creation of a Tooltip control', () => {
	const msg = <span>Test Text</span>;
	const ctl = mount(
		<Tooltip className="test-class" location={Location.middleRight} show>
			{msg}
		</Tooltip>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('location')).toBe(Location.middleRight);
	expect(ctl.prop('show')).toBe(true);
	expect(ctl.contains(msg)).toBe(true);

	expect(ctl.find('.test-class').length).toBe(1);
	expect(ctl.find('.ui-tooltip').length).toBe(1);
});

test('Test disabling of a Tooltip', () => {
	const ctl = mount(
		<Tooltip disabled={true} />
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(true);
	expect(ctl.prop('visible')).toBe(true);
});

test('Test making a Tooltip invisible', () => {
	const ctl = mount(
		<Tooltip visible={false} />
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(false);
});
