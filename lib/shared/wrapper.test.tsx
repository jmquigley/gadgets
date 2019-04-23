"use strict";

import {mount} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {
	getDefaultWrapperProps,
	getDefaultWrapperState,
	Wrapper
} from "./wrapper";

test("Test creation of the Wrapper props object", () => {
	const props = getDefaultWrapperProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultWrapperState();

	assert(state);
	expect(state).toMatchSnapshot();
});

test("Test creation of a default Wrapper", () => {
	const errfn = jest.fn();
	const errmsg = "test error";
	const errinfo = {componentStack: "test stack"};

	const ctl = mount(
		<Wrapper className='test-class' onError={errfn} reset>
			<h1>test header</h1>
		</Wrapper>
	);

	assert(ctl);
	ctl.setState({error: errmsg, errorInfo: errinfo});
	const wrapper = ctl.instance() as Wrapper;
	assert(wrapper);
	wrapper.componentDidCatch(errmsg, errinfo);

	expect(ctl).toMatchSnapshot();
	expect(errfn).toHaveBeenCalled();
	expect(errfn).toHaveBeenCalledWith(errmsg, errinfo);
});

test("Test disabling the Wrapper", () => {
	const errfn = jest.fn();

	const ctl = mount(
		<Wrapper className='test-class' disabled={true} onError={errfn}>
			<h1>test header</h1>
		</Wrapper>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
	expect(errfn).not.toHaveBeenCalled();
});
