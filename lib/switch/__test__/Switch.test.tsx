'use strict';

import * as assert from 'assert';
import {getDefaultSwitchProps} from '../index';

test('Test retrieval of the Switch props object', () => {
	const props = getDefaultSwitchProps();

	assert(props);
	expect(props).toMatchSnapshot();
});
