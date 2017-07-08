'use strict';

import {mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import * as _ from 'lodash';
import {getDefaultBaseProps, Location, Sizing} from './index';

test('Test retrieval of default prop object', t => {
	const props = getDefaultBaseProps();

	t.true('backgroundColor' in props);
	t.is(props.backgroundColor, 'inherit');

	t.true('borderColor' in props);
	t.is(props.borderColor, 'inherit');

	t.true('borderWidth' in props);
	t.is(props.borderWidth, 'none');

	t.true('className' in props);
	t.is(props.className, '');

	t.true('color' in props);
	t.is(props.color, 'inherit');

	t.true('contentEditable' in props);
	t.false(props.contentEditable);

	t.true('disabled' in props);
	t.false(props.disabled);

	t.true('id' in props);
	t.is(props.id, '');

	t.true('location' in props);
	t.is(props.location, Location.none);

	t.true('noedit' in props);
	t.false(props.noedit);

	t.true('noripple' in props);
	t.false(props.noripple);

	t.true('selected' in props);
	t.false(props.selected);

	t.true('sizing' in props);
	t.is(props.sizing, Sizing.normal);

	t.true('style' in props);
	t.true(_.isEmpty(props.style));

	t.true('visible' in props);
	t.true(props.visible);
});
