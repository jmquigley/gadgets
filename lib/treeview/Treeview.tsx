/**
 * This component represents data in a hierarchical parent/child view.  The
 * underlying code uses the [react-sortable-tree](https://www.npmjs.com/package/react-sortable-tree)
 * react component written by Chris Fritz.  The [README](https://github.com/fritz-c/react-sortable-tree/blob/master/README.md)
 * for the project shows examples and properties for the component.
 *
 * The control relies on feeding data back into the control via props (as
 * treeData state) to control the contents; the calling app is responsible for
 * the data.  The `treeData` uses the following array of node structures
 * (TreeviewItem), where a node is defined as:
 *
 *     [
 *       {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]},
 *       {title: "string", subtitle: "string", expanded: "boolean", children: [
 *           {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]},
 *           {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]}
 *       ]}
 *       ...
 *     ]
 *
 * Where `title` and `subtitle` are shown on the node as Label.  It is editable
 * by double clicking the text in the node.  The `expanded` boolean will show objects
 * under the parent (if they exist) based on the `children` prop.  The
 * `children` prop is an array on the parent node of the child nodes linked to
 * this parent.  Each of these nodes are also potential parent, etc (recursive
 * relationship).  When the tree data is passed to this component via props a UUID is generated
 * for eacxh node and stored in the *id* key.  Also the children of a parent node are given this
 * id as the *parentId*.  These values are stored on the TreeItem nodes, so these keys and their
 * relationships are available to the caller (via callbacks when changes occur).
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/treeview.png" width="60%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Treeview, TreeviewItem} from 'gadgets';
 *
 * ...
 *
 * this.state = {
 *     treeData: [
 *     {title: '1.0', expanded: true, children: [
 *         {title: '1.1'},
 *         {title: '1.2'},
 *         {title: '1.3'}
 *     ]},
 *     {title: '2.0', expanded: true, children: [
 *         {title: '2.1'},
 *         {title: '2.2'},
 *         {title: '2.3'}
 *     ]},
 *     {title: '3.0', expanded: true, children: [
 *         {title: '3.1'},
 *         {title: '3.2'},
 *         {title: '3.3'}
 *     ]}
 * ];
 *
 * ...
 *
 * <Treeview
 *     height="640px"
 *     onChange={(treeData: TreeviewItem[]) => this.setState({treeData})}
 *     treeData={this.state.treeData}
 * />
 * ```
 *
 * These are the minimum properties required to display the control.
 *
 * ## API
 * #### Events
 * - `onAdd(node: ExtendedNodeData, treeData: TreeItem[])` - Invoked when a new node is
 * added to the tree via the "+" add button of the parent (when highlighting the parent
 *  node). The node sent to the callback represents the node added to the tree.
 * - `onChange(treeData: {TreeItem[]})` - Invoked when something in the tree has
 * changed.  The callback receives an array of TreeItem nodes used to represent the
 * current state of the tree.
 * - `onCollapse(treeData: TreeItem[])` - Invoked when the full tree is collapsed
 * via the collapse all button.
 * - `onDelete(node: TreeItem, treeData: TreeItem[]` - Invoked when a node is
 * removed from the tree.  The node parameter is the node that was deleted.
 * - `onExpand(treeData: TreeItem[])` - Invoked when the full tree is expanded
 * via the expand all button.
 * - `onSearch(node: TreeItem)` - Invoked when a search is performed.  It returns
 * the current item found in the search.  This callback is also called when moving
 * to/from previous/next the title.
 * - `onSelect(node: TreeItem)` - Invoked when a tree item is selected.  The node
 * selected is passed to the callback.  The node that was selected is also highlighted.
 * - `onUpdate(currentNode: TreeItem, previousNode: TreeItem, treeData: TreeItem[])` -
 * Invoked when the contents of a tree node (title) have been changed.  It passes
 * a reference to the new node (current), the previous node before the change, and the
 * new treeData array after the change was applied.
 *
 * #### Styles
 * - `ui-treeview` - Root style applied to the SortableTree component wrapper.
 * - `ui-treeview-container` - applied to a div that surrounds the tree control and the
 * toolbar used to control it..
 * this is where the height of the control is handled.
 * - `ui-treeview-toolbar` - applied to the search toollbar
 *
 * #### Properties
 * - `addAsFirstChild: {boolean} (true)` - when set to true new nodes are added at
 * the front of the parent.  Otherwise they are added to the end.  The default is
 * to add them to the front.
 * - `defaultTitle: {string} ('New Title')` - When a new node is added this title is
 * used as the placeholder label.
 * - `height: {string} ('15em')` - The height of the treeview container.  This must
 * be set or the tree will not display anything.
 * - `nodeWidth: {string} ('20em`)` - the width of the text nodes that are displayed.
 * - `selectNew: {boolean} (true)` - When a new node is added it is selected by
 * default (true).  If this property is false, then the parent remains selected
 * when a child node is added.
 * - `treeData: {TreeItem[]}) ([])` - The data structure that describes the
 * tree hierarchy (see example above).
 * - `usehidden: {boolean} (true) - by default the add/delete buttons are hidden on
 * each of the nodes.  They are revealed when hovering over the node.  This behavior
 * can be turned off by setting this prop to false.
 *
 * @module Treeview
 */

"use strict";

// const debug = require('debug')('Treeview');

import autobind from "autobind-decorator";
import {clone, cloneDeep} from "lodash";
import * as React from "react";
import SortableTree, {ExtendedNodeData, NodeData} from "react-sortable-tree";
import {GeneralTree, GeneralTreeItem} from "util.ds";
import {nilEvent} from "util.toolbox";
import {Button} from "../button";
import {Container} from "../container";
import {Divider} from "../divider";
import {Item} from "../item";
import {Label} from "../label";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	Color,
	Direction,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Sizing,
	Wrapper
} from "../shared";
import styled from "../shared/themed-components";
import {TextField} from "../textField";
import {TitleLayout} from "../title";
import {Toolbar} from "../toolbar";

export interface TreeviewData {
	title?: string;
	subtitle?: string;
	expanded?: boolean;
	[key: string]: any;
}

export type TreeItem = GeneralTreeItem<TreeviewData>;

export interface TreeviewProps extends BaseProps {
	addAsFirstChild: boolean;
	defaultTitle: string;
	direction: Direction;
	isVirtualized: boolean;
	nodeWidth?: string;
	onAdd(node: TreeItem, treeData: TreeItem[]): void;
	onChange(treeData: TreeItem[]): void;
	onCollapse(treeData: TreeItem[]): void;
	onDelete(node: TreeItem, treeData: TreeItem[]): void;
	onExpand(treeData: TreeItem[]): void;
	onSearch(node: TreeItem): void;
	onSelect(node: TreeItem): void;
	onUpdate(node: TreeItem, previous: TreeItem, treeData: TreeItem[]): void;
	selectNew: boolean;
	treeData: TreeItem[];
	usehidden?: boolean;
}

export function getDefaultTreeviewProps(): TreeviewProps {
	return cloneDeep({
		...getDefaultBaseProps(),
		addAsFirstChild: true,
		defaultTitle: "New Title",
		direction: Direction.top,
		height: "15em",
		isVirtualized: true,
		minHeight: "15em",
		nodeWidth: "20em",
		obj: "Treeview",
		onAdd: nilEvent,
		onChange: nilEvent,
		onCollapse: nilEvent,
		onDelete: nilEvent,
		onExpand: nilEvent,
		onSearch: nilEvent,
		onSelect: nilEvent,
		onUpdate: nilEvent,
		selectNew: true,
		treeData: [],
		usehidden: true
	});
}

export interface TreeviewState extends BaseState {
	matches?: NodeData[];
	search?: string;
	searchFocusIndex?: number;
	searchFoundCount?: number;
	selectedId?: string | number;
	td?: GeneralTree<TreeviewData>;
}

export function getDefaultTreeviewState(): TreeviewState {
	return cloneDeep({
		...getDefaultBaseState("ui-treeview"),
		matches: [],
		search: "",
		searchFocusIndex: 0,
		searchFoundCount: 0,
		selectedId: null,
		td: null
	});
}

const SortableTreeView: any = styled(SortableTree)`
	${(props: TreeviewProps) => disabled(props)}
	${(props: TreeviewProps) =>
		props.sizing && fontStyle[props.sizing]}

	.rst__rowContents {
		padding: 0 0 0 1px;
		border-radius: 0;
	}

	.rst__rowLabel {
		padding-right: 0;
		width: 100%;
	}

	.rst__rowSearchMatch {
		outline: none;
		box-shadow: 0 0 14px
			${(props: TreeviewProps) => props.theme.searchMatch};
	}

	.rst__rowSearchFocus {
		outline: none;
		box-shadow: 0 0 14px
			${(props: TreeviewProps) => props.theme.searchFocus};
	}

	.rst__rowTitle {
		font-weight: normal;
	}

	.rst__rowWrapper {
		padding: 5px 0;
	}
`;

const SearchTextField: any = styled(TextField)`
	width: 10rem;
`;

const StyledButton: any = styled(Button)``;

const StyledItem: any = styled(Item)`
	&:hover {
		color: ${(props: TreeviewProps) => props.theme.color};
	}

	&:hover .ui-item-button {
		color: ${(props: TreeviewProps) => props.theme.backgroundColor};
		background-color: ${(props: TreeviewProps) => props.theme.hoverColor};
	}

	.ui-button:hover {
		background-color: ${Color.error} !important;
	}

	.ui-label {
		padding: 8px 2px;
	}
`;

const StyledToolbar: any = styled(Toolbar)`
	border-left: 0;
	border-right: 0;
	${(props: TreeviewProps) =>
		props.direction === Direction.top
			? "border-top: 0;"
			: "border-bottom: 0;"}

	display: block;
	padding: 0.1rem 0.1rem 0.25rem 0.1rem;
	width: 100%;
	z-index: 1;
`;

const TreeviewContainer: any = styled.div`
	${(props: TreeviewProps) => invisible(props)}

	display: flex;
	flex-direction: column;
	flex-grow: 1;
	height: 100%;
`;

const TreeviewWrapper: any = styled(Container)`
	display: block;
	height: 100%;
	overflow: auto;
	z-index: 0;
`;

export class Treeview extends BaseComponent<TreeviewProps, TreeviewState> {
	private _rowHeights = {
		[Sizing.xxsmall]: 45,
		[Sizing.xsmall]: 45,
		[Sizing.small]: 45,
		[Sizing.normal]: 50,
		[Sizing.large]: 70,
		[Sizing.xlarge]: 80,
		[Sizing.xxlarge]: 90
	};

	public static defaultProps: TreeviewProps = getDefaultTreeviewProps();
	public state: TreeviewState = getDefaultTreeviewState();

	constructor(props: TreeviewProps) {
		super(props, Treeview.defaultProps.style);

		this.state = {
			...getDefaultTreeviewState(),
			td: new GeneralTree({
				treeData: this.props.treeData,
				testing: this.props.testing
			})
		};
	}

	get rowHeight() {
		return this._rowHeights[this.props.sizing];
	}

	@autobind
	private clearSearch() {
		this.setState({
			matches: [],
			search: "",
			searchFocusIndex: 0,
			searchFoundCount: 0
		});
	}

	@autobind
	private customNodeProperties(ext: ExtendedNodeData) {
		const node: TreeItem = ext.node as TreeItem;

		// overrides the string title to use Item in its place.  This allows for
		// the + add a new node under this one or to remove the current node
		return {
			title: (
				<StyledItem
					hiddenRightButton={this.props.usehidden}
					layout={TitleLayout.none}
					noripple
					onClick={() => {
						const previousSelectedId: string | number = this.state
							.selectedId;
						this.clearSearch();
						this.setState(
							{
								selectedId: node.id
							},
							() => {
								if (
									previousSelectedId !== this.state.selectedId
								) {
									this.handleSelect(node);
								}
							}
						);
					}}
					onChange={(title: string) =>
						this.handleNodeUpdate(title, node)
					}
					rightButton={
						<StyledButton
							iconName='times'
							onClick={() => this.handleDelete(node)}
						/>
					}
					selected={node.id === this.state.selectedId}
					sizing={this.props.sizing}
					title={node.title as any}
				/>
			),
			className: node.id === this.state.selectedId ? "ui-selected" : ""
		};
	}

	@autobind
	private handleAdd() {
		if (!this.props.disabled && this.state.selectedId != null) {
			this.clearSearch();

			const {td} = this.state;
			const parentNode: TreeItem = td.find(this.state.selectedId);
			parentNode.expanded = true;

			const node = td.insert(
				{
					expanded: true,
					parentId: parentNode.id,
					title: this.props.defaultTitle
				},
				this.props.addAsFirstChild
			);

			if (this.props.selectNew) {
				this.setState({
					selectedId: node.id
				});
			}

			this.props.onAdd(node, clone(td.treeData));
		}
	}

	@autobind
	private handleChange(td: TreeItem[]) {
		if (!this.props.disabled) {
			this.props.onChange(td);
		}
	}

	@autobind
	private handleDelete(node: TreeItem) {
		if (!this.props.disabled) {
			this.clearSearch();

			const {td} = this.state;
			td.remove(node.id);

			if (this.state.selectedId === node.id) {
				this.setState({selectedId: null});
			}

			this.props.onDelete(node, clone(td.treeData));
		}
	}

	@autobind
	private handleNextMatch() {
		const {searchFocusIndex, searchFoundCount} = this.state;
		if (searchFoundCount > 0) {
			this.setState({
				searchFocusIndex: (searchFocusIndex + 1) % searchFoundCount
			});
		}
	}

	@autobind
	private handleNodeExpand() {
		this.handleNodeExpansion(true);
	}

	@autobind
	private handleNodeCollapse() {
		this.handleNodeExpansion(false);
	}

	@autobind
	private handleNodeExpansion(expanded: boolean) {
		this.clearSearch();

		const {td} = this.state;

		td.walk((it: TreeItem) => {
			it.expanded = expanded;
		});

		const newTreeData = clone(td.treeData);

		if (expanded) {
			this.props.onExpand(newTreeData);
		} else {
			this.props.onCollapse(newTreeData);
		}

		this.handleChange(newTreeData);
	}

	@autobind
	private handleNodeUpdate(title: string, node: TreeItem) {
		if (!this.props.disabled) {
			this.clearSearch();

			const previousNode: TreeItem = cloneDeep(node);
			node.title = title != null ? title : this.props.defaultTitle;

			this.props.onUpdate(
				node,
				previousNode,
				clone(this.state.td.treeData)
			);
		}
	}

	@autobind
	private handlePreviousMatch() {
		const {searchFocusIndex, searchFoundCount} = this.state;
		if (searchFoundCount > 0) {
			this.setState({
				searchFocusIndex:
					(searchFoundCount + searchFocusIndex - 1) % searchFoundCount
			});
		}
	}

	@autobind
	private handleSearch(e: React.FormEvent<HTMLInputElement>) {
		const value: string = (e.target as HTMLInputElement).value;
		this.setState({
			search: value
		});
	}

	@autobind
	private handleSearchFinish(matches: ExtendedNodeData[]) {
		const searchFocusIndex: number =
			matches.length > 0
				? this.state.searchFocusIndex % matches.length
				: 0;

		if (matches.length > 0) {
			this.setState(
				{
					selectedId: matches[searchFocusIndex].node.id,
					matches,
					searchFoundCount: matches.length,
					searchFocusIndex
				},
				() => {
					if (matches.length > 0) {
						this.props.onSearch(this.state.matches[searchFocusIndex]
							.node as TreeItem);
						this.props.onSelect(this.state.matches[searchFocusIndex]
							.node as TreeItem);
					}
				}
			);
		}
	}

	@autobind
	private handleSelect(node: TreeItem) {
		if (!this.props.disabled) {
			this.props.onSelect(node);
		}
	}

	public static getDerivedStateFromProps(
		props: TreeviewProps,
		state: TreeviewState
	) {
		const newState: TreeviewState = {...state};

		if (props.treeData.length > 0) {
			newState.td.treeData = props.treeData;
		} else {
			// if the tree is empty, then create an empty node at the root
			const node = newState.td.insert(
				{
					expanded: true,
					parentId: null,
					title: props.defaultTitle
				},
				props.addAsFirstChild
			);

			if (props.selectNew) {
				newState.selectedId = node.id;
			}

			props.onAdd(node, clone(newState.td.treeData));
		}

		return super.getDerivedStateFromProps(props, newState);
	}

	public render() {
		const {searchFocusIndex, searchFoundCount} = this.state;

		const buttonStyles = {
			backgroundColor: this.theme.backgroundColor,
			borderColor: this.theme.buttonColor,
			color: this.theme.buttonColor
		};

		const toolbar = (
			<StyledToolbar
				className='ui-treeview-toolbar'
				direction={this.props.direction}
				sizing={this.props.sizing}
			>
				<Button
					iconName='plus'
					notooltip={this.props.notooltip}
					onClick={this.handleAdd}
					style={buttonStyles}
				/>
				<Divider />
				<Button
					iconName='angle-double-down'
					notooltip={this.props.notooltip}
					onClick={this.handleNodeExpand}
					style={buttonStyles}
				/>
				<Button
					iconName='angle-double-up'
					notooltip={this.props.notooltip}
					onClick={this.handleNodeCollapse}
					style={buttonStyles}
				/>
				<Divider />
				<SearchTextField
					obj='TextField'
					onChange={this.handleSearch}
					onClear={this.clearSearch}
					placeholder='search'
					style={buttonStyles}
					useclear
					value={this.state.search}
				/>
				<Divider />
				<Button
					iconName='caret-left'
					notooltip={this.props.notooltip}
					onClick={this.handlePreviousMatch}
					style={buttonStyles}
				/>
				<Button
					iconName='caret-right'
					notooltip={this.props.notooltip}
					onClick={this.handleNextMatch}
					style={buttonStyles}
				/>
				<Divider />
				<Label text={searchFoundCount > 0 ? searchFocusIndex + 1 : 0} />
				<Label text=' / ' />
				<Label text={searchFoundCount} />
			</StyledToolbar>
		);

		return (
			<Wrapper {...this.props}>
				<TreeviewContainer
					className='ui-treeview-container'
					style={this.state.style}
				>
					{this.props.direction === Direction.top ? toolbar : null}
					<TreeviewWrapper className={this.state.classes.classnames}>
						<SortableTreeView
							generateNodeProps={this.customNodeProperties}
							isVirtualized={this.props.isVirtualized}
							onChange={this.handleChange}
							rowHeight={this.rowHeight}
							searchFinishCallback={this.handleSearchFinish}
							searchFocusOffset={this.state.searchFocusIndex}
							searchQuery={this.state.search}
							treeData={this.state.td.treeData}
						/>
					</TreeviewWrapper>
					{this.props.direction !== Direction.top ? toolbar : null}
				</TreeviewContainer>
			</Wrapper>
		);
	}
}
