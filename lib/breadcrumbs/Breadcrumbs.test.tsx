"use strict";

import {mount} from "enzyme";
import * as React from "react";
import {Sizing} from "../shared";
import {Breadcrumbs, Crumbs, getDefaultBreadcrumbsProps} from "./index";

const items: Crumbs[] = [
	{name: "name1", uri: "http://www.example1.com"},
	{name: "name2", uri: "http://www.example2.com"},
	{name: "name3", uri: "http://www.example3.com"}
];

test("Test retrieval of Breadcrumbs props object", () => {
	const props = getDefaultBreadcrumbsProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

for (const val in Sizing) {
	if (Sizing.hasOwnProperty(val)) {
		const sizing: Sizing = (Sizing as any)[val];

		test(`Create a simple Breadcrumbs control with defaults (${sizing})`, () => {
			const ctl = mount(<Breadcrumbs items={items} sizing={sizing} />);

			expect(ctl).toBeDefined();
			expect(ctl).toMatchSnapshot();
		});
	}
}

test("Create a Breadcrumbs component with custom icon and chevron", () => {
	const ctl = mount(
		<Breadcrumbs chevron='arrow-right' icon='pied-piper' items={items} />
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test("Test making the Breadcrumbs invisible", () => {
	const ctl = mount(<Breadcrumbs items={items} visible={false} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test("Test disabling the Breadcrumbs control", () => {
	const select = jest.fn();
	const ctl = mount(<Breadcrumbs disabled items={items} onSelect={select} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
	expect(select).not.toHaveBeenCalled();
});

test("Test Breadcrumbs select event", () => {
	const select = jest.fn();
	const ctl = mount(<Breadcrumbs items={items} onSelect={select} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-breadcrumbs-name")
		.first()
		.simulate("click");
	expect(select).toHaveBeenCalled();
	expect(select).toHaveBeenCalledWith("name1", "http://www.example1.com");
});
