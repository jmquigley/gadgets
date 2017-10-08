'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {getDefaultOptionProps, Option} from '../index';

test('Test retrieval of Option props object', () => {
	const props = getDefaultOptionProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Creation of the Option control', () => {
	const ctl = shallow(<Option text="test" selected className="test-class" />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of the Option control', () => {
	const click = sinon.spy();
	const ctl = mount(<Option onClick={click} disabled={true} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button-toggle').first().simulate('click');
	assert(!click.calledOnce);
});

test('Test making the Option control invisible', () => {
	const click = sinon.spy();
	const ctl = mount(<Option onClick={click} visible={false} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button-toggle').first().simulate('click');
	assert(!click.calledOnce);
});

test('Test Option control click event', () => {
	const click = sinon.spy();
	const ctl = mount(<Option onClick={click} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-option').first().simulate('click');
	assert(click.calledOnce);
	assert(click.calledWith(true));
});
