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
import {BaseComponent, BaseProps, getDefaultBaseProps} from '../shared';
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
	private static readonly buttonScale: number = 1.5;

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

		super.buildStyles(nextProps);
		return true;
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
					style={{width: `calc(${this.styling.font.sizeem} * ${Item.buttonScale})`}}
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
					style={{width: `calc(${this.styling.font.sizeem} * ${Item.buttonScale})`}}
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
				style={this.inlineStyle}>
				{leftButton}
				<Title
					{...this.props}
					className={this.styles.itemTitle}
					sizing={this.props.sizing}
					>
					{this.props.title}
				</Title>
				{rightButton}
			</li>
		);
	}
};
