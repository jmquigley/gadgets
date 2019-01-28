'use strict';

const debug = require('debug')('DemoTreeview');

import autobind from 'autobind-decorator';
import * as React from 'react';
import {
	Treeview,
	TreeviewItem
} from '../../dist/bundle';
import {StyledContainer} from '../app';

export interface DemoTreeviewState {
	treeData: TreeviewItem[];
}

export default class DemoTreeview extends React.Component<any, DemoTreeviewState> {

	constructor(props: any) {
		super(props);
		debug('creating');

		this.state = {
			treeData: [
				{title: '1.0', expanded: true, data: 'some test data', children: [
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
			]
		};
	}

	@autobind
	private handleAdd(tvi: TreeviewItem, treeData: TreeviewItem[]) {
		debug('adding node to tree at parent: %O, treeData: %O', tvi, treeData);
		this.setState({treeData});
	}

	@autobind
	private handleChange(treeData: any) {
		debug('changing tree: %O', treeData);
		this.setState({treeData});
	}

	@autobind
	private handleDelete(tvi: TreeviewItem, treeData: TreeviewItem[]) {
		debug('removing node from tree: %O, treeData: %O', tvi, treeData);
		this.setState({treeData});
	}

	@autobind
	private handleSelect(tvi: TreeviewItem) {
		debug(tvi);
	}

	public render() {
		return (
			<StyledContainer id="treeviewExample" title="Treeview">
				<Treeview
					disabled={this.props['disabled']}
					height="640px"
					notooltip
					onAdd={this.handleAdd}
					onChange={this.handleChange}
					onDelete={this.handleDelete}
					onSelect={this.handleSelect}
					sizing={this.props['sizing']}
					treeData={this.state.treeData}
				/>
			</StyledContainer>
		);
	}
}
