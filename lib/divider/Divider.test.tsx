'use strict';

import {EnumValues as ev} from 'enum-values';
import {shallow} from 'enzyme';
import * as React from 'react';
import {Sizing} from '../shared';
import {Divider, getDefaultDividerProps} from './index';

test('Test retrieval of Divider props object', () => {
	const props = getDefaultDividerProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

for (const sizing of ev.getNames(Sizing)) {
	test(`Creation of the Divider control (${sizing})`, () => {
		const ctl = shallow(<Divider sizing={Sizing[sizing]} />);
		expect(ctl).toBeDefined();
		expect(ctl).toMatchSnapshot();
	});
}
