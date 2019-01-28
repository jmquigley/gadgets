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
		debug('adding node to tree: %o, treeData: %O', tvi.node.title, treeData);
		this.setState({treeData});
	}

	@autobind
	private handleChange(treeData: any) {
		debug('changing tree: %O', treeData);
		this.setState({treeData});
	}

	@autobind
	private handleCollapse(treeData: any) {
		debug('collapsing tree: %O', treeData);
	}

	@autobind
	private handleDelete(tvi: TreeviewItem, treeData: TreeviewItem[]) {
		debug('removing node from tree: %o, treeData: %O', tvi.node.title, treeData);
		this.setState({treeData});
	}

	@autobind
	private handleExpand(treeData: any) {
		debug('expanding tree: %O', treeData);
	}

	@autobind
	private handleSearch(tvi: TreeviewItem) {
		debug('found search node: %o', tvi.node.title);
	}

	@autobind
	private handleSelect(tvi: TreeviewItem) {
		debug('selecting node %o: %O', tvi.node.title, tvi);
	}

	@autobind
	private handleUpdate(current: TreeviewItem, previous: TreeviewItem, treeData: TreeviewItem[]) {
		debug('updating -> current: %O, previous: %O', current, previous, treeData);
		this.setState({treeData});

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
					onCollapse={this.handleCollapse}
					onDelete={this.handleDelete}
					onExpand={this.handleExpand}
					onSearch={this.handleSearch}
					onSelect={this.handleSelect}
					onUpdate={this.handleUpdate}
					sizing={this.props['sizing']}
					treeData={this.state.treeData}
				/>
			</StyledContainer>
		);
	}
}
