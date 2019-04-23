"use strict";

import {EnumValues as ev} from "enum-values";
import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {Sizing} from "../shared";
import {
	Datagrid,
	DatagridColumn,
	DatagridRow,
	getDefaultDatagridProps,
	getDefaultDatagridState
} from "./index";

const columns: DatagridColumn[] = [
	{key: "id", name: "ID", sortable: true},
	{key: "title", name: "Title"},
	{key: "count", name: "Count"}
];

const rows: Datagridrow[] = [
	{id: 0, title: "row1", count: 20},
	{id: 1, title: "row2", count: 234},
	{id: 2, title: "row3", count: 2255},
	{id: 3, title: "row4", count: 8345}
];

test("Test retrieval of Datagrid props object", () => {
	const props = getDefaultDatagridProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultDatagridState();

	assert(state);
	expect(state).toMatchSnapshot();
});

for (const sizing of ev.getNames(Sizing)) {
	test(`Test creation of a simple Datagrid component (${sizing})`, () => {
		const ctl = mount(
			<Datagrid columns={columns} rows={rows} sizing={Sizing[sizing]} />
		);

		assert(ctl);
		expect(ctl).toMatchSnapshot();
	});
}
