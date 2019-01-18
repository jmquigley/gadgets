'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {getDefaultWrapperProps, Wrapper} from './wrapper';

test('Test creation of the Wrapper props object', () => {
	const props = getDefaultWrapperProps();

	expect(props).toBeTruthy();
	expect(props).toMatchSnapshot();
});

test('Test creation of a default Wrapper', () => {
	const errfn = jest.fn();
	const errmsg = 'test error';
	const errinfo = {componentStack: 'test stack'};

	const ctl = mount(
		<Wrapper
			className="test-class"
			onError={errfn}
			reset
		>
			<h1>test header</h1>
		</Wrapper>
	);

	expect(ctl).toBeTruthy();
	ctl.setState({error: errmsg, errorInfo: errinfo});
	const wrapper = ctl.instance() as Wrapper;
	expect(wrapper).toBeTruthy();
	wrapper.componentDidCatch(errmsg, errinfo);

	expect(ctl).toMatchSnapshot();
	expect(errfn).toHaveBeenCalled();
	expect(errfn).toHaveBeenCalledWith(errmsg, errinfo);
});

test('Test disabling the Wrapper', () => {
	const errfn = jest.fn();

	const ctl = mount(
		<Wrapper
			className="test-class"
			disabled={true}
			onError={errfn}
		>
			<h1>test header</h1>
		</Wrapper>
	);

	expect(ctl).toMatchSnapshot();
	expect(errfn).not.toHaveBeenCalled();
});
