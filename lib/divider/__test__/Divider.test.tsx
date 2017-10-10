'use strict';

import * as assert from 'assert';
import {shallow} from 'enzyme';
import * as React from 'react';
import {Sizing} from '../../shared';
import {Divider, getDefaultDividerProps} from '../index';

test('Test retrieval of Divider props object', () => {
	const props = getDefaultDividerProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

for (const sizing in Sizing) {
	if (Sizing.hasOwnProperty(sizing)) {
		test(`Test creating a Divider instance for size ${Sizing[sizing]}`, () => {
			const ctl = shallow(<Divider sizing={sizing} />);

			assert(ctl);
			expect(ctl).toMatchSnapshot();
		});
	}
}
