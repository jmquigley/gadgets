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
 * Where `title` and `subtitle` are shown on the node as text.  The `expanded` boolean
 * will show objects under the parent (if they exist) based on the `children`
 * prop.  The `children` prop is an array on the parent node of the child nodes linked
 * to this parent.  Each of these nodes are also potential parent, etc (recursive relationship).
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
 * - `onAdd(tvi: TreeviewItem, treeData: TreeviewItem[])` - Invoked when a new node is
 * added to the tree via the "+" add button of the parent (when highlighting the parent
 *  node). The tvi sent to th ecallback represents the node added to the tree.
 * - `onChange(treeData: {TreeviewItem[]})` - Invoked when something in the tree has
 * changed.  The callback receives an array of TreeItem nodes* used to represent the
 * current state of the tree.
 * - `onCollapse(treeData: TreeviewItem[])` - Invoked when the full tree is collapsed
 * via the collapse all button.
 * - `onDelete(tvi: TreeviewItem, treeData: TreeviewItem[]` - Invoked when a node is
 * removed from the tree.  The tvi value is the node that was deleted.
 * - `onExpand(treeData: TreeviewItem[])` - Invoked when the full tree is expanded
 * via the expand all button.
 * - `onSearch(tvi: TreeviewItem)` - Invoked when a search is performed.  It returns
 * the current item found in the search.  This callback is also called when moving
 * to/from previous/next the node.
 * - `onSelect(tvi: TreeviewItem)` - Invoked when a tree item is selected.  The node
 * selected is passed to the callback.  The node that was selected is also highlighted.
 * - `onUpdate(current: TreeviewItem, previous: TreeviewItem, treeData: TreeviewItem[])` -
 * Invoked when the contents of a tree node (title) have been changed.  It passes
 * a reference to the new node (current), the previous node values before the change,
 * and the new treeData array after the change was applied.
 *
 * #### Styles
 * - `ui-treeview` - Root style applied to the SortableTree component wrapper.
 * - `ui-treeview-container` - applied to a div that surrounds the tree control and the
 * toolbar used to control it..
 * this is where the height of the control is handled.
 * - `ui-treeview-toolbar` - applied to the search toollbar
 *
 * #### Properties
 * - `defaultTitle: {string} ('New Title')` - When a new node is added this title is
 * used as the placeholder label.
 * - `treeData: {TreeviewItem[]}) ([])` - The data structure that describes the
 * tree hierarchy (see example above).
 * - `usehidden: {boolean} (true) - by default the add/delete buttons are hidden on
 * each of the nodes.  They are revealed when hovering over the node.  This behavior
 * can be turned off by setting this prop to false.
 *
 * @module Treeview
 */

'use strict';

// const debug = require('debug')('Treeview');

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import SortableTree, {
	addNodeUnderParent,
	changeNodeAtPath,
	getVisibleNodeInfoAtIndex,
	NodeData,
	removeNodeAtPath,
	toggleExpandedForAll,
	TreeItem
} from 'react-sortable-tree';
import {calc, toREM} from 'util.calc';
import {nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {ButtonCircle} from '../buttonCircle';
import {Container} from '../container';
import {Divider} from '../divider';
import {Item} from '../item';
import {Label} from '../label';
import {
	BaseComponent,
	BaseProps,
	BaseState,
	Color,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Sizing,
	Wrapper
} from '../shared';
import styled from '../shared/themed-components';
import {TextField} from '../textField';
import {TitleLayout} from '../title';
import {Toolbar} from '../toolbar';

export type TreeviewItem = TreeItem;

export interface TreeviewProps extends BaseProps {
	defaultTitle: string;
	onAdd(node: TreeviewItem, treeData: any[]): void;
	onChange(treeData: any[]): void;
	onCollapse(treeData: any[]): void;
	onDelete(node: TreeviewItem, treeData: any[]): void;
	onExpand(treeData: any[]): void;
	onSearch(node: TreeviewItem): void;
	onSelect(node: TreeviewItem): void;
	onUpdate(node: TreeviewItem, previous: TreeviewItem, treeData: any[]): void;
	treeData: any[];
	usehidden: boolean;
}

export function getDefaultTreeviewProps(): TreeviewProps {
	return cloneDeep({...getDefaultBaseProps(),
		defaultTitle: 'New Title',
		height: '15em',
		minHeight: '15em',
		minWidth: '26em',
		obj: 'Treeview',
		onAdd: nilEvent,
		onChange: nilEvent,
		onCollapse: nilEvent,
		onDelete: nilEvent,
		onExpand: nilEvent,
		onSearch: nilEvent,
		onSelect: nilEvent,
		onUpdate: nilEvent,
		treeData: [],
		usehidden: true
	});
}

export interface TreeviewState extends BaseState {
	matches?: NodeData[];
	search?: string;
	searchFocusIndex?: number;
	searchFoundCount?: number;
	selectedIndex?: number;
}

export function getDefaultTreeviewState(): TreeviewState {
	return cloneDeep({...getDefaultBaseState('ui-treeview'),
		matches: [],
		search: '',
		searchFocusIndex: 0,
		searchFoundCount: null,
		selectedIndex: 0
	});
}

const SortableTreeView: any = styled(SortableTree)`
	${(props: TreeviewProps) => disabled(props)}
	${(props: TreeviewProps) => props.sizing && fontStyle[props.sizing]}

	.rst__rowContents {
		padding: 0 2px;
	}

	.rst__rowLabel {
		padding-right: 0;
		width: 100%;
	}

	.rst__rowSearchMatch {
		outline: solid 2px ${(props: TreeviewProps) => props.theme.searchMatch};
	}

	.rst__rowSearchFocus {
		outline: solid 2px ${(props: TreeviewProps) => props.theme.searchFocus};
	}

	.rst__rowTitle {
		font-weight: normal;
	}
`;

const SearchTextField: any = styled(TextField)`
	width: 15rem;
`;

const StyledButtonCircle: any = styled(ButtonCircle)``;

const StyledItem: any = styled(Item)``;

const StyledToolbar: any = styled(Toolbar)`
	border-top: 0;
	border-left: 0;
	border-right: 0;
	display: flex;
	padding: 0.25rem 0.25rem 0.5rem 0.25rem;
	width: 100%;
`;

const TreeviewContainer: any = styled.div`
	${(props: TreeviewProps) => invisible(props)}
`;

const TreeviewWrapper: any = styled(Container)``;

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
	}

	get rowHeight() {
		return this._rowHeights[this.props.sizing];
	}

	@autobind
	private clearSearch() {
		this.setState({
			matches: [],
			search: '',
			searchFocusIndex: 0,
			searchFoundCount: 0
		});
	}

	@autobind
	private customNodeProperties(tvi: TreeviewItem) {
		// overrides the string title to use Item in its place.  This allows for
		// the + add a new node under this one or to remove the current node
		return {
			title: (
				<StyledItem
					hiddenLeftButton={this.props.usehidden}
					hiddenRightButton={this.props.usehidden}
					layout={TitleLayout.none}
					leftButton={
						<StyledButtonCircle
							iconName="plus"
							onClick={() => this.handleAdd(tvi)}
							sizing={BaseComponent.prev(this.props.sizing).type}
							style={{
								backgroundColor: this.theme.backgroundColor,
								borderColor: Color.gray,
								color: Color.gray
							}}
						/>
					}
					onClick={() => {
						this.clearSearch();
						this.setState({
							selectedIndex: tvi.treeIndex
						}, () => {
							this.handleSelect(tvi);
						});
					}}
					onChange={(title: string) => this.handleNodeUpdate(title, tvi)}
					rightButton={
						<StyledButtonCircle
							iconName="times"
							onClick={() => this.handleDelete(tvi)}
							sizing={BaseComponent.prev(this.props.sizing).type}
							style={{
								backgroundColor: this.theme.backgroundColor,
								borderColor: Color.error,
								color: Color.error
							}}
						/>
					}
					selected={tvi.treeIndex === this.state.selectedIndex}
					sizing={this.props.sizing}
					title={tvi.node.title as any}
				/>
			),
			className: (tvi.treeIndex === this.state.selectedIndex) ? 'ui-selected' : ''
		};
	}

	@autobind
	private getNodeKey({treeIndex}: any): number {
		return treeIndex;
	}

	@autobind
	private handleAdd(tvi: TreeviewItem) {
		if (!this.props.disabled) {
			this.clearSearch();

			const newTreeData: any = addNodeUnderParent({
				treeData: this.props.treeData,
				getNodeKey: this.getNodeKey,
				parentKey: tvi.treeIndex,
				expandParent: true,
				newNode: {
					title: this.props.defaultTitle
				},
				addAsFirstChild: true
			});

			const node: TreeviewItem = getVisibleNodeInfoAtIndex({
				treeData: newTreeData.treeData,
				index: newTreeData.treeIndex,
				getNodeKey: this.getNodeKey
			});

			this.props.onAdd(node, newTreeData.treeData);
		}
	}

	@autobind
	private handleChange(treeData: TreeviewItem[]) {
		if (!this.props.disabled) {
			this.props.onChange(treeData);
		}
	}

	@autobind
	private handleDelete(tvi: TreeviewItem) {
		if (!this.props.disabled) {
			this.clearSearch();

			const newTreeData: any = removeNodeAtPath({
				getNodeKey: this.getNodeKey,
				path: tvi.path,
				treeData: this.props.treeData
			});

			this.props.onDelete(tvi, newTreeData);
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
		this.setState({
			search: ''
		}, () => {
			const newTreeData: any = toggleExpandedForAll({
				treeData: this.props.treeData,
				expanded
			});

			if (expanded) {
				this.props.onExpand(newTreeData);
			} else {
				this.props.onCollapse(newTreeData);
			}

			this.handleChange(newTreeData);
		});
	}

	@autobind
	private handleNodeUpdate(title: string, tvi: TreeviewItem) {
		if (!this.props.disabled) {
			this.clearSearch();

			const node: TreeviewItem = cloneDeep({...tvi});
			node.node.title = title;

			const newTreeData: any = changeNodeAtPath({
				getNodeKey: this.getNodeKey,
				newNode: {
					title
				},
				path: tvi.path,
				treeData: this.props.treeData
			});

			this.props.onUpdate(node, tvi, newTreeData);
		}
	}

	@autobind
	private handlePreviousMatch() {
		const {searchFocusIndex, searchFoundCount} = this.state;
		if (searchFoundCount > 0) {
			this.setState({
				searchFocusIndex: (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
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
	private handleSearchFinish(matches: NodeData[]) {
		const searchFocusIndex: number =
			matches.length > 0 ? this.state.searchFocusIndex % matches.length : 0;

		if (matches.length > 0) {
			this.setState({
				selectedIndex: matches[searchFocusIndex].treeIndex,
				matches: matches,
				searchFoundCount: matches.length,
				searchFocusIndex
			}, () => {
				if (matches.length > 0) {
					this.props.onSearch(this.state.matches[searchFocusIndex]);
					this.props.onSelect(this.state.matches[searchFocusIndex]);
				}
			});
		}
	}

	@autobind
	private handleSelect(tvi: TreeviewItem) {
		if (!this.props.disabled) {
			this.props.onSelect(tvi);
		}
	}

	public render() {
		// The 0.75 represents the top/bottom padding in rem for the toolbar
		// To compute the proper treeview height we must remove the size taken up by the toolbar
		const toolbarHeight: string = calc(BaseComponent.fontSizeREM(this.props.sizing), '+ 0.75');
		const treeviewHeight: string = calc(toREM(this.props.height), `- ${parseFloat(toolbarHeight)}`);

		const {searchFocusIndex, searchFoundCount} = this.state;

		return (
			<Wrapper {...this.props} >
				<TreeviewContainer
					className="ui-treeview-container"
					style={this.state.style}
				>
					<StyledToolbar
						className="ui-treeview-toolbar"
						sizing={this.props.sizing}
					>
						<Button
							iconName="angle-double-down"
							notooltip={this.props.notooltip}
							onClick={this.handleNodeExpand}
							tooltip="expand"
						/>
						<Button
							iconName="angle-double-up"
							notooltip={this.props.notooltip}
							onClick={this.handleNodeCollapse}
							tooltip="collapse"
						/>
						<Divider />
						<SearchTextField
							obj="TextField"
							onChange={this.handleSearch}
							onClear={this.clearSearch}
							placeholder="search"
							useclear
							value={this.state.search}
						/>
						<Divider />
						<Button
							iconName="caret-left"
							notooltip={this.props.notooltip}
							onClick={this.handlePreviousMatch}
							tooltip="previous search item"
						/>
						<Button
							iconName="caret-right"
							notooltip={this.props.notooltip}
							onClick={this.handleNextMatch}
							tooltip="next search item"
						/>
						<Divider />
						<Label text={searchFoundCount > 0 ? searchFocusIndex + 1 : 0} />
						<Label text=" / " />
						<Label text={searchFoundCount} />
					</StyledToolbar>
					<TreeviewWrapper
						className={this.state.classes.classnames}
						height={treeviewHeight}
					>
						<SortableTreeView
							generateNodeProps={this.customNodeProperties}
							isVirtualized={true}
							onChange={this.handleChange}
							rowHeight={this.rowHeight}
							searchFinishCallback={this.handleSearchFinish}
							searchFocusOffset={this.state.searchFocusIndex}
							searchQuery={this.state.search}
							treeData={this.props.treeData}
						/>
					</TreeviewWrapper>
				</TreeviewContainer>
			</Wrapper>
		);
	}
}
