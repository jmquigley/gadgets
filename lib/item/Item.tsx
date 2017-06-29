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

export interface ItemState {
}

export class Item extends BaseComponent<ItemProps, ItemState> {

	public static defaultProps: ItemProps = getDefaultItemProps();

	constructor(props: ItemProps) {
		super(props, require('./styles.css'));
	}

	protected buildStyles() {
		super.buildStyles(this.props);

		this.classes.push('ui-item');
		this.classes.push(this.styles.item);;

		if (this.props.selected) {
			this.classes.push('ui-selected');
		}
	}

	render() {
		this.buildStyles();

		let leftButton = null;
		if (this.props.leftButton != null && !this.props.disabled) {
			leftButton = (
				<div className={
					this.styles.itemButton + ' ' +
					this.styles.leftButton + ' ' +
					((this.props.hiddenLeftButton) ? this.styles.hiddenButton : this.sizing.fontStyle)
					}>
					{this.props.leftButton != null ? this.props.leftButton : null}
				</div>
			);
		}

		let rightButton = null;
		if (this.props.rightButton != null && !this.props.disabled) {
			rightButton = (
				<div className={
					this.styles.itemButton + ' ' +
					this.styles.rightButton + ' ' +
					((this.props.hiddenRightButton) ? this.styles.hiddenButton : this.sizing.fontStyle)
					}>
					{this.props.rightButton != null ? this.props.rightButton : null}
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
				<Title {...this.props} className={this.styles.itemTitle}>{this.props.title}</Title>
				{rightButton}
			</li>
		);
	}
};
