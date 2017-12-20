'use strict';

import {EnumValues as ev} from 'enum-values';
import {mount} from 'enzyme';
import * as React from 'react';
import {Sizing} from '../../shared';
import {getDefaultOptionGroupProps, OptionGroup} from '../index';

test('Test retrieval of OptionGroup props object', () => {
	const props = getDefaultOptionGroupProps();

	expect(props).toBeTruthy();
	expect(props).toMatchSnapshot();
});

for (const sizing of ev.getNames(Sizing)) {
	test(`Creation of the OptionGroup control (${sizing})`, () => {
		const ctl = mount(
			<OptionGroup
				className="test-class"
				default="option1"
				options={[
					'option1',
					'option2',
					'option3'
				]}
				sizing={sizing}
				title="test options"
			/>
		);

		expect(ctl).toBeTruthy();
		expect(ctl).toMatchSnapshot();
	});
}

// TODO: add test for disabling, invisible, and click/select event
