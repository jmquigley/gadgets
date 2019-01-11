'use strict';

import {shallow} from 'enzyme';
import * as React from 'react';
import {Divider, getDefaultDividerProps, Sizing} from '../../dist/bundle';

test('Test retrieval of Divider props object', () => {
	const props = getDefaultDividerProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

for (const val in Sizing) {
	if (Sizing.hasOwnProperty(val)) {
		const sizing: Sizing = (Sizing as any)[val];

		test(`Test creating a Divider instance for size ${sizing}`, () => {
			const ctl = shallow(<Divider sizing={sizing} />);
			expect(ctl).toBeDefined();
			expect(ctl).toMatchSnapshot();
		});
	}
}
