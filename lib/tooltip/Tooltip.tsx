/**
 * A tooltip is a text popup element associated with a control.  It
 * is used to give help or feedback to the user on the use of that
 * control.  This `Tooltip` component is embedded within another
 * widget.  The *parent* widget contains an id.  The `Tooltip` is
 * given the same id as the *parent* prop.  When the *mouseenter* event
 * is invoked on the parent component the tooltip is displayed.  When
 * the *mouseleave* event occurs the tooltip is hidden.
 *
 * Note that the tooltip is set by position *absolute*.  The container
 * that will hold the `Tooltip` component must be position *relative*
 * or the  component will be placed as absolute from the beginning of the
 * document.
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

"use strict";

// const debug = require('debug')('Tooltip');

import autobind from "autobind-decorator";
import {cloneDeep} from "lodash";
import * as React from "react";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	baseZIndex,
	Direction,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	getTheme,
	Location,
	Wrapper
} from "../shared";
import styled, {css} from "../shared/themed-components";
import {Triangle} from "../triangle";

export interface TooltipProps extends BaseProps {
	parent?: any;
}

export function getDefaultTooltipProps(): TooltipProps {
	const theme = getTheme();

	return cloneDeep({
		...getDefaultBaseProps(),
		location: Location.top,
		obj: "Tooltip",
		parent: null,
		style: {
			color: theme.tooltipForegroundColor,
			backgroundColor: theme.tooltipBackgroundColor
		}
	});
}

export interface TooltipState extends BaseState {
	show?: boolean;
}

export function getDefaultTooltipState(): TooltipState {
	return cloneDeep({...getDefaultBaseState("ui-tooltip"), show: false});
}

export const Bottom: any = css`
	top: 100%;
	left: 50%;
	transform: translateX(-50%);
`;

export const BottomLeft: any = css`
	top: 100%;
	left: 25%;
	transform: translateX(-50%);
`;

export const BottomRight: any = css`
	top: 100%;
	left: 75%;
	transform: translateX(-50%);
`;

export const MiddleLeft: any = css`
	top: 50%;
	right: 100%;
	transform: translateY(-50%);
`;

export const Middle: any = css`
	top: 50%;
	left: 100%;
	transform: translateY(-50%);
`;
export const MiddleRight: any = Middle;

export const Top: any = css`
	bottom: 100%;
	left: 50%;
	transform: translateX(-50%);
`;

export const TopLeft: any = css`
	bottom: 100%;
	left: 25%;
	transform: translateX(-50%);
`;

export const TopRight: any = css`
	bottom: 100%;
	left: 75%;
	transform: translateX(-50%);
`;

export const TriangleBottom: any = `
	position: absolute;
	top: -0.75em;
	left: 50%;
	transform: translateX(-50%);
`;

export const TriangleBottomLeft: any = css`
	position: absolute;
	top: -0.75em;
	left: 75%;
	transform: translateX(-50%);
`;

export const TriangleBottomRight: any = css`
	position: absolute;
	top: -0.75em;
	left: 25%;
	transform: translateX(-50%);
`;

export const TriangleMiddleLeft: any = css`
	position: absolute;
	top: 50%;
	right: -0.75em;
	transform: translateY(-50%) rotate(90deg);
`;

export const TriangleMiddleRight: any = css`
	position: absolute;
	top: 50%;
	left: -0.75em;
	transform: translateY(-50%) rotate(270deg);
`;

export const TriangleTop: any = css`
	position: absolute;
	bottom: -0.75em;
	left: 50%;
	transform: translateX(-50%) rotate(180deg);
`;

export const TriangleTopLeft: any = css`
	position: absolute;
	bottom: -0.75em;
	left: 75%;
	transform: translateX(-50%) rotate(180deg);
`;

export const TriangleTopRight: any = css`
	position: absolute;
	bottom: -0.75em;
	left: 25%;
	transform: translateX(-50%) rotate(180deg);
`;

export const Hide: any = css`
	opacity: 0;
	z-index: calc(${baseZIndex} - 1);
`;

export const Show: any = css`
	opacity: 1;
	z-index: calc(${baseZIndex} + 1);
`;

export const StyledTriangle: any = styled(Triangle)`
	${(props: TooltipProps) => {
		switch (props.location) {
			case Location.topLeft:
				return TriangleTopLeft;
			case Location.topRight:
				return TriangleTopRight;
			case Location.middleLeft:
				return TriangleMiddleLeft;
			case Location.middle:
			case Location.middleRight:
				return TriangleMiddleRight;
			case Location.bottomLeft:
				return TriangleBottomLeft;
			case Location.bottom:
				return TriangleBottom;
			case Location.bottomRight:
				return TriangleBottomRight;

			default:
			case Location.top:
				return TriangleTop;
		}
	}};
`;

export const TootipContentView: any = styled.span`
	${(props: TooltipProps) => props.sizing && fontStyle[props.sizing]}
`;

export const TooltipView: any = styled.div`
	border-radius: 10px;
	flex: none;
	line-height: initial;
	padding: 0.5em 1em;
	pointer-events: none;
	position: absolute;
	text-align: initial;
	transition: opacity 0.75s ease;
	width: ${(props: TooltipProps) => props.width};

	${(props: TooltipProps) => {
		switch (props.location) {
			case Location.topLeft:
				return TopLeft;
			case Location.topRight:
				return TopRight;
			case Location.middleLeft:
				return MiddleLeft;
			case Location.middle:
			case Location.middleRight:
				return Middle;
			case Location.bottomLeft:
				return BottomLeft;
			case Location.bottom:
				return Bottom;
			case Location.bottomRight:
				return BottomRight;

			default:
			case Location.top:
				return Top;
		}
	}};

	${(props: TooltipProps) => (props.visible ? Show : Hide)}
	${(props: TooltipProps) => props.sizing && fontStyle[props.sizing]}
`;

export class Tooltip extends BaseComponent<TooltipProps, TooltipState> {
	public static readonly defaultProps: TooltipProps = getDefaultTooltipProps();
	public state: TooltipState = getDefaultTooltipState();

	constructor(props: TooltipProps) {
		super(props, Tooltip.defaultProps.style);
	}

	@autobind
	private handleMouseEnter() {
		this.setState({show: true});
	}

	@autobind
	private handleMouseLeave() {
		this.setState({show: false});
	}

	public componentDidMount() {
		const parent = document.getElementById(this.props.parent);
		if (parent) {
			parent.addEventListener("mouseenter", this.handleMouseEnter);
			parent.addEventListener("mouseleave", this.handleMouseLeave);
		}
	}

	public componentWillUnmount() {
		const parent = document.getElementById(this.props.parent);
		if (parent) {
			parent.removeEventListener("mouseenter", this.handleMouseEnter);
			parent.removeEventListener("mouseleave", this.handleMouseLeave);
		}
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

		let str: string = "";
		if (this.props.children) {
			str = React.Children.map(this.props.children, (child: any) => {
				return String(child);
			}).join(" ");
		}

		return (
			<Wrapper {...this.props}>
				<TooltipView
					className={this.state.classes.classnames}
					location={this.props.location}
					sizing={BaseComponent.prev(this.props.sizing).type}
					style={this.state.style}
					visible={this.state.show}
					width={str.length < 25 ? "unset" : "10em"}
				>
					<TootipContentView
						className='ui-tooltip-content'
						sizing={BaseComponent.prev(this.props.sizing).type}
						style={this.state.style}
					>
						{str}
					</TootipContentView>
					<StyledTriangle
						location={this.props.location}
						direction={direction}
						sizing={BaseComponent.prev(this.props.sizing).type}
						style={{
							fill: this.state.style["backgroundColor"],
							stroke: this.state.style["backgroundColor"]
						}}
					/>
				</TooltipView>
			</Wrapper>
		);
	}
}

/**
 * Creates a tooltip object for use within a control.  It will check the given
 * props for a tooltip string.  If it has one, it will create the object and
 * return it.  If it doesn't have it, then NULL is returned.
 * @param props {any} and object representing the props used to generate the
 * tooltip.
 * @return {Tooltip} a new Tooltip reference if there is a given tooltip string
 * otherwise null is returned.
 */
export function tooltip(id: string, props: any) {
	if (props["tooltip"] && !props["notooltip"]) {
		return (
			<Tooltip parent={id} sizing={props["sizing"]}>
				{props["tooltip"]}
			</Tooltip>
		);
	}

	return null;
}
