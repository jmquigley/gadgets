'use strict';

import {mount} from 'enzyme';
import * as fs from 'fs';
import * as React from 'react';
import {join} from 'util.join';
import {Editor, getDefaultEditorProps} from '../../dist/bundle';

beforeEach(() => {
	document.body.innerHTML = fs.readFileSync(
		join(process.cwd(), 'test', 'fixture', 'index.html'),
		'utf8'
	);
});

test('Test retrieval of the Editor props object', () => {
	const props = getDefaultEditorProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test creation of an Editor instance', () => {
	const ctl = mount(
		<Editor content="test content" />
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});
