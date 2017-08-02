// TODO: add Item documentation

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {BaseComponent, BaseProps, getDefaultBaseProps, Sizing} from '../shared';
import {Title, TitleLayout, TitleProps} from '../title';

export interface ItemProps extends BaseProps, TitleProps {
	hiddenLeftButton?: boolean;
	hiddenRightButton?: boolean;
	leftButton?: any;
	layout?: TitleLayout;
	onBlur?: any;
	onChange?: any;
	onClick?: any;
	onDoubleClick?: any;
	onFocus?: any;
	onKeyDown?: any;
	onKeyPress?: any;
	onMouseOut?: any;
	onUpdate?: any;
	rightButton?: any;
	stacked?: boolean;
	title?: string;
	useedit?: boolean;
}

export function getDefaultItemProps(): ItemProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			hiddenLeftButton: false,
			hiddenRightButton: false,
			layout: TitleLayout.dominant,
			leftButton: null,
			onBlur: nilEvent,
			onChange: nilEvent,
			onClick: nilEvent,
			onDoubleClick: nilEvent,
			onFocus: nilEvent,
			onKeyDown: nilEvent,
			onKeyPress: nilEvent,
			onMouseOut: nilEvent,
			onUpdate: nilEvent,
			rightButton: null,
			selected: false,
			stacked: false,
			title: '',
			useedit: false,
			widget: null
		}));
}

export class Item extends BaseComponent<ItemProps, undefined> {

	public static defaultProps: ItemProps = getDefaultItemProps();

	private _buttonScale: number = 0;
	private _titlePadding: string = '';

	constructor(props: ItemProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	private computeButtonWidth() {
		const fontEM: number = Number(this.font().sizeem.replace('em', ''));
		const size = fontEM + (fontEM * this._buttonScale * 2);
		return `${size}em`;
	}

	public shouldComponentUpdate(nextProps: ItemProps): boolean {
		this.resetStyles(nextProps);

		this.classes.push('ui-item');
		this.classes.push(this.styles.item);

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

		this.buildStyles(nextProps);
		return true;
	}

	public render() {
		let leftButton = null;
		if (this.props.leftButton != null && !this.props.disabled) {
			const newButton = React.cloneElement(this.props.leftButton, {
				sizing: this.props.sizing
			});

			leftButton = (
				<div
					className={
						this.styles.itemButton + ' ' +
						this.fontStyle() + ' ' +
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
			const newButton = React.cloneElement(this.props.rightButton, {
				sizing: this.props.sizing
			});

			rightButton = (
				<div
					className={
						this.styles.itemButton + ' ' +
						this.fontStyle() + ' ' +
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
				className={this.classes.join(' ')}
				onBlur={this.props.onBlur}
				onDoubleClick={this.props.onDoubleClick}
				onKeyDown={this.props.onKeyDown}
				onKeyPress={this.props.onKeyPress}
				onMouseOut={this.props.onMouseOut}
				style={{...this.inlineStyle}}
			>
				{leftButton}
				<Title
					{...this.props}
					className={this.styles.itemTitle}
					layout={this.props.stacked ? TitleLayout.stacked : this.props.layout}
					style={{padding: this._titlePadding}}
				/>
				{rightButton}
			</li>
		);
	}
}
