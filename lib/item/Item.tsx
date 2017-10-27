// TODO: add Item documentation

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {sp} from 'util.constants';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	fontStyle,
	getDefaultBaseProps,
	getTheme,
	Sizing
} from '../shared';
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
	return cloneDeep(Object.assign({},
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
			title: sp,
			useedit: false,
			widget: null
		}));
}

export const ItemView: any = styled.li`
	cursor: default;
	display: flex;

	${(props: ItemProps) => (!props.nohover) &&
		'&:hover {background-color: #bedb39 !important;}'
	}

	&:hover .ui-item-button {
		display: inline-flex;
		opacity: 1.0;
	}
`;

export const ItemViewButton: any = styled.div`
	display: inline-flex;
	position: relative;

	${(props: ItemProps) => props.sizing && fontStyle[props.sizing]};
	${(props: ItemProps) => (props.hiddenRightButton || props.hiddenLeftButton) &&
		'display: none; opacity: 0; animation: fadeIn 0.5s;'
	}

	> i, > .ui-button-circle {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export class Item extends BaseComponent<ItemProps, undefined> {

	public static defaultProps: ItemProps = getDefaultItemProps();

	private _buttonScale: number = 0;
	private _leftButton: any = null;
	private _rightButton: any = null;
	private _titlePadding: string = '';

	constructor(props: ItemProps) {
		super(props);

		this._classes.add([
			'ui-item'
		]);

		this.bindCallbacks(
			'computeButtonWidth'
		);

		this.componentWillReceiveProps(this.props);
		this.componentWillUpdate(this.props);
	}

	private computeButtonWidth() {
		const fontREM: number = Number(this.font().sizerem.replace('rem', ''));
		const size = fontREM + (fontREM * this._buttonScale * 2);
		return `${size}rem`;
	}

	public componentWillUpdate(nextProps: ItemProps) {

		this._classes.onIf(nextProps.selected)(
			'ui-selected'
		);

		super.componentWillUpdate(nextProps);
	}

	public componentWillReceiveProps(nextProps: ItemProps) {

		switch (nextProps.sizing) {
			case Sizing.xsmall:
			case Sizing.xxsmall:
				this._titlePadding = '1px 2px';
				this._buttonScale = 0.75;
				break;

			case Sizing.large:
			case Sizing.xlarge:
			case Sizing.xxlarge:
				this._titlePadding = '4px 8px';
				this._buttonScale = 0.33;
				break;

			case Sizing.small:
			case Sizing.normal:
			default:
				this._titlePadding = '2px 4px';
				this._buttonScale = 0.5;
		}

		if (nextProps.leftButton != null && !nextProps.disabled) {
			this._leftButton = (
				<ItemViewButton
					className="ui-item-button"
					hiddenLeftButton={nextProps.hiddenLeftButton}
					style={{width: this.computeButtonWidth()}}
				>
					{React.cloneElement(nextProps.leftButton, {
						sizing: nextProps.sizing
					})}
				</ItemViewButton>
			);
		}

		if (nextProps.rightButton != null && !nextProps.disabled) {
			this._rightButton = (
				<ItemViewButton
					className="ui-item-button"
					hiddenRightButton={nextProps.hiddenRightButton}
					style={{width: this.computeButtonWidth()}}
				>
					{React.cloneElement(nextProps.rightButton, {
						sizing: nextProps.sizing
					})}
				</ItemViewButton>
			);
		}
	}

	public render() {
		return (
			<ThemeProvider theme={getTheme()}>
				<ItemView
					id={this.props.id}
					className={this.classes}
					nohover={this.props.nohover}
					onBlur={this.props.onBlur}
					onDoubleClick={this.props.onDoubleClick}
					onKeyDown={this.props.onKeyDown}
					onKeyPress={this.props.onKeyPress}
					onMouseOut={this.props.onMouseOut}
					style={this.inlineStyles}
				>
					{this._leftButton}
					<Title
						{...this.props}
						layout={this.props.stacked ? TitleLayout.stacked : this.props.layout}
						style={{padding: this._titlePadding}}
					/>
					{this._rightButton}
				</ItemView>
			</ThemeProvider>
		);
	}
}
