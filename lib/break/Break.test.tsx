'use strict';

import {EnumValues as ev} from 'enum-values';
import {shallow} from 'enzyme';
import * as React from 'react';
import {Break, Sizing} from '../../dist/bundle';

for (const sizing of ev.getNames(Sizing)) {
	test('Test creation of a Break control of size ${sizing}', () => {
		const ctl = shallow(<Break sizing={Sizing[sizing]} />);

		expect(ctl).toBeDefined();
		expect(ctl).toMatchSnapshot();
	});
}
