/**
 * A tooltip is a text popup element associated with a control.  It
 * is used to give help or feedback to the user on the use of that
 * control.  This `Tooltip` component is embedded within another
 * widget.  The *parent* widget contains an id.  The `Tooltip` is
 * given the same id as the *parent* prop.  When the *mouseenter* event
 * is invoked on the parent component the tooltip is displayed.  When
 * the *mouseleave* event occurs the tooltip is hidden.
 *
 *
 * #### Examples:
 *
 * ```javascript
 * import {Tooltip} from 'gadgets';
 *
 * <div id="uniqueId">
 *     ...
 *     <Tooltip location={Location.topRight} parent="uniqueId">tooltip string</Tooltip>
 * </div>
 * ```
 *
 * #### Events
 * None
 *
 * #### Styles
 * - `ui-tooltip` - Applied to the top level `<div>` in the control
 * - `ui-tooltip-content` - Applied to the container around the content
 * (text) of the tooltip.
 *
 * #### Properties
 * - `color: string ('white')` - the color of the tooltip text
 * - `backgroundColor: string ('gray')` - the color of the containing
 * box
 * - `location: Location (Location.middleRight)` - when the tooltip is
 * displayed this is the side of the parent control where it will be
 * displayed.
 * - `parent: {string} ('')` - The id of the component where this tooltip
 * will be applied.
 *
 * @module Tooltip
 */

'use strict';

// const debug = require('debug')('Tooltip');

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {
	BaseComponent,
	BaseProps,
	baseZIndex,
	Direction,
	fontStyle,
	getDefaultBaseProps,
	getTheme,
	Location,
	Sizing
} from '../shared';
import styled, {css, ThemeProvider, withProps} from '../shared/themed-components';
import {Triangle} from '../triangle';

export interface TooltipProps extends BaseProps {
	parent?: any;
}

export function getDefaultTooltipProps(): TooltipProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			location: Location.middleRight,
			parent: null,
			sizing: Sizing.inherit,
			style: {
				color: 'white',
				backgroundColor: 'gray'
			}
		})
	);
}

export interface TooltipState {
	show?: boolean;
}

export const Bottom: any = css`
	top: 125%;
	left: 50%;
	transform: translateX(-50%);
`;

export const BottomLeft: any = css`
	top: 125%;
	left: 25%;
	transform: translateX(-50%);
`;

export const BottomRight: any = css`
	top: 125%;
	left: 75%;
	transform: translateX(-50%);
`;

export const MiddleLeft: any = css`
	top: 50%;
	right: 112%;
	transform: translateY(-50%);
`;

export const Middle: any = css`
	top: 50%;
	left: 112%;
	transform: translateY(-50%);
`;
export const MiddleRight: any = Middle;

export const Top: any = css`
	bottom: 125%;
	left: 50%;
	transform: translateX(-50%);
`;

export const TopLeft: any = css`
	bottom: 125%;
	left: 25%;
	transform: translateX(-50%);
`;

export const TopRight: any = css`
	bottom: 125%;
	left: 75%;
	transform: translateX(-50%);
`;

export const TriangleBottom: any = `
	position: absolute;
	top: -12px;
	left: 50%;
	transform: translateX(-50%);
`;

export const TriangleBottomLeft: any = css`
	position: absolute;
	top: -12px;
	left: 75%;
	transform: translateX(-50%);
`;

export const TriangleBottomRight: any = css`
	position: absolute;
	top: -12px;
	left: 25%;
	transform: translateX(-50%);
`;

export const TriangleMiddleLeft: any = css`
	position: absolute;
	top: 50%;
	right: -12px;
	transform: translateY(-50%) rotate(90deg);
`;

export const TriangleMiddleRight: any = css`
	position: absolute;
	top: 50%;
	left: -12px;
	transform: translateY(-50%) rotate(270deg);
`;

export const TriangleTop: any = css`
	position: absolute;
	bottom: -12px;
	left: 50%;
	transform: translateX(-50%) rotate(180deg);
`;

export const TriangleTopLeft: any = css`
	position: absolute;
	bottom: -12px;
	left: 75%;
	transform: translateX(-50%) rotate(180deg);
`;

export const TriangleTopRight: any = css`
	position: absolute;
	bottom: -12px;
	left: 25%;
	transform: translateX(-50%) rotate(180deg);
`;

export const Hide: any = css`
	opacity: 0;
	z-index: calc(${baseZIndex} - 1);
`;

export const Show: any = css`
	opacity: 1.0;
	z-index: calc(${baseZIndex} + 1);
`;

export const StyledTriangle: any = withProps<TooltipProps, HTMLElement>(styled(Triangle))`
	${props => {
		switch (props.location) {
			case Location.topLeft: return TriangleTopLeft;
			case Location.top: return TriangleTop;
			case Location.topRight: return TriangleTopRight;
			case Location.middleLeft: return TriangleMiddleLeft;
			case Location.bottomLeft: return TriangleBottomLeft;
			case Location.bottom: return TriangleBottom;
			case Location.bottomRight: return TriangleBottomRight;

			case Location.middle:
			case Location.middleRight:
			default: return TriangleMiddleRight;
		}
	}};
`;

export const TootipContentView: any = withProps<TooltipProps, HTMLDivElement>(styled.span)`
	${props => props.sizing && fontStyle[props.sizing]}
`;

export const TooltipView: any = withProps<TooltipProps, HTMLDivElement>(styled.div)`
	border-radius: 10px;
	flex:none;
	line-height: initial;
	padding: 3px 10px;
	pointer-events: none;
	position: absolute;
	text-align: initial;
	transition: opacity 0.75s ease;
	width: calc(100% + 50px);

	${props => {
		switch (props.location) {
			case Location.topLeft: return TopLeft;
			case Location.top: return Top;
			case Location.topRight: return TopRight;
			case Location.middleLeft: return MiddleLeft;
			case Location.bottomLeft: return BottomLeft;
			case Location.bottom: return Bottom;
			case Location.bottomRight: return BottomRight;

			case Location.middle:
			case Location.middleRight:
			default: return Middle;
		}
	}};

	${props => props.visible ? Show : Hide}
`;

export class Tooltip extends BaseComponent<TooltipProps, TooltipState> {

	public static readonly defaultProps: TooltipProps = getDefaultTooltipProps();

	constructor(props: TooltipProps) {
		super(props, {}, Tooltip.defaultProps.style);

		this.state = {
			show: false
		};

		this._classes.add(['ui-tooltip']);

		this.bindCallbacks(
			'handleMouseEnter',
			'handleMouseLeave'
		);

		this.componentWillUpdate(this.props, this.state);
	}

	public componentDidMount() {
		const parent = document.getElementById(this.props.parent);
		if (parent) {
			parent.addEventListener('mouseenter', this.handleMouseEnter);
			parent.addEventListener('mouseleave', this.handleMouseLeave);
		}
	}

	public componentWillUnmount() {
		const parent = document.getElementById(this.props.parent);
		if (parent) {
			parent.removeEventListener('mouseenter', this.handleMouseEnter);
			parent.removeEventListener('mouseleave', this.handleMouseLeave);
		}
	}

	private handleMouseEnter() {
		this.setState({show: true});
	}

	private handleMouseLeave() {
		this.setState({show: false});
	}

	public render() {
		let direction: Direction = Direction.left;

		switch (this.props.location) {
			case Location.topLeft:
			case Location.top:
			case Location.topRight:
				direction = Direction.down;
				break;

			case Location.middleLeft:
				direction = Direction.right;
				break;

			case Location.bottomLeft:
			case Location.bottom:
			case Location.bottomRight:
				direction = Direction.up;
				break;
		}

		return (
			<ThemeProvider theme={getTheme()} >
				<TooltipView
					className={this.classes}
					location={this.props.location}
					style={this.inlineStyles}
					visible={this.state.show}
				>
					<TootipContentView
						className="ui-tooltip-content"
						style={this.props.style}
					>
						{this.props.children}
					</TootipContentView>
					<StyledTriangle
						location={this.props.location}
						direction={direction}
						style={{
							fill: this.props.style['backgroundColor'],
							stroke: this.props.style['backgroundColor']
						}}
					/>
				</TooltipView>
			</ThemeProvider>
		);
	}
}
