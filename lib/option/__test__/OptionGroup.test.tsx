'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultOptionGroupProps, OptionGroup} from '../index';

test('Test retrieval of OptionGroup props object', () => {
	const props = getDefaultOptionGroupProps();

	expect(props).toBeTruthy();
	expect(props).toMatchSnapshot();
});

test('Creation of the OptionGroup control', () => {
	const ctl = shallow(
		<OptionGroup
			className="test-class"
			default="option1"
			options={[
				'option1',
				'option2',
				'option3'
			]}
			title="test options"
		/>
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});

// TODO: add test for disabling, invisible, and click/select event
