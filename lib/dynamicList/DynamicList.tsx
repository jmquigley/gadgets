/**
 * The `DynamicList` control is a specialized List control that can be
 * manipulated by the user.  They can add/remove/select items from it.  The
 * control takes an initial list to seed the control, but then items can be
 * dynamically added/removed.
 *
 * Some of the features include:
 *
 * - Add new items with the "+" button
 * - Sort the list in ascending/descending order
 * - Incrementally search for items
 * - List is divided into pages for performance
 * - A right or left widget can be added to each list item
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/dynamicList.png" width="60%" />
 *
 * ## Examples:
 *
 * #### Simple
 * ```javascript
 * import {DynamicList} from 'gadgets';
 *
 * <DynamicList
 *     errorMessage="Error message"
 *     items={{
 *         title1: {left: widget1, right: widget1}
 *         title2: {left: widget2, right: widget2}
 *         title1: {left: widget3, right: widget3}
 *     }}
 *     onDelete={(title: string) => {
 *         console.log(`Deleting item from list: ${title}`);
 *     }}
 *     onError({message: string} => {
 *         console.log(message);
 *     })
 *     onNew={(title: string) => {
 *         console.log(`Adding new item to list: ${title}`);
 *     }}
 *     onSelection={(title: string) => {
 *         console.log(`Selected item: ${title}`);
 *     }}
 *     onUpdate={(previous: string, title: string) =>
 *         console.log(`previous: ${previous}, title: ${title}`);
 *     }}
 *     pageSizes={[10, 20, 30]}
 *     title="Dynamic List Test"
 * />
 * ```
 *
 * #### With Error Handling
 * This will display an error message at the top of the list and then automatically
 * fade away after 5 seconds.
 *
 * ```javascript
 * import {DynamicList} from 'gadgets';
 *
 * <DynamicList
 *     errorMessage="Show this error message"
 *     errorMessageDuration={3}
 *     items={{
 *         title1: {right: widget1}
 *         title2: {right: widget2}
 *         title1: {right: widget3}
 *     }}
 *     onError={(message: string) => console.log(message)}
 *     pageSizes={[10, 20, 30]}
 *     title="Dynamic List Test"
 * />
 * ```
 *
 * ## API
 * #### Events
 * - `onBlur` - Invoked when a list item control loses focus.
 * - `onClick` - Invoked when a list item is clicked.
 * - `onDelete(title: string)` - This event is executed when an item is removed
 * from the list.
 * - `onError(message: string)` - when an error message is written to the
 * component this callback is invoked.
 * - `onFocus` - Invoked when a list item is clicked.
 * - `onNew(title: string)` - This event is executed when an item is added to
 * the list.  The title of the new item is a parameter to the callback
 * - `onSelection(title: string)` - Invoked when a list item is selected. The title
 * of the selected item is a parameter to the callback.
 * - `onSort(sortOrder: SortOrder)` - Invoked whne the list is sorted.  It will
 * give the selected order to the callback.
 * - `onUpdate(previous: string, title: string)` - When an item is renamed this
 * callback is invoked.  The previous value and the new title are passed to the
 * callback
 *
 * #### Styles
 * - `ui-dynamiclist` - applied to the `div` accordion control that holds the
 * list.
 * - `ui-dynamiclist-container` - applied to the top level container `div` that
 * surrounds the list and the *toast* for error message handling.
 *
 * #### Properties
 * - `errorMessage: {string} ('')` - A message the will be temporarily displayed
 * within the control.  When this message is first set it will be shown and
 * then decay.  It will then invoke the onError callback.
 * - `errorMessageDuration: {number} (5)` - the time in seconds that the
 * error message string will be shown within the control before fading away.
 * Set to five seconds by default.
 * - `items: DynamicListItem ({}}` - An object that holds unique title and
 * widgets in the format `{[title]: {left: widget, right: widget}`.  Each item in
 * the object represents a list item.  A widget, like a button or Option, can
 * be used as supporting widgets in the list.
 * - `layout: TitleLayout (TitleLayout.dominant)` - How the title/widget
 * will be displayed in the list item (seee the Title control).
 * - `nocollapse: boolean (false)` - Determines if the list can be
 * "rolled up" when the header is clicked.  The default behavior is to
 * allow.  IF this is set to false, then the list can't be collapsed.
 * - `noselect {boolean} (false)` - when true the selection highlight is
 * disabled and removed.
 * - `pageSizes: number[] ([25, 50, 100])` - A list of page number sizes that
 * can be used by the pager.  It is used against the total items to
 * determine the total number of pages in the control display.
 * - `sortOrder: SortOrder (SortOrder.ascending)` - The list sort order.  Can
 * be either ascending or descending.
 * - `title: string ('')` - This string value is in the header of the control.
 *
 * @module DynamicList
 */

const debug = require("debug")("gadgets.DynamicList");

import autobind from "autobind-decorator";
import * as React from "react";
import {sprintf} from "sprintf-js";
import styled from "styled-components";
import {sp} from "util.constants";
import {trimHTML} from "util.html";
import {Keys} from "util.keys";
import {nil, nilEvent} from "util.toolbox";
import {Accordion, AccordionItem} from "../accordion";
import {Button} from "../button";
import {DialogBox, DialogBoxType} from "../dialogBox";
import {List, ListFooter, ListItem} from "../list";
import {defaultPageSizes, Pager} from "../pager";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	Color,
	disabled,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Sizing,
	SortOrder,
	Wrapper
} from "../shared";
import {TextField} from "../textField";
import {TitleLayout} from "../title";
import {Toast, ToastLevel} from "../toast";

export interface DynamicListItem {
	[key: string]: any;
}

export interface DynamicListProps extends BaseProps {
	collapsable?: boolean;
	errorMessageDuration?: number;
	items?: DynamicListItem;
	layout?: TitleLayout;
	nocollapse?: boolean;
	noselect?: boolean;
	onBlur?: (e: React.FocusEvent<HTMLLIElement>) => void;
	onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
	onDelete?: (title: string) => void;
	onError?: (message: string) => void;
	onFocus?: (e: React.FocusEvent<HTMLLIElement>) => void;
	onNew?: (title: string, widget: any) => void;
	onSelection?: (title: string) => void;
	onSort?: (sortOrder: SortOrder) => void;
	onUpdate?: (previousTitle: string, title: string) => void;
	pageSizes?: number[];
	sortOrder?: SortOrder;
	title?: any;
}

export function getDefaultDynamicListProps(): DynamicListProps {
	return {
		...getDefaultBaseProps(),
		collapsable: false,
		errorMessage: "",
		errorMessageDuration: 3,
		items: {},
		layout: TitleLayout.dominant,
		nocollapse: false,
		noselect: false,
		obj: "DynamicList",
		onBlur: nilEvent,
		onClick: nilEvent,
		onDelete: nilEvent,
		onError: nilEvent,
		onFocus: nilEvent,
		onNew: nilEvent,
		onSelection: nilEvent,
		onSort: nilEvent,
		onUpdate: nilEvent,
		pageSizes: defaultPageSizes,
		sortOrder: SortOrder.ascending,
		title: sp
	};
}

export interface DynamicListState extends BaseState {
	errorMessage?: string;
	initialToggle?: boolean;
	page?: number;
	pageSize?: number;
	search?: string;
	showConfirm?: boolean;
	showError?: boolean;
	showNew?: boolean;
	sortOrder?: SortOrder;
	totalItems?: number;
}

// TODO: add additional init
export function getDefaultDynamicListState(): DynamicListState {
	return {
		...getDefaultBaseState(),
		errorMessage: "",
		initialToggle: true,
		page: 1,
		pageSize: 0,
		search: "",
		showConfirm: false,
		showError: false,
		showNew: false,
		sortOrder: SortOrder.ascending,
		totalItems: 0
	};
}

const DynamicListContainer: any = styled.div`
	min-width: 200px;
	position: relative;

	${(props: DynamicListProps) => disabled(props)}
	${(props: DynamicListProps) => invisible(props)}
`;

const StyledDeleteButton: any = styled(Button)`
	color: white;
	background-color: silver;

	&:not(.nohover):hover {
		background-color: ${Color.error} !important;
	}
`;

// TODO: these padding values only work on normal sizing
const StyledListFooter: any = styled(ListFooter)`
	padding-left: 3px;

	> .ui-title-widget {
		display: flex;
		padding: 2px;
	}

	> .ui-title {
		padding: 2px;
	}

	> .ui-title > .ui-textfield-container {
		display: flex;
	}
`;

export class DynamicList extends BaseComponent<
	DynamicListProps,
	DynamicListState
> {
	public static defaultProps: DynamicListProps = getDefaultDynamicListProps();

	private readonly _baseMessage: string =
		'Are you sure you want to delete "%s"?';
	private _emptyListItem: any = null;
	private _fillerKeys: Keys;
	private _fillerIdx: number = 0;
	private _footer: any = null;
	private _footerID: string;
	private _keys: string[] = [];
	private _listItems: any = {};
	private _pager: any = null;
	private _pagerID: string;
	private _previousPage: number = 1;
	private _qDelete: string = "";
	private _selection: string = "";
	private _startSearch: boolean = true;

	constructor(props: DynamicListProps) {
		super(props, "ui-dynamiclist", DynamicList.defaultProps.style);

		this._fillerKeys = new Keys({testing: this.props.testing});
		this._footerID = this._fillerKeys.at(this._fillerIdx++);
		this._pagerID = this._fillerKeys.at(this._fillerIdx++);

		for (const [title, widgets] of Object.entries(this.props.items)) {
			this._listItems[title] = this.createListItem(title, widgets);
		}

		this.state = {
			...getDefaultDynamicListState(),
			pageSize: this.props.pageSizes[0],
			sortOrder: this.props.sortOrder,
			totalItems: Object.keys(this._listItems).length
		};

		this._emptyListItem = (
			<ListItem
				focus
				key={this._fillerKeys.at(this._fillerIdx++)}
				onBlur={this.handleBlur}
				onKeyDown={this.handleKeyDown}
				onChange={this.handleNewItem}
				title={sp}
				useedit
				widget={null}
			/>
		);
	}

	private buildListItems() {
		const listItems = [];

		if (this.state.showNew) {
			listItems.push(this._emptyListItem);
		}

		for (const key of this._keys) {
			listItems.push(this._listItems[key]);
		}

		// Adds filler for the last items when it is smaller than the page size
		for (let i = 0; i < this.state.pageSize - this._keys.length; i++) {
			listItems.push(
				<ListItem
					disabled
					key={`fillerListItem-${i}`}
					noedit
					title={sp}
				/>
			);
		}

		listItems.push(this._footer);

		return listItems;
	}

	private buildTitle() {
		return `${this.props.title} - (${this.state.totalItems} items)`;
	}

	/**
	 * Takes the given title and computes the page where this title would
	 * be found.  It takes the current position within the list items and
	 * divides it by the page size to find its current page.
	 * @param title {string} the title to find within the list items
	 * @returns the page number where this item resides.  If it is not
	 * found it will return 1.
	 */
	private computePageByItem(title: string): number {
		const idx = Object.keys(this._listItems).indexOf(title);

		if (idx === -1) {
			return 1;
		}

		return Math.ceil(idx / this.state.pageSize);
	}

	@autobind
	private createListItem(title: string, widgets: any) {
		let right: any = null;
		if ("right" in widgets) {
			right = widgets["right"];
		}

		let left: any = null;
		if ("left" in widgets) {
			left = widgets["left"];
		}

		return (
			<ListItem
				id={title}
				key={title}
				hiddenRightButton
				layout={this.props.layout}
				leftButton={left}
				onClick={this.props.onClick}
				onBlur={this.handleBlur}
				onFocus={this.props.onFocus}
				onSelection={this.handleSelect}
				onUpdate={this.handleUpdate}
				rightButton={
					<StyledDeleteButton
						iconName='times'
						onClick={this.listItemDeletor(title)}
					/>
				}
				title={title}
				widget={right}
			/>
		);
	}

	/**
	 * Sets the control into a new item mode.  This will show the input control
	 * and wait for user input.
	 */
	@autobind
	private createNewItem() {
		this.setState({
			initialToggle: true,
			showNew: !this.state.showNew
		});
	}

	@autobind
	private handleBlur(e: React.FocusEvent<HTMLLIElement>) {
		this.hideEdit();
		this.props.onBlur(e);
	}

	/**
	 * Receives the name of an element to remove from the List.  This will
	 * remove it from the state and remove its ListItem control that was
	 * generated for it.
	 * @param title {string} the title to remove from the list
	 * @param cb {Function} a callback function that is executed when the
	 * delete state event update completes.
	 */
	@autobind
	private handleDelete(title: string, cb: any = nil) {
		if (title in this._listItems) {
			delete this._listItems[title];

			this.setState(
				{
					totalItems: this.state.totalItems - 1
				},
				() => {
					this.props.onDelete(title);
					cb(title);
				}
			);
		}
	}

	@autobind
	private handleDeleteConfirm(selection: boolean) {
		if (selection) {
			this.handleDelete(this._qDelete);
		}
		this._qDelete = "";
		this.setState({showConfirm: false});
	}

	@autobind
	private handleErrorClose() {
		this.setState(
			{
				showError: false
			},
			() => {
				this.props.onError(this.state.errorMessage);
			}
		);
	}

	@autobind
	private handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
		if (e.key === "Escape") {
			this.hideEdit();
		}
	}

	/**
	 * When the data in the input control is changed/added, this event handler
	 * is called to process it.  This happens when the label within the
	 * ListItem for new items is changed.
	 * @param title {string} the title that will be added to the list
	 * @param cb {Function} a callback function that is executed when the update
	 * is complete
	 */
	@autobind
	private handleNewItem(title: string, widget: any = null, cb: any = nil) {
		title = trimHTML(title);
		if (title) {
			this.setState(
				{
					showNew: false,
					totalItems: this.state.totalItems + 1
				},
				() => {
					this.props.onNew(title, widget);
					cb(title);
				}
			);
		} else {
			this.hideEdit();
		}
	}

	@autobind
	private handleNewPageSize(pageSize: number) {
		if (pageSize !== this.state.pageSize) {
			this.setState({
				pageSize: pageSize
			});
		}
	}

	@autobind
	private handlePageChange(page: number) {
		if (page !== this.state.page) {
			this._previousPage = this.state.page;
			this.setState({
				page: page
			});
		}
	}

	@autobind
	private handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		const val: string = (e.target as HTMLInputElement).value;

		if (this._startSearch) {
			this._previousPage = this.state.page;
			this._startSearch = false;
		}

		if (val === "") {
			// If there is a selection title, check to see if it was a new
			// selection from the search.  If it is is, then set
			// a new page number by setting previous.  If it is not, then
			// ignore.
			if (this._selection !== "") {
				const selectionPage = this.computePageByItem(this._selection);
				if (selectionPage !== this._previousPage) {
					this._previousPage = selectionPage;
				}
			}

			this._startSearch = true;
		}

		this.setState({
			page: val === "" ? this._previousPage : 1,
			search: val
		});
	}

	@autobind
	private handleSelect(title: string) {
		if (this._selection !== title) {
			this._selection = title;
			this.props.onSelection(title);
		} else {
			this._selection = "";
		}
	}

	@autobind
	private handleSort(sortOrder: SortOrder) {
		if (sortOrder === SortOrder.ascending) {
			this.setState({sortOrder: SortOrder.ascending});
		} else {
			this.setState({sortOrder: SortOrder.descending});
		}

		this.props.onSort(sortOrder);
	}

	@autobind
	private handleTitleClick(toggleState: boolean) {
		this.setState({initialToggle: toggleState});
	}

	@autobind
	private handleUpdate(previous: string, title: string) {
		title = trimHTML(title);
		if (title !== previous) {
			delete this._listItems[previous];

			this.setState(
				{
					showNew: false,
					totalItems: this.state.totalItems - 1
				},
				() => {
					this.props.onUpdate(previous, title);
				}
			);
		} else {
			this.hideEdit();
		}
	}

	@autobind
	private hideEdit() {
		this.setState({
			showNew: false
		});
	}

	@autobind
	private listItemDeletor(title: string) {
		return () => {
			this._qDelete = title;
			this.setState({showConfirm: true});
		};
	}

	public static getDerivedStateFromProps(
		props: DynamicListProps,
		state: DynamicListState
	) {
		const newState: DynamicListState = {...state};

		if (props.sortOrder !== state.sortOrder) {
			newState.sortOrder = props.sortOrder;
		}

		if (props.errorMessage) {
			debug(
				"getDerivedStateFromProps -> errorMessage: %o",
				props.errorMessage
			);
			newState.errorMessage = props.errorMessage;
			newState.showError = true;
		}

		newState.totalItems = Object.keys(props.items).length;

		return super.getDerivedStateFromProps(props, newState, true);
	}

	/**
	 * An internal convenience method that updates internal components of the
	 * the component.  This could all be pasted into render, but I hate making
	 * large single functions even if react wants to force me to do it.  This
	 * is a consequence of the updates to the react lifecycle.
	 *
	 * @param nextProps {DynamicListProps} the next set of props used to draw the component
	 * @param nextState {DynamicListState} the current state of the component befoer render
	 */
	private _updateWidgets(
		nextProps: DynamicListProps,
		nextState: DynamicListState
	) {
		// Compute which items should be in the current list
		const start: number = (nextState.page - 1) * nextState.pageSize;
		const end: number = start + nextState.pageSize;

		if (nextState.search !== "") {
			this._keys = Object.keys(this._listItems)
				.filter((val: string) => {
					return val.indexOf(nextState.search) === -1 ? false : true;
				})
				.sort();
		} else {
			this._keys = Object.keys(this._listItems).sort();
		}

		if (nextState.sortOrder === SortOrder.descending) {
			this._keys = this._keys.reverse();
		}

		this._keys = this._keys.slice(start, end);

		this._pager = (
			<Pager
				disabled={nextState.search === "" ? false : true}
				initialPage={nextState.page}
				initialPageSize={nextState.pageSize}
				key={this._pagerID}
				onChangePageSize={this.handleNewPageSize}
				onSelection={this.handlePageChange}
				onSort={this.handleSort}
				pageSizes={nextProps.pageSizes}
				sizing={Sizing.small}
				testing={nextProps.testing}
				totalItems={nextState.totalItems}
				useinput
			/>
		);

		this._footer = (
			<StyledListFooter
				key={this._footerID}
				layout={TitleLayout.third}
				ripple={false}
				title={
					<TextField
						onChange={this.handleSearch}
						placeholder='search'
						style={{display: "flex"}}
						type='text'
						useclear
						value={nextState.search}
					/>
				}
				widget={this._pager}
			/>
		);
	}

	public render() {
		this.updateClassName();
		this._updateWidgets(this.props, this.state);

		for (const [title, widgets] of Object.entries(this.props.items)) {
			this._listItems[title] = this.createListItem(title, widgets);
		}

		return (
			<Wrapper {...this.props}>
				<DynamicListContainer
					className='ui-dynamiclist-container'
					disabled={this.props.disabled}
				>
					<Toast
						decay={true}
						duration={this.props.errorMessageDuration}
						level={ToastLevel.error}
						onClose={this.handleErrorClose}
						show={this.state.showError}
						sizing={BaseComponent.prev(this.props.sizing).type}
					>
						{this.state.errorMessage}
					</Toast>
					<Accordion className={this.className}>
						<AccordionItem
							initialToggle={this.state.initialToggle}
							nocollapse={this.props.nocollapse}
							noedit
							nohover={this.props.nocollapse}
							onUpdate={this.handleTitleClick}
							rightButton={
								<Button
									iconName='plus'
									onClick={this.createNewItem}
								/>
							}
							title={this.buildTitle()}
						>
							<List alternating noselect={this.props.noselect}>
								{this.buildListItems()}
							</List>
						</AccordionItem>
						<DialogBox
							dialogType={DialogBoxType.warning}
							message={sprintf(this._baseMessage, this._qDelete)}
							onSelection={this.handleDeleteConfirm}
							show={this.state.showConfirm}
						/>
					</Accordion>
				</DynamicListContainer>
			</Wrapper>
		);
	}
}

export default DynamicList;
