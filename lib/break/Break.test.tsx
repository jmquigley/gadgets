'use strict';

import {shallow} from 'enzyme';
import * as React from 'react';
import {Break, getDefaultBaseProps, Sizing} from '../../dist/bundle';

test('Test creation of a Break control', () => {
	const ctl = shallow(
		<Break
			sizing={Sizing.small}
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});
