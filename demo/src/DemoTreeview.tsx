"use strict";

const debug = require("debug")("DemoTreeview");

import autobind from "autobind-decorator";
import * as React from "react";
import styled from "styled-components";
import {
	Break,
	Direction,
	Option,
	TreeItem,
	Treeview,
	TreeviewData,
	TreeviewSelectedId
} from "../../dist/bundle";
import {StyledContainer} from "./helpers";

interface DemoData extends TreeviewData {
	note?: string;
}

export interface DemoTreeviewState {
	menuPosition: boolean;
	noscroll: boolean;
	nosubtitles: boolean;
	selectedId: TreeviewSelectedId;
	selectNew: boolean;
	treeData: DemoData[];
}

export const TreeviewStyledContainer: any = styled(StyledContainer)`
	height: 750px;
`;

export default class DemoTreeview extends React.Component<
	any,
	DemoTreeviewState
> {
	constructor(props: any) {
		super(props);
		debug("creating");

		this.state = {
			menuPosition: false,
			noscroll: false,
			nosubtitles: false,
			selectedId: null,
			selectNew: false,
			treeData: [
				{
					title: "1.0",
					subtitle: "a, b,c",
					expanded: true,
					note: "some test data",
					children: [
						{title: "1.1", subtitle: "x, y, z"},
						{title: "1.2"},
						{title: "1.3"}
					]
				},
				{
					title: "2.0",
					subtitle: "d, e,f",
					expanded: true,
					children: [{title: "2.1"}, {title: "2.2"}, {title: "2.3"}]
				},
				{
					title: "3.0",
					subtitle: "g, h, i",
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
	private handleDisableScroll(selected: boolean) {
		this.setState({noscroll: selected});
	}

	@autobind
	private handleDisableSubtitles(selected: boolean) {
		this.setState({nosubtitles: selected});
	}

	@autobind
	private handleExpand(treeData: TreeItem[]) {
		debug("expanding tree: %O", treeData);
	}

	@autobind
	private handleInit(treeData: TreeItem[]) {
		debug("Initializing the treeData structure");
		this.setState({treeData});
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
		this.setState({selectedId: node.id});
	}

	@autobind
	private handleSelectNew(selected: boolean) {
		this.setState({selectNew: selected});
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
		debug("render -> props: %O, state: %O", this.props, this.state);

		return (
			<TreeviewStyledContainer id='treeviewExample' title='Treeview'>
				<Option
					disabled={this.props["disabled"]}
					onSelection={this.handleMenuPosition}
					text='Select the option to put the menu on the bottom'
				/>
				<Break sizing={this.props["sizing"]} />
				<Option
					disabled={this.props["disabled"]}
					onSelection={this.handleSelectNew}
					text='Check this to select new node when created (default stays with parent)'
				/>
				<Break sizing={this.props["sizing"]} />
				<Option
					disabled={this.props["disabled"]}
					onSelection={this.handleDisableScroll}
					text='Check this to disable horizontal scrolling'
				/>
				<Break sizing={this.props["sizing"]} />
				<Option
					disabled={this.props["disabled"]}
					onSelection={this.handleDisableSubtitles}
					text='Check this to disable subtitles in the node'
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
					isVirtualized={false}
					noscroll={this.state.noscroll}
					nosubtitles={this.state.nosubtitles}
					notooltip
					onAdd={this.handleAdd}
					onChange={this.handleChange}
					onCollapse={this.handleCollapse}
					onDelete={this.handleDelete}
					onExpand={this.handleExpand}
					onInit={this.handleInit}
					onSearch={this.handleSearch}
					onSelection={this.handleSelect}
					onUpdate={this.handleUpdate}
					selectedId={this.state.selectedId}
					selectNew={this.state.selectNew}
					sizing={this.props["sizing"]}
					treeData={this.state.treeData}
				/>
			</TreeviewStyledContainer>
		);
	}
}
