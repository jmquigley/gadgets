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
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/pager.png" width="40%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Pager} from 'gadgets';
 * <Pager
 *     initialPage="1"
 *     pageSizes={[25,50,100,500]}
 *     sizing={Sizing.normal}
 *     totalItems="2999"
 *     onSelection={
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
 * ## API
 * #### Events
 * - `onChangePageSize(pageSize: number)` - when the page size of the control
 * is change in the dialog box this event is invoked with the new size.
 * - `onSelection(page: number)` - When the control changes to a new page, this
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
 * - `initialPage=1 {number}` - The page to start with in the list display.
 * - `pagesToDisplay=3 {number}` - The number of page buttons to show with
 * the control.
 * - `pageSizes=[25, 50, 100] {number[]}` - A list of page number sizes that
 * can be used by the pager.  It is used against the total items to
 * determine the total number of pages in the control display.
 * - `totalItems=0 {number}` - The total number of items represented by the
 * control.
 * - `useinput=false {boolean}` - If this is true, then a text input is shown
 * with the control that allows the user to jump to a specific page.
 *
 * @module Pager
 */

import autobind from "autobind-decorator";
import {sortBy} from "lodash";
import * as React from "react";
import styled, {css} from "styled-components";
import {Keys} from "util.keys";
import {nilEvent} from "util.toolbox";
import {Button} from "../button/Button";
import {ButtonDialog} from "../buttonDialog/ButtonDialog";
import {ButtonText} from "../buttonText/ButtonText";
import {Divider} from "../divider/Divider";
import {Icon} from "../icon/Icon";
import {List} from "../list/List";
import {ListDivider} from "../list/ListDivider";
import {ListItem} from "../list/ListItem";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	defaultBaseProps,
	Justify,
	Location,
	Sizing,
	SortOrder,
	Wrapper
} from "../shared";
import {TextField} from "../textField/TextField";

export const defaultPageSize: number = 25;
export const defaultPageSizes: number[] = [25, 50, 100];

export interface PagerProps extends BaseProps {
	initialPage?: number;
	initialPageSize?: number;
	onChangePageSize?: (size: number) => void;
	onSelection?: (page: number) => void;
	onSort?: (sortOrder: SortOrder) => void;
	pagesToDisplay?: number;
	pageSizes?: number[];
	totalItems?: number;
	useinput?: boolean;
}

export interface PagerState extends BaseState {
	currentPage: number;
	currentSort: SortOrder;
	pageSize: number;
}

const ButtonCSS: any = css`
	flex: 1;
	height: unset;
	padding: 3px 0;
	font-weight: 600;
`;

const DialogListView: any = styled(List)`
	border: unset;
`;

const PagerView: any = styled.div`
	display: inline-flex;
	height: 100%;
	width: 100%;

	.ui-textfield-container {
		flex-direction: unset;
	}

	> .ui-button:first-child {
		border-left: solid 1px ${(props: PagerProps) => props.theme.borderColor};
	}
`;

const StyledButtonDialog: any = styled(ButtonDialog)`
	border: solid 1px ${(props: PagerProps) => props.theme.borderColor};
	flex: none;
	height: unset;
	width: 1rem;
`;

const StyledButtonText: any = styled(ButtonText)`
	${ButtonCSS}
	border-top: solid 1px ${(props: PagerProps) => props.theme.borderColor};
	border-bottom: solid 1px ${(props: PagerProps) => props.theme.borderColor};
	border-right: solid 1px ${(props: PagerProps) => props.theme.borderColor};
`;

const StyledButton: any = styled(Button)`
	${ButtonCSS}
	border-top: solid 1px ${(props: PagerProps) => props.theme.borderColor};
	border-bottom: solid 1px ${(props: PagerProps) => props.theme.borderColor};
	border-right: solid 1px ${(props: PagerProps) => props.theme.borderColor};
`;

const StyledTextField: any = styled(TextField)`
	flex: 1;
`;

export class Pager extends BaseComponent<PagerProps, PagerState> {
	public static readonly defaultProps: PagerProps = {
		...defaultBaseProps,
		initialPage: 1,
		initialPageSize: defaultPageSize,
		onChangePageSize: nilEvent,
		onSelection: nilEvent,
		onSort: null,
		pagesToDisplay: 3,
		pageSizes: defaultPageSizes.slice(),
		sizing: Sizing.normal,
		totalItems: 0,
		useinput: false
	};

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
	private _inputPageField: any = null;
	private _pageSizes: number[] = defaultPageSizes.slice();

	constructor(props: PagerProps) {
		super("ui-pager", Pager, props);

		this._dialogKeys = new Keys({testing: this.props.testing});
		this._fillerKeys = new Keys({testing: this.props.testing});

		this.pageSizes = this.props.pageSizes;
		this.computeInitialPages(this.props.initialPageSize);

		this.initialState = {
			currentPage: this.initialPage,
			currentSort: SortOrder.ascending,
			pageSize: this.initialPageSize
		};

		this._iconBlank = (
			<Icon
				iconName=''
				key={this._fillerKeys.at(this._fillerIdx++)}
				sizing={this.props.sizing}
			/>
		);

		this._iconCheck = (
			<Icon
				iconName='check'
				key={this._fillerKeys.at(this._fillerIdx++)}
				sizing={this.props.sizing}
				style={{
					color: "green"
				}}
			/>
		);

		this.createButtons(this.sanitizeProps(props));
	}

	get currentPage(): number {
		return this.state.currentPage;
	}

	set currentPage(page: number) {
		if (page < 1) {
			page = 1;
		} else if (page > this.lastPage) {
			page = this.lastPage;
		}

		this.setState({currentPage: page}, () => {
			this.props.onSelection(page);
		});
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
		if (
			this.currentPage > endBlock &&
			this.lastPage >= this.props.pagesToDisplay
		) {
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
			this._pageSizes = defaultPageSizes.slice();
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
	private computeInitialPages(
		pageSize: number,
		props: PagerProps = this.props
	) {
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
	private createButtons(props: PagerProps) {
		this._buttonsDisplay = [];

		for (const page of this.pages) {
			if (page !== 0 && this._buttons[page] == null) {
				this._buttons[page] = (
					<StyledButtonText
						justify={Justify.center}
						key={String(page)}
						noicon
						onClick={this.handleSelect}
						sizing={props.sizing}
						text={String(page)}
					/>
				);
			}

			if (page !== 0) {
				if (page === this.currentPage) {
					let selected: string;
					if (props.disabled) {
						selected = " nohover";
					} else {
						selected = " ui-pager-selected";
					}

					this._buttonsDisplay.push(
						React.cloneElement(this._buttons[page], {
							className: selected,
							disabled: props.disabled,
							sizing: props.sizing,
							style: {
								backgroundColor: this.theme
									.selectedBackgroundColor,
								color: this.theme.selectedForegroundColor
							}
						})
					);
				} else {
					this._buttonsDisplay.push(
						React.cloneElement(this._buttons[page], {
							disabled: props.disabled,
							sizing: props.sizing,
							style: {
								backgroundColor: this.theme.backgroundColor,
								color: this.theme.color
							}
						})
					);
				}
			} else {
				this._buttonsDisplay.push(
					<StyledButtonText
						justify={Justify.center}
						key={this._fillerKeys.at(this._fillerIdx++)}
						noicon
						disabled
						sizing={props.sizing}
						text=''
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

		if (
			nextProps.onSort &&
			typeof nextProps.onSort === "function" &&
			nextProps.onSort !== nilEvent
		) {
			sortOptions.push(
				<ListItem
					key={this._dialogKeys.at(idx++)}
					leftButton={
						nextState.currentSort === SortOrder.ascending
							? this._iconCheck
							: this._iconBlank
					}
					noedit
					onSelection={this.handleSortAscending}
					title='Ascending'
				/>
			);

			sortOptions.push(
				<ListItem
					key={this._dialogKeys.at(idx++)}
					leftButton={
						nextState.currentSort === SortOrder.descending
							? this._iconCheck
							: this._iconBlank
					}
					noedit
					onSelection={this.handleSortDescending}
					title='Descending'
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
					key={this._dialogKeys.at(idx++)}
					leftButton={icon}
					noedit
					onSelection={this.handleDialogSelect}
					title={String(val)}
				/>
			);
		}

		items.push(
			<ListItem
				key={this._dialogKeys.at(idx++)}
				leftButton={allFlag ? this._iconCheck : this._iconBlank}
				noedit
				onSelection={this.handleDialogSelect}
				title='all'
			/>
		);

		this._dialog = (
			<DialogListView sizing={nextProps.sizing} noselect>
				{sortOptions}
				<ListItem
					key={this._dialogKeys.at(idx++)}
					leftButton={this._iconBlank}
					noedit
					onSelection={this.moveToFront}
					title='First'
				/>
				<ListItem
					key={this._dialogKeys.at(idx++)}
					leftButton={this._iconBlank}
					noedit
					onSelection={this.moveToEnd}
					title='Last'
				/>
				<ListItem
					key={this._dialogKeys.at(idx++)}
					leftButton={this._iconBlank}
					noedit
					onSelection={this.moveToNext}
					title='Next'
				/>
				<ListItem
					key={this._dialogKeys.at(idx++)}
					leftButton={this._iconBlank}
					noedit
					onSelection={this.moveToPrevious}
					title='Previous'
				/>
				<ListDivider />
				{items}
			</DialogListView>
		);
	}

	private createInputPageField(nextProps: PagerProps) {
		if (nextProps.useinput) {
			let width: string = "4.5em";
			switch (nextProps.sizing) {
				case Sizing.xxsmall:
					width = "1.5em";
					break;
				case Sizing.xsmall:
					width = "2.5em";
					break;
				case Sizing.small:
					width = "3.0em";
					break;
				case Sizing.medium:
					width = "4.5em";
					break;
				case Sizing.large:
					width = "5.0em";
					break;
				case Sizing.xlarge:
					width = "5.5em";
					break;
				case Sizing.xxlarge:
					width = "6.0em";
					break;
				case Sizing.inherit:
					width = "inherit";
					break;
			}

			this._inputPageField = (
				<StyledTextField
					disabled={nextProps.disabled}
					min='1'
					max={String(this._lastPage)}
					onBlur={this.handleBlur}
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPress}
					placeholder={String(this.currentPage)}
					sizing={nextProps.sizing}
					type='number'
					value={this.state.currentPage}
					width={width}
				/>
			);
		}
	}

	/**
	 * Removes non-standard props.  When passing non standard props to a standard element it
	 * will flag warnings in the test runner.  This strips off those props that it complains
	 * about in this component.
	 */
	@autobind
	private sanitizeProps(props: PagerProps) {
		const {onChangePageSize, onSort, ...newProps} = props;

		return newProps;
	}

	@autobind
	private handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		this.currentPage = Number((e.target as HTMLInputElement).value);
	}

	@autobind
	private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.currentPage = Number((e.target as HTMLInputElement).value);
	}

	@autobind
	private handleDialogSelect(text: string) {
		let size: number;

		if (text === "all") {
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

			this.props.onSelection(this.currentPage);
			this.props.onChangePageSize(size);
			this.rebuildButtons();
		});
	}

	@autobind
	private handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			this.currentPage = Number((e.target as HTMLInputElement).value);
		}
	}

	@autobind
	private handleSelect(e: React.MouseEvent<HTMLDivElement>) {
		let newPage: number = Number((e.target as HTMLDivElement).innerText);
		newPage = isNaN(newPage) ? 0 : newPage;

		if (this.currentPage !== newPage) {
			this.currentPage = newPage;
		}
	}

	@autobind
	private handleSortAscending() {
		this.setState({currentSort: SortOrder.ascending});
		this.props.onSort(SortOrder.ascending);
	}

	@autobind
	private handleSortDescending() {
		this.setState({currentSort: SortOrder.descending});
		this.props.onSort(SortOrder.descending);
	}

	@autobind
	private moveToEnd() {
		if (this.currentPage !== this._lastPage) {
			this.currentPage = this.lastPage;
		}
	}

	@autobind
	private moveToFront() {
		if (this.currentPage !== 1) {
			this.currentPage = 1;
		}
	}

	@autobind
	private moveToNext() {
		if (this.currentPage !== this.lastPage) {
			this.currentPage = this.currentPage + 1;
		}
	}

	@autobind
	private moveToPrevious() {
		if (this.currentPage !== 1) {
			this.currentPage = this.currentPage - 1;
		}
	}

	/**
	 * When the page size is changed on a button this callback function is used to
	 * to recompute the buttons and redisplay them.
	 *
	 * Without this forced update the buttons will not be redrawn until the
	 * next click on the control.
	 */
	@autobind
	private rebuildButtons() {
		this.computeInitialPages(this.pageSize);
		this.forceUpdate();
	}

	public render() {
		super.render();

		const props = this.sanitizeProps(this.props);

		this.createButtons(props);
		this.createDialog(props, this.state);
		this.createInputPageField(props);

		this.debug("dialog => %O", this._dialog);

		return (
			<Wrapper {...props} name={this.name}>
				<PagerView className={this.className} style={this.state.style}>
					<StyledButton
						iconName='angle-double-left'
						onClick={this.moveToFront}
					/>
					<StyledButton
						iconName='angle-left'
						onClick={this.moveToPrevious}
					/>
					{this._buttonsDisplay}
					<StyledButton
						iconName='angle-right'
						onClick={this.moveToNext}
					/>
					<StyledButton
						iconName='angle-double-right'
						onClick={this.moveToEnd}
					/>
					<Divider />
					{this._inputPageField}
					<Divider />
					<StyledButtonDialog
						iconName='ellipsis-v'
						location={Location.top}
						notriangle
						sizing={props.sizing}
					>
						{this._dialog}
					</StyledButtonDialog>
				</PagerView>
			</Wrapper>
		);
	}
}

export default Pager;
