'use strict';

import {EnumValues as ev} from 'enum-values';
import {mount} from 'enzyme';
import * as React from 'react';
import {Sizing} from '../shared';
import {
	getDefaultTreeviewProps,
	TreeItem,
	Treeview
} from './index';

const treeData: TreeItem[] = [
	{title: '1.0', expanded: true, children: [
		{title: '1.1'},
		{title: '1.2'},
		{title: '1.3'}
	]},
	{title: '2.0', expanded: true, children: [
		{title: '2.1'},
		{title: '2.2'},
		{title: '2.3'}
	]},
	{title: '3.0', expanded: true, children: [
		{title: '3.1'},
		{title: '3.2'},
		{title: '3.3'}
	]}
];

test('Test retrieval of Treeview props object', () => {
	const props = getDefaultTreeviewProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

for (const sizing of ev.getNames(Sizing)) {
	test(`Test creation of a simple Treeview component (${sizing})`, () => {
		const ctl = mount(
			<Treeview
				sizing={Sizing[sizing]}
				treeData={treeData}
			/>
		);

		expect(ctl).toBeDefined();
		const treeview = ctl.instance() as Treeview;
		expect(treeview).toBeDefined();
		expect(ctl).toMatchSnapshot();
	});
}
