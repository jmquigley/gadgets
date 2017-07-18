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
import {Pager} from '../pager';

import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	SortOrder
} from '../shared';

export interface DynamicListProps extends BaseProps {
	items?: string[];
	onDelete?: any;
	onNew?: any;
	title?: string;
}

export function getDefaultDynamicListProps(): DynamicListProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			items: [],
			onDelete: nilEvent,
			onNew: nilEvent,
			title: ''
		}));
}

export interface DynamicListState {
	items?: string[];
	showNew?: boolean;
	sortOrder?: SortOrder;
}

export class DynamicList extends BaseComponent<DynamicListProps, DynamicListState> {

	public static defaultProps: DynamicListProps = getDefaultDynamicListProps();

	private _dialog: any = null;
	private _emptyListItem: any = null;
	private _footer: any = null;
	private _listItems: any = {};

	constructor(props: DynamicListProps) {
		super(props, require('./styles.css'));
		this.state = {
			items: props.items.slice(),
			showNew: false,
			sortOrder: SortOrder.ascending
		};

		this.createNewItem = this.createNewItem.bind(this);
		this.handleAscending = this.handleAscending.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleDescending = this.handleDescending.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleNewItem = this.handleNewItem.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);

		this._emptyListItem = (
			<ListItem
				focus
				key={getUUID()}
				onKeyDown={this.handleKeyDown}
				onChange={this.handleNewItem}
				title=""
				useedit
			/>
		);

		this.createDialog();
		this.createFooter();

		this.shouldComponentUpdate(props, this.state);
	}

	get dialog() {
		return this._dialog;
	}

	get footer() {
		return this._footer;
	}

	private buildListItems() {
		const listItems = [];

		if (this.state.showNew) {
			listItems.push(this._emptyListItem);
		}

		let keys: string[] = Object.keys(this._listItems).sort();
		if (this.state.sortOrder === SortOrder.descending) {
			keys = keys.reverse();
		}

		for (const key of keys) {
			listItems.push(this._listItems[key]);
		}

		listItems.push(this.footer);

		return listItems;
	}

	private createDialog() {
		this._dialog = (
			<List>
				<ListItem
					key={getUUID()}
					onClick={this.handleAscending}
					title="ascending"
				/>
				<ListItem
					key={getUUID()}
					onClick={this.handleDescending}
					title="descending"
				/>
			</List>
		);
	}

	private createFooter() {
		this._footer = (
			<ListFooter
				key={getUUID()}
				widget={
					<Pager sizing={this.styling.prev.type} />
				}
			/>
		);
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

	private handleAscending() {
		this.setState({
			sortOrder: SortOrder.ascending
		});
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
				items: arr
			}, () => {
				this.props.onDelete(title);
				cb(title);
			});
		}
	}

	private handleDescending() {
		this.setState({
			sortOrder: SortOrder.descending
		});
	}

	private handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
		if (e.key === 'Escape') {
			this.setState({
				showNew: false
			});
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
				showNew: false
			}, () => {
				this.props.onNew(title);
				cb(title);
			});
		}
	}

	private handleUpdate(previous: string, title: string) {
		this.handleDelete(previous, () => {
			this.handleNewItem(title);
		});
	}

	public shouldComponentUpdate(nextProps: DynamicListProps, nextState: DynamicListState): boolean {
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
