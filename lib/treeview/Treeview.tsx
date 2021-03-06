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
 * import {TreeItem, Treeview} from 'gadgets';
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
 *     onChange={(treeData: TreeItem[]) => this.setState({treeData})}
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
 * - `onInit(treeData: TreeItem[])` - Invoked when the constructor first builds the
 * internal tree from the props treeData it may not have all parent/child keys.
 * This callback will send back a sanitized version of the treeData structure when
 * the tree is initialized.  This is only called once.
 * - `onSearch(node: TreeItem)` - Invoked when a search is performed.  It returns
 * the current item found in the search.  This callback is also called when moving
 * to/from previous/next the title.
 * - `onSelection(node: TreeItem)` - Invoked when a tree item is selected.  The node
 * selected is passed to the callback.  The node that was selected is also highlighted.
 * - `onUpdate(currentNode: TreeItem, previousNode: TreeItem, treeData: TreeItem[])` -
 * Invoked when the contents of a tree node (title) have been changed.  It passes
 * a reference to the new node (current), the previous node before the change, and the
 * new treeData array after the change was applied.
 *
 * #### Styles
 * - `ui-treeview` - Root style applied to the SortableTree component wrapper.
 * - `ui-treeview-container` - applied to a div that surrounds the tree control and the
 * toolbar used to control it.
 * this is where the height of the control is handled.
 * - `ui-treeview-toolbar` - applied to the search toollbar
 *
 * #### Properties
 * - `addAsFirstChild=true {boolean}` - when set to true new nodes are added at
 * the front of the parent.  Otherwise they are added to the end.  The default is
 * to add them to the front.
 * - `defaultTitle='New Title' {string}` - When a new node is added this title is
 * used as the placeholder label.
 * - `direction=Direction.top {Direction}` - Determines the location of the search
 * toolbar.  If set to Direction.top it is at the top of the component.  If set to
 * Direction.bottom it is on the bottom.
 * - `height="15em" {string}` - The height of the treeview container.  This must
 * be set or the tree will not display anything.
 * - `kbAdd="" {string}` - keyboard combination to add a new node as a child
 * of the selected node.
 * - `kbCollapseAll="ctrl+-" {string}` - keyboard combination to collapse all
 * nodes.
 * - `kbDelete="" {string}` - keyboard combination to remove the node that is
 * selected.
 * - `kbExpandAll="ctrl+=" {string}` - keyboard combination to expand all nodes.
 * - `nodeWidth="20em" {string}` - the width of the text nodes that are displayed.
 * - `noscroll=false {boolean}` - turns off the scroll bars when the width/height
 * of all nodes expands past the right or bottom edge of the display container.
 * - `nosearch=false {boolean}` - turns off the search toolbar for the widget
 * - `nosubtitles=false {boolean}` - turns the node subtitle display on or off
 * It is on by default.
 * - `selectedId=null {number|string}` - the id value of the node that should
 * be selected.  Only use this if the parent component that will wrap this one
 * needs to control what is selected in the component.
 * - `selectNew=true {boolean}` - When a new node is added it is selected by
 * default (true).  If this property is false, then the parent remains selected
 * when a child node is added.
 * - `treeData=[] {TreeItem[]}` - The data structure that describes the
 * tree hierarchy (see example above).
 * - `usehidden=true {boolean}` - by default the add/delete buttons are hidden on
 * each of the nodes.  They are revealed when hovering over the node.  This behavior
 * can be turned off by setting this prop to false.
 *
 * @module Treeview
 */

import autobind from "autobind-decorator";
import * as React from "react";
import {HotKeys} from "react-hotkeys";
import SortableTree, {ExtendedNodeData, NodeData} from "react-sortable-tree";
import styled from "styled-components";
import {sp} from "util.constants";
import {GeneralTree, GeneralTreeItem} from "util.ds";
import {nilEvent} from "util.toolbox";
import {Button} from "../button/Button";
import {Container} from "../container/Container";
import {Divider} from "../divider/Divider";
import {Item} from "../item/Item";
import {Label} from "../label/Label";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	Color,
	defaultBaseProps,
	Direction,
	disabled,
	fontStyle,
	invisible,
	Sizing,
	Wrapper
} from "../shared";
import {TextField} from "../textField/TextField";
import {TitleLayout} from "../title/Title";
import {Toolbar} from "../toolbar/Toolbar";

export type TreeviewSelectedId = string | number;

export interface TreeviewData {
	title?: string;
	subtitle?: string;
	expanded?: boolean;
	[key: string]: any;
}

export {NodeData, ExtendedNodeData};
export type TreeItem = GeneralTreeItem<TreeviewData>;

export interface TreeviewProps extends BaseProps {
	addAsFirstChild: boolean;
	defaultTitle: string;
	direction: Direction;
	isVirtualized: boolean;
	kbAdd: string;
	kbCollapseAll: string;
	kbDelete: string;
	kbExpandAll: string;
	nodeWidth?: string;
	noscroll?: boolean;
	nosearch?: boolean;
	nosubtitles?: boolean;
	onAdd?: (node: TreeItem, treeData: TreeItem[]) => void;
	onChange?: (treeData: TreeItem[]) => void;
	onCollapse?: (treeData: TreeItem[]) => void;
	onDelete?: (node: TreeItem, treeData: TreeItem[]) => void;
	onExpand?: (treeData: TreeItem[]) => void;
	onInit?: (treeData: TreeItem[]) => void;
	onSearch?: (node: TreeItem) => void;
	onSelection?: (node: TreeItem) => void;
	onUpdate?: (
		node: TreeItem,
		previous: TreeItem,
		treeData: TreeItem[]
	) => void;
	selectedId?: TreeviewSelectedId;
	selectNew: boolean;
	treeData: TreeItem[];
	usehidden?: boolean;
}

export interface TreeviewState extends BaseState {
	matches?: NodeData[];
	search?: string;
	searchFocusIndex?: number;
	searchFoundCount?: number;
	selectedId?: TreeviewSelectedId;
}

const SortableTreeView: any = styled(SortableTree)`
	${(props: TreeviewProps) => disabled(props)}
	${(props: TreeviewProps) =>
		props.sizing && fontStyle[props.sizing]}

	.rst__rowContents {
		align-items: unset;
		border-radius: 0;
		padding: 0 0 0 1px;

		&:hover .rst__rowSubtitle,
		&:hover .ui-label {
			color: ${(props: TreeviewProps) => props.theme.color};
		}
	}

	.rst__rowLabel {
		padding-right: 0;
		width: 100%;

		&:hover .ui-item {
			background-color: ${(props: TreeviewProps) =>
				props.theme.itemHoverColor};
		}
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
		margin-bottom: 6px;
	}

	.rst__rowSubtitle {
		padding-left: 3px;
	}

	.rst__rowWrapper {
		padding: 8px 0 2px 0;
	}

	.rst__virtualScrollOverride {
		overflow: ${(props: TreeviewProps) =>
			props.noscroll ? "hidden" : "auto"} !important;
	}
`;

const StyledButton: any = styled(Button)``;

const StyledItem: any = styled(Item)`
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

const StyledSubtitleLabel: any = styled(Label)`
	color: ${(props: TreeviewProps) =>
		props.selected
			? props.theme.selectedForegroundColor
			: props.theme.color};
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

const TreeviewContainer: any = styled(HotKeys)`
	${(props: TreeviewProps) => invisible(props)}

	display: flex;
	flex-direction: column;
	flex-grow: 1;
	height: 100%;
`;

const TreeviewWrapper: any = styled(Container)`
	display: block;
	flex: 1;
	overflow: ${(props: TreeviewProps) =>
		props.noscroll ? "hidden" : "auto"} !important;
	z-index: 0;
`;

export class Treeview extends BaseComponent<TreeviewProps, TreeviewState> {
	public static defaultProps: TreeviewProps = {
		...defaultBaseProps,
		addAsFirstChild: true,
		defaultTitle: "New Title",
		direction: Direction.top,
		height: "15em",
		isVirtualized: true,
		kbAdd: "ctrl+alt+n",
		kbCollapseAll: "ctrl+-",
		kbDelete: "ctrl+alt+d",
		kbExpandAll: "ctrl+=",
		minHeight: "15em",
		nodeWidth: "20em",
		noscroll: false,
		nosearch: false,
		nosubtitles: false,
		onAdd: nilEvent,
		onChange: nilEvent,
		onCollapse: nilEvent,
		onDelete: nilEvent,
		onExpand: nilEvent,
		onInit: nilEvent,
		onSearch: nilEvent,
		onSelection: nilEvent,
		onUpdate: nilEvent,
		selectNew: true,
		treeData: [],
		usehidden: true
	};

	private _rowHeights = {
		[Sizing.xxsmall]: 45,
		[Sizing.xsmall]: 45,
		[Sizing.small]: 45,
		[Sizing.normal]: 52,
		[Sizing.large]: 70,
		[Sizing.xlarge]: 80,
		[Sizing.xxlarge]: 90
	};
	private _td: GeneralTree<TreeItem>;
	private _toolbar: any;

	constructor(props: TreeviewProps) {
		super("ui-treeview", Treeview, props, {
			matches: [],
			search: "",
			searchFocusIndex: 0,
			searchFoundCount: 0,
			selectedId: "selectedId" in props ? props.selectedId : null
		});

		this._toolbar = this.buildToolbar();

		this.buildKeyMap({
			kbAdd: this.handleAdd,
			kbCollapseAll: this.handleNodeCollapse,
			kbDelete: this.handleKeyboardDelete,
			kbExpandAll: this.handleNodeExpand
		});

		// Internally the component manages a general tree struture to aid in
		// adding/removing nodes from the given input tree structure.
		this._td = new GeneralTree<TreeItem>({
			treeData: this.props.treeData,
			testing: this.props.testing
		});

		this.props.onInit([...this._td.treeData]);
	}

	get rowHeight() {
		return this._rowHeights[this.props.sizing];
	}

	private buildToolbar() {
		const buttonStyles = {
			backgroundColor: this.theme.backgroundColor,
			borderColor: this.theme.buttonColor,
			color: this.theme.buttonColor
		};
		const {searchFocusIndex, searchFoundCount} = this.state;
		let toolbar: any = null;

		if (!this.props.nosearch) {
			toolbar = (
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
					<TextField
						onChange={this.handleSearch}
						onClear={this.clearSearch}
						placeholder='search'
						style={buttonStyles}
						useclear
						value={this.state.search}
						width='10rem'
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
					<Label
						text={searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
					/>
					<Label text=' / ' />
					<Label text={searchFoundCount} />
				</StyledToolbar>
			);
		}

		return toolbar;
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
		const treeIndex: number = ext.treeIndex;
		const node: TreeItem = ext.node as TreeItem;
		const self = this;

		function handleCustomClick(clickedNode: TreeItem) {
			return () => {
				self.debug("handleCustomClick -> %O", clickedNode);
				self.clearSearch();
				self.handleSelection(clickedNode);
			};
		}

		function handleCustomDelete(deletedNode: TreeItem) {
			return () => {
				self.handleDelete(deletedNode);
			};
		}

		// overrides the string title to use Item in its place.  This allows for
		// the + add a new node under this one or to remove the current node
		const newNode = {
			title: (
				<StyledItem
					hiddenRightButton={this.props.usehidden}
					id={this.keys.at(treeIndex)}
					key={this.keys.at(treeIndex)}
					layout={TitleLayout.none}
					noripple
					onClick={handleCustomClick(node)}
					onUpdate={(_previous: string, title: string) => {
						this.handleNodeUpdate(title, node);
					}}
					rightButton={
						<StyledButton
							iconName='times'
							onClick={handleCustomDelete(node)}
						/>
					}
					selected={node.id === this.state.selectedId}
					sizing={this.props.sizing}
					title={node.title as string}
				/>
			),
			subtitle: (
				<StyledSubtitleLabel
					onClick={handleCustomClick(node)}
					selected={node.id === this.state.selectedId}
					sizing={BaseComponent.prev(this.props.sizing)}
					text={this.props.nosubtitles ? sp : node.subtitle}
					noedit
				/>
			),
			className: node.id === this.state.selectedId ? "ui-selected" : ""
		};

		this.debug("customNodeProperties -> %O, node: %O", newNode, node);

		return newNode;
	}

	@autobind
	private handleAdd() {
		if (
			!this.props.disabled &&
			this.state.selectedId != null &&
			!this.props.nosearch
		) {
			this.clearSearch();

			const parentNode: TreeItem = this._td.find(this.state.selectedId);
			parentNode.expanded = true;

			const node = this._td.insert(
				{
					expanded: true,
					parentId: parentNode.id,
					title: this.props.defaultTitle
				},
				this.props.addAsFirstChild
			);

			if (this.props.selectNew) {
				this.setState(
					{
						selectedId: node.id
					},
					() => {
						this.handleSelection(node);
					}
				);
			}

			this.props.onAdd(node, [...this._td.treeData]);
		}
	}

	@autobind
	private handleChange(td: TreeItem[]) {
		if (!this.props.disabled) {
			this.props.onChange(td);
		}
	}

	@autobind
	private handleDelete(deletedNode: TreeItem) {
		if (!this.props.disabled) {
			this.clearSearch();

			this._td.remove(deletedNode.id);
			this.props.onDelete(deletedNode, [...this._td.treeData]);

			if (this._td.empty) {
				// add a node to the empty tree to ensure it always has one node
				// this also forces the selection of this node
				const newNode = this._td.insert(
					{
						expanded: true,
						parentId: null,
						title: this.props.defaultTitle
					},
					this.props.addAsFirstChild
				);

				this.props.onAdd(newNode, [...this._td.treeData]);
				this.handleSelection(newNode);
			} else {
				if (deletedNode.parentId == null) {
					this.handleSelection(this._td.first);
				} else {
					this.handleSelection(this._td.find(deletedNode.parentId));
				}
			}
		}
	}

	@autobind
	private handleKeyboardDelete() {
		if (!this.props.disabled) {
			const node = this._td.find(this.state.selectedId);
			if (node) {
				this.handleDelete(node);
			}
		}
	}

	@autobind
	private handleNextMatch() {
		if (!this.props.nosearch) {
			const {searchFocusIndex, searchFoundCount} = this.state;
			if (searchFoundCount > 0) {
				this.setState({
					searchFocusIndex: (searchFocusIndex + 1) % searchFoundCount
				});
			}
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
		if (!this.props.nosearch) {
			this.clearSearch();
			this._td.walk((it: TreeItem) => {
				it.expanded = expanded;
			});

			const newTreeData = [...this._td.treeData];

			if (expanded) {
				this.props.onExpand(newTreeData);
			} else {
				this.props.onCollapse(newTreeData);
			}

			this.handleChange(newTreeData);
		}
	}

	@autobind
	private handleNodeUpdate(title: string, node: TreeItem) {
		if (!this.props.disabled) {
			this.clearSearch();

			const previousNode: TreeItem = {...node};
			node.title = title != null ? title : this.props.defaultTitle;

			this.props.onUpdate(node, previousNode, [...this._td.treeData]);
		}
	}

	@autobind
	private handlePreviousMatch() {
		if (!this.props.nosearch) {
			const {searchFocusIndex, searchFoundCount} = this.state;
			if (searchFoundCount > 0) {
				this.setState({
					searchFocusIndex:
						(searchFoundCount + searchFocusIndex - 1) %
						searchFoundCount
				});
			}
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
						this.props.onSearch(
							this.state.matches[searchFocusIndex]
								.node as TreeItem
						);
						this.props.onSelection(
							this.state.matches[searchFocusIndex]
								.node as TreeItem
						);
					}
				}
			);
		}
	}

	@autobind
	private handleSelection(node: TreeItem) {
		if (!this.props.disabled) {
			this.debug("handleSelection -> node: %O", node);
			this.setState({selectedId: node.id});
			this.props.onSelection(node);
		}
	}

	public componentDidUpdate(
		prevProps: TreeviewProps,
		prevState: TreeviewState
	) {
		this.debug(
			"componentDidUpdate -> prevProps: %O, prevState: %O",
			prevProps,
			prevState
		);

		this._td.treeData = this.props.treeData;

		// The subtitle field must be present in all tree structure elements or
		// it breaks the display formatting when the component has a mix of
		// subtitles and no subtitles.
		this._td.walk((it: TreeviewData) => {
			if (
				!("subtitle" in it) ||
				!it["subtitle"] ||
				!it["subtitle"].trim()
			) {
				it["subtitle"] = sp;
			}
		});

		this._toolbar = this.buildToolbar();

		// If there is data, but no current selection id set in the state, then set it
		if (this._td.treeData.length > 0 && this.state.selectedId == null) {
			this.handleSelection(this._td.first);
		}
	}

	public render() {
		super.render();

		return (
			<Wrapper {...this.props} name={this.name}>
				<TreeviewContainer
					className='ui-treeview-container'
					handlers={this.keyHandler}
					keyMap={this.keyMap}
					style={this.state.style}
				>
					{this.props.direction === Direction.top
						? this._toolbar
						: null}
					<TreeviewWrapper {...this.props} className={this.className}>
						<SortableTreeView
							generateNodeProps={this.customNodeProperties}
							isVirtualized={this.props.isVirtualized}
							noscroll={this.props.noscroll}
							onChange={this.handleChange}
							rowHeight={this.rowHeight}
							searchFinishCallback={this.handleSearchFinish}
							searchFocusOffset={this.state.searchFocusIndex}
							searchQuery={this.state.search}
							treeData={this.props.treeData}
						/>
					</TreeviewWrapper>
					{this.props.direction !== Direction.top
						? this._toolbar
						: null}
				</TreeviewContainer>
			</Wrapper>
		);
	}
}

export default Treeview;
