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
 * @module Item
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {BaseComponent, BaseProps, getDefaultBaseProps, Sizing} from '../shared';
import {Title, TitleProps} from '../title';

export interface ItemProps extends BaseProps, TitleProps {
	hiddenLeftButton?: boolean;
	hiddenRightButton?: boolean;
	leftButton?: any;
	rightButton?: any;
	selected?: boolean;
	title?: string;
}

export function getDefaultItemProps(): ItemProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			hiddenLeftButton: false,
			hiddenRightButton: false,
			leftButton: null,
			rightButton: null,
			selected: false,
			stacked: false,
			title: '',
			widget: null
		}));
}

export interface ItemState {}

export class Item extends BaseComponent<ItemProps, ItemState> {

	public static defaultProps: ItemProps = getDefaultItemProps();

	private _buttonScale: number = 0;
	private _titlePadding: string = '';

	constructor(props: ItemProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	shouldComponentUpdate(nextProps: ItemProps): boolean {
		super.resetStyles(nextProps);

		this.classes.push('ui-item');
		this.classes.push(this.styles.item);;

		if (nextProps.selected) {
			this.classes.push('ui-selected');
		}

		switch (nextProps.sizing) {
			case Sizing.xxsmall:
			case Sizing.xxsmall:
				this._titlePadding = '1px 2px';
				this._buttonScale = 0.75;
				break;

			case Sizing.large:
			case Sizing.xlarge:
			case Sizing.xxlarge:
				this._titlePadding = '4px 8px';
				this._buttonScale = 0.25;
				break;

			case Sizing.small:
			case Sizing.normal:
			default:
				this._titlePadding = '2px 4px';
				this._buttonScale = 0.5;
		}

		super.buildStyles(nextProps);
		return true;
	}

	computeButtonWidth() {
		let fontEM: number = Number(this.styling.font.sizeem.replace('em',''));
		let size = fontEM + (fontEM * this._buttonScale * 2);
		return `${size}em`;
	}

	render() {
		let leftButton = null;
		if (this.props.leftButton != null && !this.props.disabled) {
			let newButton = React.cloneElement(this.props.leftButton, {
				sizing: this.props.sizing
			});

			leftButton = (
				<div
					className={
						this.styles.itemButton + ' ' +
						this.styling.fontStyle + ' ' +
						((this.props.hiddenLeftButton) ? this.styles.hiddenButton : null)
					}
					style={{width: this.computeButtonWidth()}}
					>
					{newButton}
				</div>
			);
		}

		let rightButton = null;
		if (this.props.rightButton != null && !this.props.disabled) {
			let newButton = React.cloneElement(this.props.rightButton, {
				sizing: this.props.sizing
			});

			rightButton = (
				<div
					className={
						this.styles.itemButton + ' ' +
						this.styling.fontStyle + ' ' +
						((this.props.hiddenRightButton) ? this.styles.hiddenButton : null)
					}
					style={{width: this.computeButtonWidth()}}
					>
					{newButton}
				</div>
			);
		}

		return (
			<li
				id={this.props.id}
				onMouseOut={this.props.onMouseOut}
				onKeyDown={this.props.onKeyDown}
				onKeyPress={this.props.onKeyPress}
				className={this.classes.join(' ')}
				style={{...this.inlineStyle}}>
				{leftButton}
				<Title
					{...this.props}
					className={this.styles.itemTitle}
					sizing={this.props.sizing}
					style={{padding: this._titlePadding}}
					>
					{this.props.title}
				</Title>
				{rightButton}
			</li>
		);
	}
};
