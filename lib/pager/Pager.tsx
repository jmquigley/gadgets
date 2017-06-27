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
 * #### Examples:
 *
 * ```javascript
 * import {Pager} from 'gadgets';
 * <Pager
 *     initialPage="1"
 *     totalItems="299"
 *     sizing={Sizing.normal}
 *     onSelect={
 *         (page: number) => {
 *             console.log(`Clicked on page: ${page}`);
 *         }
 *     }
 *     useinput
 *     />
 * ```
 *
 * The example above would create a `Pager` control that contains 12 page
 * entries to choose from.  It would also include a `TextField` control that
 * allows the user to jump to a page by its number position.
 *
 * #### Events
 * - `onSelect(page: number)` - When the control changes to a new page, this
 * event is invoked.  It will give the new page selection as a parameter.
 *
 * #### Styles
 * - `ui-pager` - The top level style for the control on the `<div>` container.
 *
 * #### Properties
 * - `initialPage: number (1)` - The page to start with in the list
 * - `pagesToDisplay: number (3)` - The number of page buttons to show with
 * the control.
 * - `pageSize: number (25)` - The number of items per page.  It's the divisor
 * against the total items to determine the total number of pages in the
 * control.
 * - `totalItems: number (0)` - The total number of items represented by the
 * control.
 * - `useinput: boolean (false)` - If this is true, then a text input is shown
 * with the control that allows the user to jump to a specific page.
 *
 * @module Pager
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {getUUID, nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {ButtonDialog} from '../buttonDialog';
import {ButtonText} from '../buttonText';
import {BaseComponent, BaseProps, getDefaultBaseProps, Location, Sizing} from '../shared';
import {TextField} from '../textField';

export interface PagerProps extends BaseProps {
	initialPage?: number;
	onSelect?: any;
	pagesToDisplay?: number;
	pageSize?: number;
	totalItems?: number;
	useinput?: boolean;
}

export function getDefaultPagerProps(): PagerProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			initialPage: 1,
			onSelect: nilEvent,
			pagesToDisplay: 3,
			pageSize: 25,
			sizing: Sizing.xsmall,
			totalItems: 0,
			useinput: false
		}));
}

export interface PagerState {
	currentPage: number;
}

export class Pager extends BaseComponent<PagerProps, PagerState> {

	public static defaultProps: PagerProps = getDefaultPagerProps();

	private _initialPage: number = 0;
	private _lastPage: number = 0;
	private _buttonsDisplay: any = [];
	private _buttons: any = [];
	private _buttonStyle: string[] = [];

	constructor(props: PagerProps) {
		super(props, require('./styles.css'));

		this._lastPage = this.computeLastPage();
		this._initialPage = Number(props.initialPage);
		if (this._initialPage < 1) {
			this._initialPage = 1;
		} else if (this._initialPage > this._lastPage) {
			this._initialPage = this._lastPage;
		}

		this.state = {
			currentPage: this._initialPage
		}

		this._buttonStyle.push(this.styles.pagerButton);
		this._buttonStyle.push(this.boxSizeStyle);

		this.createButtons();

		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.moveToEnd = this.moveToEnd.bind(this);
		this.moveToFront = this.moveToFront.bind(this);
		this.moveToNext = this.moveToNext.bind(this);
		this.moveToPrevious = this.moveToPrevious.bind(this);
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

		this.setState({currentPage: val}, () => {
			this.props.onSelect(val);
		});
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
		let l: number[] = [];

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

	componentWillReceiveProps(nextProps: PagerProps) {
		if (!this.propsEqual(this.props, nextProps)) {
			if (this.props.initialPage != nextProps.initialPage) {
				this.setState({currentPage: nextProps.initialPage});
			}

			this._lastPage = this.computeLastPage();
		}
	}

	private computeLastPage() {
		let size: number = 1;
		if (this.props.pageSize > 0) {
			size = Math.ceil(this.props.totalItems / this.props.pageSize);
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

		this.pages.forEach((page: number) => {
			if (page !== 0 && this._buttons[page] == null) {

				this._buttons[page] = (
					<ButtonText
						className={this._buttonStyle.join(' ')}
						key={String(page)}
						noicon
						onClick={() => {this.handleSelect(page)}}
						sizing={this.props.sizing}
						text={String(page)}
						/>
				);
			}

			if (page !== 0) {
				if (page === this.currentPage) {
					this._buttonsDisplay.push(
						React.cloneElement(this._buttons[page], {
							className: this._buttonStyle.join(' ') + ' ui-pager-selected'
						}));
				} else {
					this._buttonsDisplay.push(this._buttons[page]);
				}
			} else {
				this._buttonsDisplay.push(
					<ButtonText
						className={this._buttonStyle.join(' ')}
						key={getUUID()}
						noicon
						disabled
						sizing={this.props.sizing}
						text=""
						/>
				);
			}
		});
	}

	private propsEqual(p1: PagerProps, p2: PagerProps): boolean {
		if (p1.initialPage === p2.initialPage &&
			p1.pagesToDisplay === p2.pagesToDisplay &&
			p1.pageSize === p2.pageSize &&
			p1.totalItems === p2.totalItems) {
			return true;
		}

		return false;
	}

	private handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		this.currentPage = Number((e.target as HTMLInputElement).value);
	}

	private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.currentPage = Number((e.target as HTMLInputElement).value);
	}

	private handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			this.currentPage = Number((e.target as HTMLInputElement).value);
		}
	}

	private handleSelect(newPage: number) {
		if (this.currentPage != newPage) {
			this.currentPage = newPage;
		}
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

	protected buildStyles() {
		super.buildStyles(this.props);
		this.classes.push("ui-pager");
		this.classes.push(this.styles.pager);
	}

	render() {
		this.buildStyles();
		this.createButtons();

		return (
			<div className={this.classes.join(' ')}>
				<Button
				className={this._buttonStyle.join(' ')}
				iconName="angle-double-left"
				onClick={this.moveToFront}
				sizing={this.props.sizing}
				/>
				<Button
				className={this._buttonStyle.join(' ')}
				iconName="angle-left"
				onClick={this.moveToPrevious}
				sizing={this.props.sizing}
				/>
				{this._buttonsDisplay}
				<Button
				className={this._buttonStyle.join(' ')}
				iconName="angle-right"
				onClick={this.moveToNext}
				sizing={this.props.sizing}
				/>
				<Button
				className={this._buttonStyle.join(' ')}
				iconName="angle-double-right"
				onClick={this.moveToEnd}
				sizing={this.props.sizing}
				/>
				<div className={this.styles.spacer}></div>
				<div className={this.styles.spacer}></div>
				{this.props.useinput ?
				 <TextField
					 className={`${this.styles.pagerInput} ${this.sizeStyle}`}
					 min="1"
					 max={String(this._lastPage)}
					 onBlur={this.handleBlur}
					 onChange={this.handleChange}
					 onKeyPress={this.handleKeyPress}
					 placeholder={String(this.state.currentPage)}
					 style={{width: "3.25em"}}
					 type="number"
					 value={this.state.currentPage}
				 />
				 :
				 null
				}
				<div className={this.styles.spacer}></div>
				<ButtonDialog
					className={this._buttonStyle.join(' ')}
					iconName="ellipsis-h"
					location={Location.top}
					sizing={this.props.sizing}>
					Pager Dialog
				</ButtonDialog>
			</div>
		);
	}
}
