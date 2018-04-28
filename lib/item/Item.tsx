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
	BaseState,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	Sizing,
	Wrapper
} from '../shared';
import styled, {css, withProps} from '../shared/themed-components';
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

export interface ItemState extends BaseState {
	leftButton?: any;
	rightButton?: any;
	titlePadding?: string;
}

export function getDefaultItemState(): ItemState {
	return cloneDeep(Object.assign({},
		getDefaultBaseState(), {
			leftButton: null,
			rightButton: null,
			titlePadding: ''
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
		'&:hover {background-color: ' + props.theme.itemHoverColor + ' !important;}'
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

	> i, > .ui-button-circle, > .ui-option {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	> .ui-option {
		display: inline-flex;
		flex: 1;
	}
`;

export class Item extends BaseComponent<ItemProps, ItemState> {

	public static defaultProps: ItemProps = getDefaultItemProps();
	public state: ItemState = getDefaultItemState();

	constructor(props: ItemProps) {
		super(props);
	}

	public static getDerivedStateFromProps(props: ItemProps, state: ItemState) {
		let width: string;

		state.classes.clear();
		state.classes.add('ui-item');
		state.classes.onIf(props.selected)('ui-selected');

		switch (props.sizing) {
			case Sizing.xxsmall:
				state.titlePadding = '1px 2px';
				width = '1.0em';
				break;

			case Sizing.xsmall:
				state.titlePadding = '1px 2px';
				width = '1.25em';
				break;

			case Sizing.small:
				state.titlePadding = '2px 4px';
				width = '2.0em';
				break;

			case Sizing.normal:
			default:
				state.titlePadding = '2px 4px';
				width = '2.25em';
				break;

			case Sizing.large:
				state.titlePadding = '4px 8px';
				width = '3.0em';
				break;

			case Sizing.xlarge:
				state.titlePadding = '4px 8px';
				width = '3.5em';
				break;

			case Sizing.xxlarge:
				state.titlePadding = '4px 8px';
				width = '4.5em';
				break;
		}

		if (props.leftButton != null && !props.disabled) {
			state.leftButton = (
				<ItemViewButton
					className="ui-item-button"
					hiddenLeftButton={props.hiddenLeftButton}
					width={width}
				>
					{React.cloneElement(props.leftButton, {
						sizing: props.sizing
					})}
				</ItemViewButton>
			);
		}

		if (props.rightButton != null && !props.disabled) {
			state.rightButton = (
				<ItemViewButton
					className="ui-item-button"
					hiddenRightButton={props.hiddenRightButton}
					width={width}
				>
					{React.cloneElement(props.rightButton, {
						sizing: props.sizing
					})}
				</ItemViewButton>
			);
		}

		return super.getDerivedStateFromProps(props, state);
	}

	public render() {
		return (
			<Wrapper {...this.props} >
				<ItemView
					id={this.props.id}
					className={this.state.classes.classnames}
					nohover={this.props.nohover}
					onBlur={this.props.onBlur}
					onDoubleClick={this.props.onDoubleClick}
					onKeyDown={this.props.onKeyDown}
					onKeyPress={this.props.onKeyPress}
					onMouseOut={this.props.onMouseOut}
					selected={this.props.selected}
					sizing={this.props.sizing}
					style={this.state.style}
				>
					{this.state.leftButton}
					<Title
						{...this.props}
						layout={this.props.stacked ? TitleLayout.stacked : this.props.layout}
						style={{padding: this.state.titlePadding}}
					/>
					{this.state.rightButton}
				</ItemView>
			</Wrapper>
		);
	}
}
