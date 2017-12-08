// TODO: add Item documentation

'use strict';

// const debug = require('debug')('Item');

import {cloneDeep} from 'lodash';
import * as React from 'react';
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
import styled, {css, ThemeProvider, withProps} from '../shared/themed-components';
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
			obj: 'Item',
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

export const HiddenButton: any = css`
	display: none;
	opacity: 0;
	animation: fadeIn ${props => props.theme.transitionDelay};
`;

export const ItemView: any = withProps<ItemProps, HTMLLIElement>(styled.li)`
	background-color: ${props => props.selected ? props.theme.selectedBackgroundColor + ' !important' : props.theme.backgroundColor};
	color: ${props => props.selected ? props.theme.selectedForegroundColor : props.theme.color};
	cursor: default;
	display: flex;

	${props => (!props.nohover) &&
		'&:hover {background-color: ' + props.theme.hoverColor + ' !important;}'
	}

	&:hover .ui-item-button {
		display: inline-flex;
		opacity: 1.0;
	}
`;

export const ItemViewButton: any = withProps<ItemProps, HTMLDivElement>(styled.div)`
	display: inline-flex;
	position: relative;
	width: ${(props: ItemProps) => props.width || '2.0em'};

	${props => props.sizing && fontStyle[props.sizing]};
	${props => (props.hiddenRightButton || props.hiddenLeftButton) && HiddenButton}

	> i, > .ui-button-circle {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	> .ui-option {
		width: 100%;
	}
`;

export class Item extends BaseComponent<ItemProps, undefined> {

	public static defaultProps: ItemProps = getDefaultItemProps();

	private _leftButton: any = null;
	private _rightButton: any = null;
	private _titlePadding: string = '';

	constructor(props: ItemProps) {
		super(props);
		this._classes.add('ui-item');
		this.componentWillUpdate(this.props);
		this.componentWillReceiveProps(this.props);
	}

	public componentWillUpdate(nextProps: ItemProps) {
		this._classes.onIf(nextProps.selected)(
			'ui-selected'
		);

		super.componentWillUpdate(nextProps);
	}

	public componentWillReceiveProps(nextProps: ItemProps) {
		let width: string;

		switch (nextProps.sizing) {
			case Sizing.xxsmall:
				this._titlePadding = '1px 2px';
				width = '1.0em';
				break;

			case Sizing.xsmall:
				this._titlePadding = '1px 2px';
				width = '1.25em';
				break;

			case Sizing.small:
				this._titlePadding = '2px 4px';
				width = '2.0em';
				break;

			case Sizing.normal:
			default:
				this._titlePadding = '2px 4px';
				width = '2.25em';
				break;

			case Sizing.large:
				this._titlePadding = '4px 8px';
				width = '3.0em';
				break;

			case Sizing.xlarge:
				this._titlePadding = '4px 8px';
				width = '3.5em';
				break;

			case Sizing.xxlarge:
				this._titlePadding = '4px 8px';
				width = '4.5em';
				break;
		}

		if (nextProps.leftButton != null && !nextProps.disabled) {
			this._leftButton = (
				<ItemViewButton
					className="ui-item-button"
					hiddenLeftButton={nextProps.hiddenLeftButton}
					width={width}
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
					width={width}
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
					selected={this.props.selected}
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
