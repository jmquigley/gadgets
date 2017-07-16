'use strict';

import * as assert from 'assert';
import * as _ from 'lodash';
import {getDefaultBaseProps, Location, Sizing} from '../index';

test('Test retrieval of default prop object', () => {
	const props = getDefaultBaseProps();

	assert(props);

	assert('backgroundColor' in props);
	assert.equal(props.backgroundColor, 'inherit');

	assert('borderColor' in props);
	assert.equal(props.borderColor, 'inherit');

	assert('borderWidth' in props);
	assert.equal(props.borderWidth, 'none');

	assert('className' in props);
	assert.equal(props.className, '');

	assert('color' in props);
	assert.equal(props.color, 'inherit');

	assert('contentEditable' in props);
	assert.equal(props.contentEditable, false);

	assert('disabled' in props);
	assert.equal(props.disabled, false);

	assert('id' in props);
	assert.equal(props.id, '');

	assert('location' in props);
	assert.equal(props.location, Location.none);

	assert('noedit' in props);
	assert.equal(props.noedit, false);

	assert('noripple' in props);
	assert.equal(props.noripple, false);

	assert('selected' in props);
	assert.equal(props.selected, false);

	assert('sizing' in props);
	assert.equal(props.sizing, Sizing.normal);

	assert('style' in props);
	assert(_.isEmpty(props.style));

	assert('visible' in props);
	assert.equal(props.visible, true);
});
