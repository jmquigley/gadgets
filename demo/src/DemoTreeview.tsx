"use strict";

const debug = require("debug")("DemoTreeview");

import autobind from "autobind-decorator";
import * as React from "react";
import {
	Break,
	Direction,
	Option,
	TreeItem,
	Treeview,
	TreeviewData
} from "../../dist/bundle";
import {StyledContainer} from "../app";

interface DemoData extends TreeviewData {
	note?: string;
}

export interface DemoTreeviewState {
	menuPosition: boolean;
	treeData: DemoData[];
}

export default class DemoTreeview extends React.Component<
	any,
	DemoTreeviewState
> {
	constructor(props: any) {
		super(props);
		debug("creating");

		this.state = {
			menuPosition: false,
			treeData: [
				{
					title: "1.0",
					expanded: true,
					note: "some test data",
					children: [{title: "1.1"}, {title: "1.2"}, {title: "1.3"}]
				},
				{
					title: "2.0",
					expanded: true,
					children: [{title: "2.1"}, {title: "2.2"}, {title: "2.3"}]
				},
				{
					title: "3.0",
					expanded: true,
					children: [{title: "3.1"}, {title: "3.2"}, {title: "3.3"}]
				}
			]
		};
	}

	@autobind
	private handleAdd(node: TreeItem, treeData: TreeItem[]) {
		debug("adding node to tree: %O, treeData: %O", node, treeData);
		this.setState({treeData});
	}

	@autobind
	private handleChange(treeData: TreeItem[]) {
		debug("changing tree: %O", treeData);
		this.setState({treeData});
	}

	@autobind
	private handleCollapse(treeData: TreeItem[]) {
		debug("collapsing tree: %O", treeData);
	}

	@autobind
	private handleDelete(node: TreeItem, treeData: TreeItem[]) {
		debug(
			"removing node from tree: %o, treeData: %O",
			node.title,
			treeData
		);
		this.setState({treeData});
	}

	@autobind
	private handleExpand(treeData: TreeItem[]) {
		debug("expanding tree: %O", treeData);
	}

	@autobind
	private handleMenuPosition(selected: boolean) {
		this.setState({menuPosition: selected});
	}

	@autobind
	private handleSearch(node: TreeItem) {
		debug("found search node: %o: %O", node.title, node);
	}

	@autobind
	private handleSelect(node: TreeItem) {
		debug("selecting node %o: %O", node.title, node);
	}

	@autobind
	private handleUpdate(
		current: TreeItem,
		previous: TreeItem,
		treeData: TreeItem[]
	) {
		debug(
			"updating -> current: %O, previous: %O, treeData: %O",
			current,
			previous,
			treeData
		);
		this.setState({treeData});
	}

	public render() {
		return (
			<StyledContainer id='treeviewExample' title='Treeview'>
				<Option
					disabled={this.props["disabled"]}
					onClick={this.handleMenuPosition}
					text='Select the option to put the menu on the bottom'
				/>
				<Break sizing={this.props["sizing"]} />

				<Treeview
					direction={
						this.state.menuPosition
							? Direction.bottom
							: Direction.top
					}
					disabled={this.props["disabled"]}
					height='640px'
					notooltip
					onAdd={this.handleAdd}
					onChange={this.handleChange}
					onCollapse={this.handleCollapse}
					onDelete={this.handleDelete}
					onExpand={this.handleExpand}
					onSearch={this.handleSearch}
					onSelect={this.handleSelect}
					onUpdate={this.handleUpdate}
					selectNew={false}
					sizing={this.props["sizing"]}
					treeData={this.state.treeData}
				/>
			</StyledContainer>
		);
	}
}
