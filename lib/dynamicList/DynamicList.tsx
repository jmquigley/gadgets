/**
 * The `DynamicList` control is a specialized List control that
 * can be manipulated by the user.  They can add/remove/select items
 * from it.  The control takes an initial list to seed the control,
 * but then items can be dynamically added/removed.
 *
 *  Some of the features include:
 *
 * - Add new items with the "+" button
 * - Sort the list in ascending/descending order
 * - Incrementally search for items
 * - List is divided into pages for performance
 *
 * #### Examples:
 *
 * ```javascript
 * import {DynamicList} from 'gadgets';
 *
 * <DynamicList
 *     items={{
 *         title1: widget1
 *         title2: widget2
 *         title1: widget3
 *     }}
 *     onDelete={(title: string) => {
 *         console.log(`Deleting item from list: ${title}`);
 *     }}
 *     onNew={(title: string) => {
 *         console.log(`Adding new item to list: ${title}`);
 *     }}
 *     onSelect={(title: string) => {
 *         console.log(`Selected item: ${title}`);
 *     }}
 *     pageSizes={[10, 20, 30]}
 *     title="Dynamic List Test"
 * />
 * ```
 *
 * #### Events
 * - `onBlur` - Invoked when a list item control loses focus.
 * - `onClick` - Invoked when a list item is clicked.
 * - `onDelete(title: string)` - This event is executed when an
 * item is removed form the list.
 * - `onFocus` - Invoked when a list item is clicked.
 * - `onNew(title: string)` - This event is executed when an
 * item is added to the list.  The title of the new item is a
 * parameter to the callback
 * - `onSelect(title: string)` - Invoked when a list item is selected.
 * The title of the selected item is a parameter to the callback.
 * - `onUpdate(previous: string, title: string)` - When an item is
 * renamed this callback is invoked.  The previous value and the new
 * title are passed to the callback
 *
 * #### Styles
 * - `ui-dynamiclist` - applied to the top level `div` accordion
 * control that holds the list.
 *
 * #### Properties
 * - `items: DynamicListItem ({}}` - An object that holds unique title
 * and widgets in the format `{[title]: widget}`.  Each item in the Object
 * represents a list item.  This is used to seed the control at creation.
 * - `layout: TitleLayout (TitleLayout.dominant)` - How the title/widget
 * will be displayed in the list item (seee the Title control).
 * - `nocollapse: boolean (false)` - Determines if the list can be
 * "rolled up" when the header is clicked.  The default behavior is to
 * allow.  IF this is set to false, then the list can't be collapsed.
 * - `pageSizes: number[] ([25, 50, 100])` - A list of page number sizes that
 * can be used by the pager.  It is used against the total items to
 * determine the total number of pages in the control display.
 * - `sortOrder: SortOrder (SortOrder.ascending)` - The list sort order.  Can
 * be either ascending or descending.
 * - `title: string ('')` - This string value is in the header of the control.
 *
 * @module DynamicList
 */

'use strict';

import {cloneDeep, omit} from 'lodash';
import * as React from 'react';
import {sprintf} from 'sprintf-js';
import {getUUID, nil, nilEvent} from 'util.toolbox';
import {Accordion, AccordionItem} from '../accordion';
import {Button} from '../button';
import {ButtonDialog} from '../buttonDialog';
import {DialogBox, DialogBoxType} from '../dialogBox';
import {List, ListFooter, ListItem} from '../list';
import {defaultPageSizes, Pager} from '../pager';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	Sizing,
	SortOrder
} from '../shared';
import {TextField} from '../textField';
import {TitleLayout} from '../title';

export interface DynamicListItem {
	[key: string]: any;
}

export interface DynamicListProps extends BaseProps {
	items?: DynamicListItem;
	layout?: TitleLayout;
	nocollapse?: boolean;
	onBlur?: any;
	onClick?: any;
	onDelete?: any;
	onFocus?: any;
	onNew?: any;
	onSelect?: any;
	onUpdate?: any;
	pageSizes?: number[];
	sortOrder?: SortOrder;
	title?: any;
}

export function getDefaultDynamicListProps(): DynamicListProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			collapsable: false,
			items: {},
			layout: TitleLayout.dominant,
			nocollapse: false,
			onBlur: nilEvent,
			onClick: nilEvent,
			onDelete: nilEvent,
			onFocus: nilEvent,
			onNew: nilEvent,
			onSelect: nilEvent,
			onUpdate: nilEvent,
			pageSizes: defaultPageSizes,
			sortOrder: SortOrder.ascending,
			title: ''
		}));
}

export interface DynamicListState {
	items?: DynamicListItem;
	page?: number;
	pageSize?: number;
	search?: string;
	showConfirm?: boolean;
	showNew?: boolean;
	sortOrder?: SortOrder;
	totalItems?: number;
}

export class DynamicList extends BaseComponent<DynamicListProps, DynamicListState> {

	public static defaultProps: DynamicListProps = getDefaultDynamicListProps();

	private readonly _baseMessage: string = 'Are you sure you want to delete %s?';
	private _count: number = 0;
	private _dialog: any = null;
	private _emptyListItem: any = null;
	private _footer: any = null;
	private _footerID: string = getUUID();
	private _keys: string[] = [];
	private _listItems: any = {};
	private _pager: any = null;
	private _pagerID: string = getUUID();
	private _previousPage: number = 1;
	private _previousSize: Sizing = this.styling.prev.type;
	private _qDelete: string = '';
	private _selection: string = '';
	private _startSearch: boolean = true;

	constructor(props: DynamicListProps) {
		super(props, require('./styles.css'));

		this._count = Object.keys(props.items).length;

		this.state = {
			items: Object.assign({}, props.items),
			page: 1,
			pageSize: props.pageSizes[0],
			search: '',
			showConfirm: false,
			showNew: false,
			sortOrder: props.sortOrder,
			totalItems: this._count
		};

		this.createNewItem = this.createNewItem.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleNewItem = this.handleNewItem.bind(this);
		this.handleNewPageSize = this.handleNewPageSize.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleSortAscending = this.handleSortAscending.bind(this);
		this.handleSortDescending = this.handleSortDescending.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.hideEdit = this.hideEdit.bind(this);

		this._emptyListItem = (
			<ListItem
				focus
				key={getUUID()}
				onBlur={this.handleBlur}
				onKeyDown={this.handleKeyDown}
				onChange={this.handleNewItem}
				title=""
				useedit
				widget={null}
			/>
		);

		this._dialog = (
			<List>
				<ListItem
					key={getUUID()}
					onClick={this.handleSortAscending}
					title="ascending"
				/>
				<ListItem
					key={getUUID()}
					onClick={this.handleSortDescending}
					title="descending"
				/>
			</List>
		);

		this.shouldComponentUpdate(props, this.state);
	}

	get dialog() {
		return this._dialog;
	}

	get emptyListItem() {
		return this._emptyListItem;
	}

	get footer() {
		return this._footer;
	}

	get pager() {
		return this._pager;
	}

	get previousSize() {
		return this._previousSize;
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
		for (let i = 0; i < (this.state.pageSize - this._keys.length); i++) {
			listItems.push(
				<ListItem
					disabled
					key={`fillerListItem-${i}`}
					noedit
					title="&nbsp;"
				/>
			);
		}

		listItems.push(this._footer);

		return listItems;
	}

	private buildTitle() {
		return `${this.props.title} - (${this._count} items)`;
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

	/**
	 * Sets the control into a new item mode.  This will show the input control and
	 * wait for user input.
	 */
	private createNewItem() {
		this.setState({
			showNew: !this.state.showNew
		});
	}

	private handleBlur(e?: any) {
		this.hideEdit();
		this.props.onBlur(e);
	}

	/**
	 * Receives the name of an element to remove from the List.  This will remove it
	 * from the state and remove its ListItem control that was generated for it.
	 * @param title {string} the title to remove from the list
	 * @param cb {Function} a callback function that is executed when the delete
	 * state event update completes.
	 */
	private handleDelete(title: string, cb: any = nil) {
		if (title in this.state.items) {
			delete this._listItems[title];

			this.setState({
				items: omit(this.state.items, title),
				totalItems: this.state.totalItems - 1
			}, () => {
				this.props.onDelete(title);
				cb(title);
			});
		}
	}

	private handleDeleteConfirm(selection: boolean) {
		if (selection) {
			this.handleDelete(this._qDelete);
		}
		this._qDelete = '';
		this.setState({showConfirm: false});
	}

	private handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
		if (e.key === 'Escape') {
			this.hideEdit();
		}
	}

	/**
	 * When the data in the input control is changed/added, this event handler is
	 * called to process it.  This happens when the label within the ListItem for
	 * new items is changed.
	 * @param title {string} the title that will be added to the list
	 * @param cb {Function} a callback function that is executed when the update is
	 * complete
	 */
	private handleNewItem(title: string, widget: any = null, cb: any = nil) {
		if (title.trim()) {
			this.setState({
				items: Object.assign(this.state.items, {[title]: widget}),
				showNew: false,
				totalItems: this.state.totalItems + 1
			}, () => {
				this.props.onNew(title);
				cb(title);
			});
		}
	}

	private handleNewPageSize(pageSize: number) {
		if (pageSize !== this.state.pageSize) {
			this.setState({
				pageSize: pageSize
			});
		}
	}

	private handlePageChange(page: number) {
		if (page !== this.state.page) {
			this._previousPage = this.state.page;
			this.setState({
				page: page
			});
		}
	}

	private handleSearch(e: React.FormEvent<HTMLSelectElement>) {
		const val: string = (e.target as HTMLSelectElement).value;

		if (this._startSearch) {
			this._previousPage = this.state.page;
			this._startSearch = false;
		}

		if (val === '') {

			// If there is a selection title, check to see if it was a new
			// selection from the search.  If it is is, then set
			// a new page number by setting previous.  If it is not, then
			// ignore.
			if (this._selection !== '') {
				const selectionPage = this.computePageByItem(this._selection);
				if (selectionPage !== this._previousPage) {
					this._previousPage = selectionPage;
				}
			}

			this._startSearch = true;
		}

		this.setState({
			page: (val === '') ? this._previousPage : 1,
			search: val
		});
	}

	private handleSelect(title: string) {
		if (this._selection !== title) {
			this._selection = title;
			this.props.onSelect(title);
		} else {
			this._selection = '';
		}
	}

	private handleSortAscending() {
		this.setState({
			sortOrder: SortOrder.ascending
		});
	}

	private handleSortDescending() {
		this.setState({
			sortOrder: SortOrder.descending
		});
	}

	private handleUpdate(previous: string, title: string) {
		this.handleNewItem(title, this.state.items[previous], () => {
			this.handleDelete(previous, () => {
				this.props.onUpdate(previous, title);
			});
		});
	}

	private hideEdit() {
		this.setState({
			showNew: false
		});
	}

	public componentWillReceiveProps(nextProps: DynamicListProps) {
		if (nextProps.sortOrder !== this.state.sortOrder) {
			this.setState({
				sortOrder: nextProps.sortOrder
			});
		}
	}

	public shouldComponentUpdate(nextProps: DynamicListProps, nextState: DynamicListState): boolean {

		for (const title in nextState.items) {
			if (!(title in this._listItems)) {
				const deletor = () => {
					this._qDelete = title;
					this.setState({showConfirm: true});
				};

				this._listItems[title] = (
					<ListItem
						id={title}
						key={title}
						hiddenRightButton
						layout={this.props.layout}
						onClick={this.props.onClick}
						onBlur={this.handleBlur}
						onFocus={this.props.onFocus}
						onSelect={this.handleSelect}
						onUpdate={this.handleUpdate}
						rightButton={
							<Button
								className={this.styles.dynamicListDeleteButton}
								iconName="times"
								onClick={deletor}
							/>
						}
						title={title}
						widget={nextState.items[title]}
					/>
				);
			}
		}

		// Compute which items should be in the current list
		const start: number = ((nextState.page - 1) * nextState.pageSize);
		const end: number = start + nextState.pageSize;

		if (nextState.search !== '') {
			this._keys = Object.keys(this._listItems).filter((val: string) => {
				return (val.indexOf(nextState.search) === -1) ? false : true;
			}).sort();
		} else {
			this._keys = Object.keys(this._listItems).sort();
		}

		this._count = this._keys.length;

		if (nextState.sortOrder === SortOrder.descending) {
			this._keys = this._keys.reverse();
		}

		this._keys = this._keys.slice(start, end);

		this._pager = (
			<Pager
				disabled={nextState.search === '' ? false : true}
				initialPage={nextState.page}
				initialPageSize={nextState.pageSize}
				key={this._pagerID}
				onChangePageSize={this.handleNewPageSize}
				onSelect={this.handlePageChange}
				pageSizes={nextProps.pageSizes}
				sizing={this.previousSize}
				totalItems={nextState.totalItems}
				useinput
			/>
		);

		this._footer = (
			<ListFooter
				key={this._footerID}
				layout={TitleLayout.third}
				title={
					<TextField
						onChange={this.handleSearch}
						placeholder="search"
						type="search"
						value={nextState.search}
					/>
				}
				widget={this._pager}
			/>
		);

		// Compute updated styles
		super.resetStyles(nextProps);
		this.classes.push('ui-dynamiclist');
		this.classes.push(this.styles.dynamicList);
		super.buildStyles(nextProps);
		return true;
	}

	public render() {
		return (
			<Accordion className={this.classes.join(' ')}>
				<AccordionItem
					initialToggle={true}
					leftButton={
						<ButtonDialog
							iconName="bars"
						>
						{this.dialog}
						</ButtonDialog>
					}
					nocollapse={this.props.nocollapse}
					noedit
					nohover={this.props.nocollapse}
					noripple={this.props.nocollapse}
					rightButton={
						<Button
							iconName="plus"
							onClick={this.createNewItem}
						/>
					}
					title={this.buildTitle()}
				>
					<List alternating>
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
		);
	}
}
