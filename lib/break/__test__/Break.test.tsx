'use strict';

import {shallow} from 'enzyme';
import * as React from 'react';
import {Sizing} from '../../shared';
import {Break, getDefaultBaseProps} from '../index';

test('Test creation of a Break control', () => {
	const ctl = shallow(
		<Break
			sizing={Sizing.small}
		/>
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});
