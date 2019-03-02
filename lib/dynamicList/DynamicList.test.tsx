"use strict";

import {mount, shallow} from "enzyme";
import * as React from "react";
import {waitPromise} from "util.wait";
import {DynamicList, getDefaultDynamicListProps} from "./index";

test("Test retrieval of DynamicList props object", () => {
	const props = getDefaultDynamicListProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test("Test creation of a DynamicList control", () => {
	const ctl = shallow(<DynamicList className='test-class' />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test("Test creation of a DynamicList with 3 items", () => {
	const ctl = shallow(
		<DynamicList
			items={{
				title1: {right: "widget1"},
				title2: {right: "widget2"},
				title3: {right: "widget3"}
			}}
			nocollapse
			pageSizes={[10, 20, 30]}
			title='Test List Title'
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test("Test disabling of a Dynamic List control", () => {
	const ctl = shallow(
		<DynamicList
			items={{
				title1: {right: "widget1"},
				title2: {right: "widget2"},
				title3: {right: "widget3"}
			}}
			pageSizes={[10, 20, 30]}
			disabled
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test("Test making a Dynamic List invisible", () => {
	const ctl = shallow(
		<DynamicList
			items={{
				title1: {right: "widget1"},
				title2: {right: "widget2"},
				title3: {right: "widget3"}
			}}
			pageSizes={[10, 20, 30]}
			visible={false}
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test("Test setting the control to noselect", () => {
	const ctl = shallow(
		<DynamicList
			items={{
				title1: {right: "widget1"},
				title2: {right: "widget2"},
				title3: {right: "widget3"}
			}}
			noselect
			pageSizes={[10, 20, 30]}
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test("Test setting an error message", async () => {
	const errmsg = "Test error message";
	const errfn = jest.fn();
	const ctl = mount(
		<DynamicList
			errorMessage={errmsg}
			errorMessageDuration={1}
			items={{
				title1: {right: "widget1"},
				title2: {right: "widget2"},
				title3: {right: "widget3"}
			}}
			onError={errfn}
			pageSizes={[10, 20, 30]}
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	// This test must wait for 2+ seconds before checking for the error
	// callback.  The Toast control within doesn't fade and make the
	// call for ~2 seconds.

	await waitPromise(7)
		.then(() => {
			expect(errfn).toHaveBeenCalled();
			expect(errfn).toHaveBeenCalledWith(errmsg);
		})
		.catch((err: string) => {
			expect(err).toBeNull();
		});
}, 20000);
