/**
 * This component represents data in a hierarchical parent/child view.  The
 * underlying code is a wrapper around the [react-sortable-tree](https://www.npmjs.com/package/react-sortable-tree)
 * component written by Chris Fritz.  The [README](https://github.com/fritz-c/react-sortable-tree/blob/master/README.md)
 * for the project shows examples and properties for the component.
 *
 * The two required properties are `treeData` and `onChange`.  The control relies
 * on feeding data back in to the control as props (via treeData state) to control
 * the contents; the calling app is repsonsible for the data.  The `treeData` uses
 * the following array of node structures (TreeviewItem), where a node is defined as:
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
 * Where `title` and `subtitle` are shown on the node.  The `expanded` boolean
 * will show objects under the parent (if they exist) based on the `children`
 * prop.  The `children` prop is an array on the parent node of the child nodes.
 * Each of these nodes are also potential parent, etc.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/treeview.png" width="40%" />
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
 *     onChange={(treeData: TreeviewItem[]) => this.setState({treeData})}
 *     treeData={this.state.treeData}
 * />
 * ```
 *
 * ## API
 * #### Events
 * - `onChange(treeData: {TreeviewItem[]}) ([])` - The array of TreeItem nodes
 * used to represent the current state of the tree.
 *
 * #### Styles
 * - `ui-treeview` - applied to the SortableTree component on the top `div`
 * - `ui-treeview-container` - applied to a div that surrounds the tree control.
 * this is where the height of the control is handled.
 *
 * #### Properties
 * - `treeData: {TreeviewItem[]}) ([])` - The data structure that describes the
 * tree hierarchy (see example above).
 *
 * @module Treeview
 */

'use strict';

const debug = require('debug')('Treeview');

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import SortableTree, {
	addNodeUnderParent,
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
	onDelete(node: TreeviewItem, treeData: any[]): void;
	onSelect(node: TreeviewItem): void;
	treeData: any[];
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
		onDelete: nilEvent,
		onSelect: nilEvent,
		treeData: []
	});
}

export interface TreeviewState extends BaseState {
	search?: string;
	searchFocusIndex?: number;
	searchFoundCount?: number;
}

export function getDefaultTreeviewState(): TreeviewState {
	return cloneDeep({...getDefaultBaseState('ui-treeview'),
		search: '',
		searchFocusIndex: 0,
		searchFoundCount: null
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
	private customNodeProperties(tvi: TreeviewItem) {
		return {
			title: (
				<StyledItem
					hiddenLeftButton={true}
					hiddenRightButton={true}
					layout={TitleLayout.none}
					leftButton={
						<StyledButtonCircle
							iconName="plus"
							onClick={() => this.handleAdd(tvi)}
							sizing={BaseComponent.prev(this.props.sizing).type}
							style={{
								backgroundColor: this.theme.backgroundColor,
								borderColor: Color.success,
								color: Color.success
							}}
						/>
					}
					onClick={() => this.handleSelect(tvi)}
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
					sizing={this.props.sizing}
					title={tvi.node.title as any}
				/>
			)
		};
	}

	@autobind
	private getNodeKey({treeIndex}: any): number {
		return treeIndex;
	}

	@autobind
	private handleAdd(tvi: TreeviewItem) {
		if (!this.props.disabled) {
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
			this.props.onAdd(tvi, newTreeData.treeData);
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

			this.handleChange(newTreeData);
		});
	}

	@autobind
	private handlePreviousMatch() {
		const {searchFocusIndex, searchFoundCount} = this.state;
		if (searchFoundCount > 0) {
			this.setState({
				searchFocusIndex: Math.abs(searchFocusIndex - 1) % searchFoundCount
			});
		}
	}

	@autobind
	private handleSearch(e: React.FormEvent<HTMLInputElement>) {
		const value: string = (e.target as HTMLInputElement).value;
		this.setState({
			search: value
		}, () => {
			debug('searching for %o', this.state.search);
		});
	}

	@autobind
	private handleSearchFinish(matches: NodeData[]) {
		this.setState({
			searchFoundCount: matches.length,
			searchFocusIndex: matches.length > 0 ? this.state.searchFocusIndex % matches.length : 0
		});
	}

	@autobind
	private handleSelect(tvi: TreeviewItem) {
		this.props.onSelect(tvi);
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
							onClick={this.handleNodeExpand}
							tooltip="expand"
						/>
						<Button
							iconName="angle-double-up"
							onClick={this.handleNodeCollapse}
						/>
						<Divider />
						<SearchTextField
							obj="TextField"
							onChange={this.handleSearch}
							placeholder="search"
							useclear
							value={this.state.search}
						/>
						<Divider />
						<Button
							iconName="caret-left"
							onClick={this.handlePreviousMatch}
						/>
						<Button
							iconName="caret-right"
							onClick={this.handleNextMatch}
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
