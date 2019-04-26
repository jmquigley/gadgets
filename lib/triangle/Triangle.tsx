/**
 * Uses SVG to draw and fill a triangle image.  This triangle can then be used
 * in other controls as a "pointer" (like the triangle in a tooltip).  It
 * follows the libraries typical sizing constraints.  It can be drawn in one
 * of four directions using the direction prop.  It can be thought of as how
 * the triangle points out its direction.  The direction is based on the
 * `Direction` enum.  The four directions are:
 *
 * - Direction.up
 * - Direction.down
 * - Direction.left
 * - Direction.right
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/triangle.png" width="60%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Direction, Sizing, Triangle} from 'gadgets';
 * <Triangle sizing={Sizing.large} direction={Direction.up} />
 * ```
 *
 * ## API
 * #### Events
 * N/A
 *
 * #### Styles
 * - `ui-triangle` - global style placed on the `<svg>` root element
 *
 * #### Properties
 * - `direction: {Direction} (Direction.up)` - Determines the direction the
 * triangle will point.
 * - `nobase: {boolean} (false)` - When set to true, then the side opposite the
 * "pointer" angle will not have a line drawn.  The typical triangle has a
 * border on all three sides drawn.  This will exclude this side.  This is
 * used when overlaying a triangle on the edge of another control.
 *
 * @module Triangle
 */

import * as React from "react";
import styled from "styled-components";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	boxStyle,
	Direction,
	getDefaultBaseProps,
	getDefaultBaseState,
	Wrapper
} from "../shared";

export interface TriangleProps extends BaseProps {
	nobase?: boolean;
}

export function getDefaultTriangleProps(): TriangleProps {
	return {
		...getDefaultBaseProps(),
		direction: Direction.up,
		nobase: false,
		obj: "Triangle",
		style: {
			fill: "black",
			stroke: "black",
			stokeWidth: "2px"
		}
	};
}

export type TriangleState = BaseState;

export function getDefaultTriangleState(): TriangleState {
	return {...getDefaultBaseState()};
}

const SVGView: any = styled.svg`
	transform: ${(props: TriangleProps) => {
		switch (props.direction) {
			case Direction.right:
				return "rotate(90deg)";
			case Direction.down:
				return "rotate(180deg)";
			case Direction.left:
				return "rotate(270deg)";
			case Direction.up:
			default:
				return "rotate(0deg)";
		}
	}};

	${(props: TriangleProps) => props.sizing && boxStyle[props.sizing]}
`;

export class Triangle extends BaseComponent<TriangleProps, TriangleState> {
	public static readonly defaultProps: TriangleProps = getDefaultTriangleProps();
	public state: TriangleState = getDefaultTriangleState();

	constructor(props: TriangleProps) {
		super(props, "ui-triangle", Triangle.defaultProps.style);
	}

	public render() {
		this.updateClassName();

		let triangle: any = null;

		if (this.props.nobase) {
			triangle = (
				<SVGView
					{...this.props}
					className={this.className}
					preserveAspectRatio='xMidYMid meet'
					style={this.state.style}
					version='1.1'
					viewBox='0 0 40 40'
					xmlns='http://www.w3.org/2000/svg'
				>
					<polygon
						points='-3,35, 20,10 43,35'
						style={{stroke: "none"}}
					/>
					<polygon
						points='-3,35, 20,10 43,35, 20,10'
						style={{
							strokeWidth: this.state.style["strokeWidth"],
							strokeLinecap: "square"
						}}
					/>
				</SVGView>
			);
		} else {
			triangle = (
				<SVGView
					{...this.props}
					className={this.className}
					preserveAspectRatio='xMidYMid meet'
					style={this.state.style}
					version='1.1'
					viewBox='0 0 40 40'
					xmlns='http://www.w3.org/2000/svg'
				>
					<polygon points='0,35, 20,10 40,35' />
				</SVGView>
			);
		}

		return <Wrapper {...this.props}>{triangle}</Wrapper>;
	}
}

export default Triangle;
