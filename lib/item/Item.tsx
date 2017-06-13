'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {BaseComponent, BaseProps, getDefaultBaseProps} from '../shared';
import {Title, TitleProps} from '../title';

const styles = require('./styles.css');

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
		super(props);
	}

	protected buildStyles() {
		super.buildStyles(this.props);

		this._classes += " ui-item";
		this._classes += ` ${styles.item}`;

		if (this.props.selected) {
			this._classes += " ui-selected";
		}
	}

	render() {
		this.buildStyles();

		let leftButton = null;
		if (this.props.leftButton != null && !this.props.disabled) {
			leftButton = (
				<div className={`${styles.itemButton} ${styles.leftButton} ${(this.props.hiddenLeftButton) ? styles.hiddenButton : ''}`}>
					{this.props.leftButton != null ? this.props.leftButton : null}
				</div>
			);
		}

		let rightButton = null;
		if (this.props.rightButton != null && !this.props.disabled) {
			rightButton = (
				<div className={`${styles.itemButton} ${styles.rightButton} ${(this.props.hiddenRightButton) ? styles.hiddenButton : ''}`}>
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
				className={this._classes}
				style={this._style}>
				{leftButton}
				<Title {...this.props} className={styles.itemTitle}>{this.props.title}</Title>
				{rightButton}
			</li>
		);
	}
};