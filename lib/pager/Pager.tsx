/**
 * {description}
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button} from 'gadgets';
 * <Button iconName="cab" onClick={someFunction} />
 * ```
 *
 * #### Events
 * - `{name}` - {description}
 *
 * #### Styles
 * - `` - {description}
 *
 * #### Properties
 * - `{name}: {datatype}` - {description}
 *
 * @module Pager
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {getUUID, nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {ButtonText} from '../buttonText';
import {BaseComponent, BaseProps, getDefaultBaseProps, Size} from '../shared';
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
			size: Size.xsmall,
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

	constructor(props: PagerProps) {
		super(props, require("./styles.css"));

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

		this.createButtons();

		this.handleSelect = this.handleSelect.bind(this);
		this.moveToEnd = this.moveToEnd.bind(this);
		this.moveToFront = this.moveToFront.bind(this);
		this.moveToNext = this.moveToNext.bind(this);
		this.moveToPrevious = this.moveToPrevious.bind(this);
	}

	get currentPage(): number {
		return this.state.currentPage;
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
					className={this.styles.pagerButton}
						key={String(page)}
						noicon
						onClick={() => {this.handleSelect(page)}}
						size={this.props.size}
						text={String(page)}
						/>
				);
			}

			if (page !== 0) {
				if (page === this.currentPage) {
					this._buttonsDisplay.push(
						React.cloneElement(this._buttons[page], {
							className: this.styles.pagerButton + ' ui-pager-selected'
						}));
				} else {
					this._buttonsDisplay.push(this._buttons[page]);
				}
			} else {
				this._buttonsDisplay.push(
					<ButtonText
						className={this.styles.pagerButton}
						key={getUUID()}
						noicon
						disabled
						size={this.props.size}
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

	private handleSelect(newPage: number) {
		if (this.currentPage != newPage) {
			this.setState({currentPage: newPage}, () => {
				this.props.onSelect(newPage);
			});
		}
	}

	private moveToEnd() {
		if (this.currentPage !== this._lastPage) {
			this.setState({currentPage: this._lastPage});
		}
	}

	private moveToFront() {
		if (this.currentPage !== 1) {
			this.setState({currentPage: 1});
		}
	}

	private moveToNext() {
		if (this.currentPage !== this._lastPage) {
			this.setState({currentPage: this.currentPage + 1});
		}
	}

	private moveToPrevious() {
		if (this.currentPage !== 1) {
			this.setState({currentPage: this.currentPage - 1});
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
			<div className={this.classes.join(" ")}>
				<Button
					className={this.styles.pagerButton}
					iconName="angle-double-left"
					onClick={this.moveToFront}
					size={this.props.size}
					/>
				<Button
					className={this.styles.pagerButton}
					iconName="angle-left"
					onClick={this.moveToPrevious}
					size={this.props.size}
					/>
				{this._buttonsDisplay}
				<Button
					className={this.styles.pagerButton}
					iconName="angle-right"
					onClick={this.moveToNext}
					size={this.props.size}
					/>
				<Button
					className={this.styles.pagerButton}
					iconName="angle-double-right"
					onClick={this.moveToEnd}
					size={this.props.size}
					/>
				{this.props.useinput ?
					<TextField
						className={`${this.styles.pagerInput} ${this.sizeStyle}`}
						min="1"
						max={String(this._lastPage)}
						placeholder={String(this.state.currentPage)}
						type="number"
					/>
					:
					null
				}
			</div>
		);
	}
}
