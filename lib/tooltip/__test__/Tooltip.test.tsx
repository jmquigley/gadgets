'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {Location} from '../../shared';
import {getDefaultTooltipProps, Tooltip} from '../index';

test('Test retrieval of Tooltip props object', () => {
	const props = getDefaultTooltipProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of Tooltip location topLeft', () => {
	const ctl = mount(<Tooltip location={Location.topLeft}>Test Text</Tooltip>);
	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location top', () => {
	const ctl = mount(<Tooltip location={Location.top}>Test Text</Tooltip>);
	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location topRight', () => {
	const ctl = mount(<Tooltip location={Location.topRight}>Test Text</Tooltip>);
	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location middleLeft', () => {
	const ctl = mount(<Tooltip location={Location.middleLeft}>Test Text</Tooltip>);
	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location middle', () => {
	const ctl = mount(<Tooltip location={Location.middle}>Test Text</Tooltip>);
	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location middleRight', () => {
	const ctl = mount(<Tooltip location={Location.middleRight}>Test Text</Tooltip>);
	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location bottomLeft', () => {
	const ctl = mount(<Tooltip location={Location.bottomLeft}>Test Text</Tooltip>);
	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location bottom', () => {
	const ctl = mount(<Tooltip location={Location.bottom}>Test Text</Tooltip>);
	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location bottomRight', () => {
	const ctl = mount(<Tooltip location={Location.bottomRight}>Test Text</Tooltip>);
	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location none', () => {
	const ctl = mount(<Tooltip location={Location.none}>Test Text</Tooltip>);
	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Tooltip control', () => {
	const ctl = shallow(
		<Tooltip className="test-class" location={Location.middleRight} show>
			<span>Test Text</span>
		</Tooltip>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a Tooltip', () => {
	const ctl = shallow(<Tooltip disabled={true} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test making a Tooltip invisible', () => {
	const ctl = shallow(<Tooltip visible={false} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
