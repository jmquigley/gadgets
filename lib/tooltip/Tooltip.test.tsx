'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultTooltipProps, Location, Tooltip} from '../../dist/bundle';

test('Test retrieval of Tooltip props object', () => {
	const props = getDefaultTooltipProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test creation of Tooltip location topLeft', () => {
	const ctl = mount(<Tooltip location={Location.topLeft}>Test Text</Tooltip>);
	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location top', () => {
	const ctl = mount(<Tooltip location={Location.top}>Test Text</Tooltip>);
	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location topRight', () => {
	const ctl = mount(<Tooltip location={Location.topRight}>Test Text</Tooltip>);
	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location middleLeft', () => {
	const ctl = mount(<Tooltip location={Location.middleLeft}>Test Text</Tooltip>);
	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location middle', () => {
	const ctl = mount(<Tooltip location={Location.middle}>Test Text</Tooltip>);
	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location middleRight', () => {
	const ctl = mount(<Tooltip location={Location.middleRight}>Test Text</Tooltip>);
	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location bottomLeft', () => {
	const ctl = mount(<Tooltip location={Location.bottomLeft}>Test Text</Tooltip>);
	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location bottom', () => {
	const ctl = mount(<Tooltip location={Location.bottom}>Test Text</Tooltip>);
	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location bottomRight', () => {
	const ctl = mount(<Tooltip location={Location.bottomRight}>Test Text</Tooltip>);
	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of Tooltip location none', () => {
	const ctl = mount(<Tooltip location={Location.none}>Test Text</Tooltip>);
	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Tooltip control', () => {
	const ctl = shallow(
		<Tooltip className="test-class" location={Location.middleRight}>
			<span>Test Text</span>
		</Tooltip>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a Tooltip', () => {
	const ctl = shallow(<Tooltip disabled={true} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test making a Tooltip invisible', () => {
	const ctl = shallow(<Tooltip visible={false} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});
