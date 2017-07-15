'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultLabelProps, Label} from '../index';

test('Test retrieval of default Label props object', () => {
	const props = getDefaultLabelProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a Label control', () => {
	const s: string = 'Test label text';
	const ctl = shallow(<Label className="test-class" text={s} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the disabling of the Label control', () => {
	const s: string = 'Test label text';
	const ctl = mount(<Label disabled text={s} />);

	assert(ctl);

	assert(ctl.prop('disabled'));
	assert(ctl.prop('visible'));
	assert.equal(ctl.find('.ui-label').length, 1);
	assert.equal(ctl.find('.disabled').length, 1);
	assert.equal(ctl.text(), s);
});

test('Test making the Label control invisible', () => {
	const s: string = 'Test label text';
	const ctl = mount(<Label visible={false} text={s} />);

	assert(ctl);

	assert(!ctl.prop('disabled'));
	assert(!ctl.prop('visible'));
	assert.equal(ctl.find('.ui-label').length, 1);
	assert.equal(ctl.find('.invisible').length, 1);
	assert.equal(ctl.text(), s);
});

// TODO: add test for events: blur, change, click, doubleclick, keydown, keypress
