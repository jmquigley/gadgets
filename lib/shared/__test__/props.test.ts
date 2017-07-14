'use strict';

import * as _ from 'lodash';
import {getDefaultBaseProps, Location, Sizing} from '../index';

test('Test retrieval of default prop object', () => {
	const props = getDefaultBaseProps();

	expect(props).toBeTruthy();

	expect('backgroundColor' in props).toBe(true);
	expect(props.backgroundColor).toBe('inherit');

	expect('borderColor' in props).toBe(true);
	expect(props.borderColor).toBe('inherit');

	expect('borderWidth' in props).toBe(true);
	expect(props.borderWidth).toBe('none');

	expect('className' in props).toBe(true);
	expect(props.className).toBe('');

	expect('color' in props).toBe(true);
	expect(props.color).toBe('inherit');

	expect('contentEditable' in props).toBe(true);
	expect(props.contentEditable).toBe(false);

	expect('disabled' in props).toBe(true);
	expect(props.disabled).toBe(false);

	expect('id' in props).toBe(true);
	expect(props.id).toBe('');

	expect('location' in props).toBe(true);
	expect(props.location).toBe(Location.none);

	expect('noedit' in props).toBe(true);
	expect(props.noedit).toBe(false);

	expect('noripple' in props).toBe(true);
	expect(props.noripple).toBe(false);

	expect('selected' in props).toBe(true);
	expect(props.selected).toBe(false);

	expect('sizing' in props).toBe(true);
	expect(props.sizing).toBe(Sizing.normal);

	expect('style' in props).toBe(true);
	expect(_.isEmpty(props.style)).toBe(true);

	expect('visible' in props).toBe(true);
	expect(props.visible).toBe(true);
});
