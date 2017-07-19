// TODO: add DynamicList documentation
// TODO: add DynamicList implementation

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {getUUID, nil, nilEvent} from 'util.toolbox';
import {Accordion, AccordionItem} from '../accordion';
import {Button} from '../button';
import {ButtonDialog} from '../buttonDialog';
import {List, ListFooter, ListItem} from '../list';
import {defaultPageSizes, Pager} from '../pager';
import {Sizing} from '../shared';
import {TextField} from '../textField';

import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	SortOrder
} from '../shared';

export interface DynamicListProps extends BaseProps {
	items?: string[];
	onClick?: any;
	onBlur?: any;
	onDelete?: any;
	onFocus?: any;
	onNew?: any;
	pageSizes?: number[];
	title?: any;
}

export function getDefaultDynamicListProps(): DynamicListProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			items: [],
			onBlur: nilEvent,
			onClick: nilEvent,
			onDelete: nilEvent,
			onFocus: nilEvent,
			onNew: nilEvent,
			pageSizes: defaultPageSizes,
			title: ''
		}));
}

export interface DynamicListState {
	items?: string[];
	page?: number;
	pageSize?: number;
	search?: string;
	showNew?: boolean;
	sortOrder?: SortOrder;
	totalItems?: number;
}

export class DynamicList extends BaseComponent<DynamicListProps, DynamicListState> {

	public static defaultProps: DynamicListProps = getDefaultDynamicListProps();

	private _dialog: any = null;
	private _emptyListItem: any = null;
	private _footer: any = null;
	private _listItems: any = {};
	private _pager: any = null;
	private _previousSize: Sizing = this.styling.prev.type;

	constructor(props: DynamicListProps) {
		super(props, require('./styles.css'));

		this.state = {
			items: props.items.slice(),
			page: 1,
			pageSize: props.pageSizes[0],
			search: '',
			showNew: false,
			sortOrder: SortOrder.ascending,
			totalItems: props.items.length
		};

		this.createNewItem = this.createNewItem.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleNewItem = this.handleNewItem.bind(this);
		this.handleNewPageSize = this.handleNewPageSize.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
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

		const start: number = ((this.state.page - 1) * this.state.pageSize);
		const end: number = start + this.state.pageSize;

		let keys: string[] = Object.keys(this._listItems).sort();

		if (this.state.sortOrder === SortOrder.descending) {
			keys = keys.reverse();
		}
		keys = keys.slice(start, end);

		for (const key of keys) {
			listItems.push(this._listItems[key]);
		}

		// Adds filler for the last items when it is smaller than the page size
		for (let i = 0; i < (this.state.pageSize - keys.length); i++) {
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
		const idx = this.state.items.indexOf(title);

		if (idx !== -1) {
			const arr = this.state.items.slice();
			arr.splice(idx, 1);
			delete this._listItems[title];

			this.setState({
				items: arr,
				totalItems: this.state.totalItems - 1
			}, () => {
				this.props.onDelete(title);
				cb(title);
			});
		}
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
	private handleNewItem(title: string, cb: any = nil) {
		if (title.trim()) {
			this.setState({
				items: [...this.state.items, title],
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
			this.setState({
				page: page
			});
		}
	}

	private handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
		const val: string = ((e.target as HTMLInputElement).value);
		console.log(`search: ${val}, key: ${e.key}`);

		/* this.setState({
		   search: val
		   });*/

		if (e.key === 'Enter') {
			console.log(`search key: ${val}`);
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
		this.handleDelete(previous, () => {
			this.handleNewItem(title);
		});
	}

	private hideEdit() {
		this.setState({
			showNew: false
		});
	}

	public shouldComponentUpdate(nextProps: DynamicListProps, nextState: DynamicListState): boolean {

		this._pager = (
			<Pager
				initialPage={nextState.page}
				initialPageSize={nextState.pageSize}
				key={getUUID()}
				onChangePageSize={this.handleNewPageSize}
				onSelect={this.handlePageChange}
				pageSizes={nextProps.pageSizes}
				sizing={this.previousSize}
				totalItems={nextState.totalItems}
				useinput
			/>
		);

		console.log(`nextState.search: ${nextState.search}`);

		this._footer = (
			<ListFooter
				key={getUUID()}
				title={
					<TextField
						key={`abcdefg`}
						onKeyPress={this.handleSearch}
						type="search"
					/>
				}
				widget={this._pager}
			/>
		);

		for (const title of nextState.items) {

			const deletor = () => {
				this.handleDelete(title);
			};

			if (!(title in this._listItems)) {
				const uuid = getUUID();
				this._listItems[title] = (
					<ListItem
						id={uuid}
						key={uuid}
						hiddenRightButton
						onBlur={this.handleBlur}
						onUpdate={this.handleUpdate}
						rightButton={
							<Button
								iconName="times"
								onClick={deletor}
							/>
						}
						title={title}
					/>
				);
			}
		}

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
					noedit
					rightButton={
						<Button
							iconName="plus"
							onClick={this.createNewItem}
						/>
					}
					title={this.props.title}
				>
					<List alternating>
						{this.buildListItems()}
					</List>
				</AccordionItem>
			</Accordion>
		);
	}
}
