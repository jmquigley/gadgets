'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {
	Direction,
	getDefaultTriangleProps,
	Sizing,
	Triangle
} from '../../dist/bundle';

test('Test retrieval of Triangle props object', () => {
	const props = getDefaultTriangleProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test creation of a Triangle control', () => {
	const ctl = shallow(<Triangle className="test-class" />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

for (const direction in Direction) {
	if (Direction.hasOwnProperty(direction)) {

		test(`Create a triangle in ${direction} direction`, () => {
			const ctl = mount(
				<Triangle
					className="test-class"
					direction={direction}
					sizing={Sizing.large}
					style={{
						fill: 'red',
						stroke: 'green'
					}}
				/>
			);

			expect(ctl).toBeDefined();
			expect(ctl).toMatchSnapshot();
		});
	}
}
