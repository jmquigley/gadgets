'use strict';

import {mockupEnv} from './helpers';
mockupEnv();

import test from 'ava';
import * as _ from 'lodash';
import {getDefaultBaseProps, Location, Size} from '../lib/shared';

test('Test retrieval of default prop object', t => {
	const props = getDefaultBaseProps();

	t.true('backgroundColor' in props);
	t.is(props.backgroundColor, 'inherit');

	t.true('borderColor' in props);
	t.is(props.borderColor, 'inherit');

	t.true('children' in props);
	t.is(props.children, null);

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

	t.true('onBlur' in props);
	t.true(props.onClick != null);

	t.true('onChange' in props);
	t.true(props.onChange != null);

	t.true('onClick' in props);
	t.true(props.onClick != null);

	t.true('onClose' in props);
	t.true(props.onClose != null);

	t.true('onDoubleClick' in props);
	t.true(props.onDoubleClick != null);

	t.true('onKeyPress' in props);
	t.true(props.onKeyPress != null);

	t.true('onKeyDown' in props);
	t.true(props.onKeyDown != null);

	t.true('onMouseOut' in props);
	t.true(props.onMouseOut != null);

	t.true('selected' in props);
	t.false(props.selected);

	t.true('size' in props);
	t.is(props.size, Size.normal);

	t.true('style' in props);
	t.true(_.isEmpty(props.style));

	t.true('visible' in props);
	t.true(props.visible);
});
