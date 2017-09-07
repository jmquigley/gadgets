'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {DynamicList, getDefaultDynamicListProps} from '../index';

test('Test retrieval of DynamicList props object', () => {
	const props = getDefaultDynamicListProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a DynamicList control', () => {
	const ctl = shallow(<DynamicList className="test-class" />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a DynamicList with 3 items', () => {
	const ctl = mount(
		<DynamicList
			items={{
				title1: 'widget1',
				title2: 'widget2',
				title3: 'widget3'
			}}
			nocollapse
			pageSizes={[10, 20, 30]}
			title="Test List Title"
		/>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a Dynamic List control', () => {
	const ctl = shallow(
		<DynamicList
			items={{
				title1: 'widget1',
				title2: 'widget2',
				title3: 'widget3'
			}}
			pageSizes={[10, 20, 30]}
			disabled
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test making a Dynamic List invisible', () => {
	const ctl = shallow(
		<DynamicList
			items={{
				title1: 'widget1',
				title2: 'widget2',
				title3: 'widget3'
			}}
			pageSizes={[10, 20, 30]}
			visible={false}
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
