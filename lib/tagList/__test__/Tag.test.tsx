'use strict';

import * as assert from 'assert';
import {shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultTagProps, Tag} from '../index';

test('Test retrieval of Tag props object', () => {
	const props = getDefaultTagProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a simple Tag instance', () => {
	const ctl = shallow(
		<Tag>test tag</Tag>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
