'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {Direction, Sizing} from '../../shared';
import {getDefaultTriangleProps, Triangle} from '../index';

test('Test retrieval of Triangle props object', () => {
	const props = getDefaultTriangleProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a Triangle control', () => {
	const ctl = shallow(<Triangle className="test-class" />);

	assert(ctl);
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

			assert(ctl);
			expect(ctl).toMatchSnapshot();
		});
	}
}
