/**
 * A pagination control.  This takes an input size `I` and a page size `P`
 * and breaks it up into N = I/P entries.  The entries are displayed as a
 * list of pages that can be chosen by the user.  When clicking on the page
 * entry a selection event is invoked to tell the user what page was selected.
 * The user is responsible for responding to the event and dealing with the
 * page switch.
 *
 * The component contains two buttons on the front of the list and two buttons
 * at the end of the list to aid in navigation.  The first button moves to the
 * front of the page list.  The second button moves one page back in the list
 * If at the front of the list, then no operation is performed.  The last two
 * buttons are used to move to the end of the list or to move foward one
 * position.
 *
 * The right side of list contains a dialog button with `...`.  This allows
 * the user of the control to change the page size.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Pager} from 'gadgets';
 * <Pager
 *     initialPage="1"
 *     pageSizes={[25,50,100,500]}
 *     sizing={Sizing.normal}
 *     totalItems="2999"
 *     onSelect={
 *         (page: number) => {
 *             console.log(`Clicked on page: ${page}`);
 *         }
 *     }
 *     onSort={
 *         (sortOrder: any) => {
 *             if (sortOrder === SortOrder.ascending) {
 *                 console.log(`Sorting pager in ascending`);
 *             } else {
 *                 console.log(`Sorting pager in descending`);
 *             }
 *         }
 *     }
 *     useinput
 *     />
 * ```
 *
 * The example above would create a `Pager` control that contains 120 page
 * entries to choose from.  The default page size is the first entry in
 * the `pageSizes` array property.
 *
 * This control would also include a `TextField` that allows the user to jump
 * to a page by its number position.
 *
 * #### Events
 * - `onChangePageSize(pageSize: number)` - when the page size of the control
 * is change in the dialog box this event is invoked with the new size.
 * - `onSelect(page: number)` - When the control changes to a new page, this
 * event is invoked.  It will give the new page selection as a parameter.
 * - `onSort(sortOrder: SortOrder)` - When this callback is given, then the
 * dialog button will present an *ascending* and *descending* option.  When one
 * of these are selected, then it will invoke this callback with the selected
 * type.
 *
 * #### Styles
 * - `ui-pager` - The top level style for the control on the `<div>` container.
 *
 * #### Properties
 * - `initialPage: number (1)` - The page to start with in the list display.
 * - `pagesToDisplay: number (3)` - The number of page buttons to show with
 * the control.
 * - `pageSizes: number[] ([25, 50, 100])` - A list of page number sizes that
 * can be used by the pager.  It is used against the total items to
 * determine the total number of pages in the control display.
 * - `totalItems: number (0)` - The total number of items represented by the
 * control.
 * - `useinput: boolean (false)` - If this is true, then a text input is shown
 * with the control that allows the user to jump to a specific page.
 *
 * @module Pager
 */

'use strict';

import {cloneDeep, isEqual, sortBy} from 'lodash';
import * as React from 'react';
import {Keys} from 'util.keys';
import {nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {ButtonDialog} from '../buttonDialog';
import {ButtonText} from '../buttonText';
import {Icon} from '../icon';
import {List, ListDivider, ListItem} from '../list';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	Justify,
	Location,
	Sizing,
	SortOrder
} from '../shared';
import styled, {css} from '../shared/themed-components';
import {TextField} from '../textField';

export const defaultPageSize: number = 25;
export const defaultPageSizes: number[] = [25, 50, 100];

export interface PagerProps extends BaseProps {
	initialPage?: number;
	initialPageSize?: number;
	onChangePageSize?: any;
	onSelect?: any;
	onSort?: any;
	pagesToDisplay?: number;
	pageSizes?: number[];
	totalItems?: number;
	useinput?: boolean;
}

export function getDefaultPagerProps(): PagerProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			initialPage: 1,
			initialPageSize: defaultPageSize,
			onChangePageSize: nilEvent,
			onSelect: nilEvent,
			onSort: null,
			pagesToDisplay: 3,
			pageSizes: cloneDeep(defaultPageSizes),
			sizing: Sizing.normal,
			totalItems: 0,
			useinput: false
		})
	);
}

export interface PagerState {
	currentPage: number;
	currentSort: SortOrder;
	pageSize: number;
}

export const ButtonCSS: any = css`
	flex: 1;
	height: unset;
	padding: 6px 0;
	font-weight: 600;
`;

export const StyledButtonText: any = styled(ButtonText)`
	${ButtonCSS}
`;

export const StyledButton: any = styled(Button)`
	${ButtonCSS}
`;

export class Pager extends BaseComponent<PagerProps, PagerState> {

	public static defaultProps: PagerProps = getDefaultPagerProps();

	private _lastPage: number = 0;
	private _buttonsDisplay: any = [];
	private _buttons: any = [];
	private _dialog: any = null;
	private _dialogKeys: Keys;
	private _fillerKeys: Keys;
	private _fillerIdx: number = 0;
	private _iconCheck: any = null;
	private _iconBlank: any = null;
	private _initialPage: number = 0;
	private _initialPageSize: number = 0;
	private _pageSizes: number[] = cloneDeep(defaultPageSizes);

	constructor(props: PagerProps) {
		super(props, require('./styles.css'));

		this._dialogKeys = new Keys({testing: this.props.testing});
		this._fillerKeys = new Keys({testing: this.props.testing});

		this._rootStyles.add([
			'ui-pager',
			this.styles.pager
		]);

		this.pageSizes = props.pageSizes;
		this.computeInitialPages(props.initialPageSize);

		this.state = {
			currentPage: this.initialPage,
			currentSort: SortOrder.ascending,
			pageSize: this.initialPageSize
		};

		this.bindCallbacks(
			'handleBlur',
			'handleChange',
			'handleDialogSelect',
			'handleKeyPress',
			'handleSelect',
			'handleSortAscending',
			'handleSortDescending',
			'moveToEnd',
			'moveToFront',
			'moveToNext',
			'moveToPrevious',
			'rebuildButtons'
		);

		this._iconBlank = (
			<Icon
				iconName=""
				key={this._fillerKeys.at(this._fillerIdx++)}
				sizing={this.props.sizing}
			/>
		);

		this._iconCheck = (
			<Icon
				iconName="check"
				key={this._fillerKeys.at(this._fillerIdx++)}
				sizing={this.props.sizing}
				style={{
					color: 'green'
				}}
			/>
		);

		this.createButtons();
		this.componentWillUpdate(this.props);
	}

	get currentPage(): number {
		return this.state.currentPage;
	}

	set currentPage(val: number) {
		if (val < 1) {
			val = 1;
		} else if (val > this.lastPage) {
			val = this.lastPage;
		}

		this.setState({currentPage: val});
		this.props.onSelect(val);
	}

	get dialog(): any {
		return this._dialog;
	}

	get initialPage(): number {
		return this._initialPage;
	}

	get initialPageSize(): number {
		return this._initialPageSize;
	}

	get lastPage(): number {
		return this._lastPage;
	}

	/**
	 * Computes the page range based on the currently selected page.  Any page
	 * that would be outside of the range is set to 0 (no page).
	 * @returns {number[]} the list of page numbers associated with the range
	 */
	get pages(): number[] {
		const l: number[] = [];

		const endBlock = this.lastPage - this.props.pagesToDisplay;
		if (this.currentPage > endBlock && this.lastPage >= this.props.pagesToDisplay) {
			for (let i = endBlock + 1; i <= this.lastPage; i++) {
				l.push(i);
			}
		} else {
			l.push(this.currentPage);

			for (let i = 1; i < this.props.pagesToDisplay; i++) {
				if (this.currentPage + i <= this.lastPage) {
					l.push(this.currentPage + i);
				} else {
					l.push(0);
				}
			}
		}

		return l;
	}

	get pageSize(): number {
		return this.state.pageSize;
	}

	set pageSize(val: number) {
		this.setState({pageSize: val});
	}

	get pageSizes(): number[] {
		return this._pageSizes;
	}

	set pageSizes(val: number[]) {
		if (val == null) {
			this._pageSizes = cloneDeep(defaultPageSizes);
		} else {
			if (val.length < 1) {
				this._pageSizes = [defaultPageSize];
			} else {
				this._pageSizes = val;
			}
		}
	}

	/**
	 * Takes the given page size and input props and determines the appropriate initialPage,
	 * lastPage, and initialPageSize.  These variables are saved within the class and
	 * are used to set the state of the current page and the computed page size.
	 * @param props {PagerProps} the set of props that should be used to
	 * compute the initial page information (size, first/last page)
	 */
	private computeInitialPages(pageSize: number, props: PagerProps = this.props) {
		this._initialPageSize = pageSize;
		this._lastPage = this.computeLastPage(this.initialPageSize);
		this._initialPage = Number(props.initialPage);

		if (this._initialPage < 1) {
			this._initialPage = 1;
		} else if (this._initialPage > this._lastPage) {
			this._initialPage = this._lastPage;
		}
	}

	/**
	 * Determines the last page number in the list from the requested
	 * page size value.
	 * @param pageSize {number} The number of elements per page.  Defaults
	 * to the value stored in the state.pageSize
	 * @returns {number} the last page number based on the total items
	 * divided by the pageSize
	 */
	private computeLastPage(pageSize: number = this.pageSize) {
		let size: number = 1;
		if (pageSize > 0) {
			size = Math.ceil(this.props.totalItems / pageSize);
			if (size < 1) {
				size = 1;
			}
		}

		return size;
	}

	/**
	 * Creates the buttons used by the pager.  It saves each button into
	 * a cache of buttons and only creates a page once.  After creation it will
	 * select the appropriate button from the list and use that to form the
	 * display array.
	 */
	private createButtons() {
		this._buttonsDisplay = [];

		for (const page of this.pages) {
			if (page !== 0 && this._buttons[page] == null) {

				this._buttons[page] = (
					<StyledButtonText
						{...this.props}
						justify={Justify.center}
						key={String(page)}
						noicon
						onClick={this.handleSelect}
						sizing={this.prev(this.props.sizing).type}
						text={String(page)}
					/>
				);
			}

			if (page !== 0) {
				if (page === this.currentPage) {
					let selected: string;
					if (this.props.disabled) {
						selected = ' nohover';
					} else {
						selected = ' ui-pager-selected';
					}

					this._buttonsDisplay.push(
						React.cloneElement(this._buttons[page], {
							className: selected,
							disabled: this.props.disabled
						}));
				} else {
					this._buttonsDisplay.push(
						React.cloneElement(this._buttons[page], {
							disabled: this.props.disabled
						}));
				}
			} else {
				this._buttonsDisplay.push(
					<StyledButtonText
						{...this.props}
						justify={Justify.center}
						key={this._fillerKeys.at(this._fillerIdx++)}
						noicon
						disabled
						sizing={this.props.sizing}
						text=""
					/>
				);
			}
		}
	}

	/**
	 * Dynamically creates the popup dialog menu used to select new values for the
	 * control.  The values include navigation and changing the page size.
	 */
	private createDialog(nextProps: PagerProps, nextState: PagerState) {
		const items: any = [];
		const sortOptions = [];
		let idx: number = 0;

		if (nextProps.onSort && typeof nextProps.onSort === 'function' && nextProps.onSort !== nilEvent) {
			sortOptions.push(
				<ListItem
					{...nextProps}
					key={this._dialogKeys.at(idx++)}
					leftButton={
						nextState.currentSort === SortOrder.ascending
						?
						this._iconCheck
						:
						this._iconBlank
					}
					noedit
					onSelect={this.handleSortAscending}
					title="Ascending"
				/>
			);

			sortOptions.push(
				<ListItem
					{...nextProps}
					key={this._dialogKeys.at(idx++)}
					leftButton={
						nextState.currentSort === SortOrder.descending
						?
						this._iconCheck
						:
						this._iconBlank
					}
					noedit
					onSelect={this.handleSortDescending}
					title="Descending"
				/>
			);

			sortOptions.push(<ListDivider key={this._dialogKeys.at(idx++)} />);
		}

		let allFlag: boolean = true;
		for (const val of sortBy(this.pageSizes)) {
			let icon: Icon = null;

			if (nextState.pageSize === val) {
				icon = this._iconCheck;
				allFlag = false;
			} else {
				icon = this._iconBlank;
			}

			items.push(
				<ListItem
					{...nextProps}
					key={this._dialogKeys.at(idx++)}
					leftButton={icon}
					noedit
					onSelect={this.handleDialogSelect}
					title={String(val)}
				/>
			);
		}

		items.push(
			<ListItem
				{...nextProps}
				key={this._dialogKeys.at(idx++)}
				leftButton={allFlag ? this._iconCheck : this._iconBlank}
				noedit
				onSelect={this.handleDialogSelect}
				title="all"
			/>
		);

		this._dialog = (
			<List sizing={nextProps.sizing}>
				{sortOptions}
				<ListItem
					{...nextProps}
					key={this._dialogKeys.at(idx++)}
					leftButton={this._iconBlank}
					noedit
					onSelect={this.moveToFront}
					title="First"
				/>
				<ListItem
					{...nextProps}
					key={this._dialogKeys.at(idx++)}
					leftButton={this._iconBlank}
					noedit
					onSelect={this.moveToEnd}
					title="Last"
				/>
				<ListItem
					{...nextProps}
					key={this._dialogKeys.at(idx++)}
					leftButton={this._iconBlank}
					noedit
					onSelect={this.moveToNext}
					title="Next"
				/>
				<ListItem
					{...nextProps}
					key={this._dialogKeys.at(idx++)}
					leftButton={this._iconBlank}
					noedit
					onSelect={this.moveToPrevious}
					title="Previous"
				/>
				<ListDivider />
				{items}
			</List>
		);
	}

	private handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		this.currentPage = Number((e.target as HTMLInputElement).value);
	}

	private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.currentPage = Number((e.target as HTMLInputElement).value);
	}

	private handleDialogSelect(text: string) {
		let size: number;

		if (text === 'all') {
			size = this.props.totalItems;
		} else {
			size = Number(text);
		}

		this.setState({pageSize: size}, () => {
			// Only change the current page if the new page size makes the current
			// page invalid
			const lastPage = this.computeLastPage(size);
			if (lastPage < this.currentPage) {
				this.currentPage = 1;
			}

			this.props.onSelect(this.currentPage);
			this.props.onChangePageSize(size);
			this.rebuildButtons();
		});
	}

	private handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			this.currentPage = Number((e.target as HTMLInputElement).value);
		}
	}

	private handleSelect(newPage: number) {

		// This is a workaround check.  The createButtons function creates a series
		// of ButtonText controls for each "page".  When the button is clicked this
		// handler is invoked by that button.  It passes the number text for that
		// button to the handler.  This is TEXT and not a number.  This appears to
		// circumvent the type checking for this function.  If this receives a string
		// then the logic for currentPage fails (as computing pages from this string
		// doesn't work).  This check ensures the type for the newPage and converts
		// when it is not a number.
		if (typeof newPage !== 'number') {
			newPage = Number(newPage);
		}

		if (this.currentPage !== newPage) {
			this.currentPage = newPage;
		}
	}

	private handleSortAscending() {
		this.setState({currentSort: SortOrder.ascending});
		this.props.onSort(SortOrder.ascending);
	}

	private handleSortDescending() {
		this.setState({currentSort: SortOrder.descending});
		this.props.onSort(SortOrder.descending);
	}

	private moveToEnd() {
		if (this.currentPage !== this._lastPage) {
			this.currentPage = this.lastPage;
		}
	}

	private moveToFront() {
		if (this.currentPage !== 1) {
			this.currentPage = 1;
		}
	}

	private moveToNext() {
		if (this.currentPage !== this.lastPage) {
			this.currentPage = this.currentPage + 1;
		}
	}

	private moveToPrevious() {
		if (this.currentPage !== 1) {
			this.currentPage = this.currentPage - 1;
		}
	}

	/**
	 * Performs a shallow comparison of two sets of input props.
	 */
	private propsEqual(p1: PagerProps, p2: PagerProps): boolean {
		if (p1.initialPage === p2.initialPage &&
			p1.pagesToDisplay === p2.pagesToDisplay &&
			isEqual(p1.pageSizes, p2.pageSizes) &&
			p1.totalItems === p2.totalItems &&
			p1.useinput === p2.useinput) {
			return true;
		}

		return false;
	}

	/**
	 * When the page size is changed on a button this callback function is used to
	 * to recompute the buttons and redisplay them.
	 *
	 * Without this forced update the buttons will not be redrawn until the
	 * next click on the control.
	 */
	private rebuildButtons() {
		this.computeInitialPages(this.pageSize);
		this.forceUpdate();
	}

	public componentWillReceiveProps(nextProps: PagerProps) {
		if (!this.propsEqual(this.props, nextProps)) {
			this.pageSizes = nextProps.pageSizes;
			this.computeInitialPages(nextProps.initialPageSize, nextProps);

			this.currentPage = this.initialPage;
			this.pageSize = this.initialPageSize;

			this.createDialog(nextProps, this.state);
		}
	}

	public render() {
		this.createButtons();
		this.createDialog(this.props, this.state);

		return (
			<div className={this._rootStyles.classnames}>
				<StyledButton
					{...this.props}
					iconName="angle-double-left"
					onClick={this.moveToFront}
				/>
				<StyledButton
					{...this.props}
					iconName="angle-left"
					onClick={this.moveToPrevious}
				/>
				{this._buttonsDisplay}
				<StyledButton
					{...this.props}
					iconName="angle-right"
					onClick={this.moveToNext}
				/>
				<StyledButton
					{...this.props}
					iconName="angle-double-right"
					onClick={this.moveToEnd}
				/>
				<div className={this.styles.spacer} />
				{this.props.useinput ?
				<TextField
					className={this.styles.pagerInput}
					disabled={this.props.disabled}
					min="1"
					max={String(this._lastPage)}
					onBlur={this.handleBlur}
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPress}
					placeholder={String(this.currentPage)}
					sizing={this.props.sizing}
					type="number"
					value={this.currentPage}
				/>
				:
					null
				}
				<div className={this.styles.spacer} />
				<ButtonDialog
					{...this.props}
					className={this.styles.pagerDialog}
					iconName="ellipsis-v"
					location={Location.top}
					notriangle
					sizing={this.props.sizing}
				>
					{this._dialog}
				</ButtonDialog>
			</div>
		);
	}
}
