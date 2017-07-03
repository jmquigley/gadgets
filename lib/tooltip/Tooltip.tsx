/**
 * A tooltip is a text popup window associated with a control.  It
 * is used to give help or feedback to the user on the use of that
 * control.  This `Tooltip` component is embedded within another
 * widget.  Generally that parent widget would control whether the
 * tooltip is displayed.  There are two ways to show the widget:
 *
 * 1. In the parent control use the `show` parameter as part of the
 * control's state to activate/deactive it.  Just maintain the state
 * within the parent using it.
 * 2. Manipulate the tooltip directly through styles.  The demo
 * application uses this approach.  The tooltip is initially set
 * to an opacity of 0.  The app can use ":hover" on that element
 * to set the opacity to 1.0.
 *
 * The preferred method is #1.  The second method works, but would
 * be considered fragile as it relies on internal knowledge of the
 * component, so it could change.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Tooltip} from 'gadgets';
 *
 * <div>
 *     ...
 *     <Tooltip location={Location.topRight} show={this.state.show} />
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
 * - `show: boolean (false)` - if this is set to true, then the component
 * is displayed (opacity set to 1.0).  When set to false then the
 * opacity is set to 0.
 *
 * @module Tooltip
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {
	BaseComponent,
	BaseProps,
	Direction,
	getDefaultBaseProps,
	Location
} from '../shared';
import {Triangle} from '../triangle';

export interface TooltipProps extends BaseProps {
	show?: boolean;
}

export function getDefaultTooltipProps(): TooltipProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			color: 'white',
			backgroundColor: 'gray',
			location: Location.middleRight,
			show: false
		}));
}

export interface TooltipState {
}

export class Tooltip extends BaseComponent<TooltipProps, TooltipState> {

	public static defaultProps: TooltipProps = getDefaultTooltipProps();

	private _triangleDirection: Direction = Direction.down;
	private _triangleStyle: string = '';

	constructor(props: TooltipProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	shouldComponentUpdate(nextProps: TooltipProps): boolean {
		super.resetStyles(nextProps);

		this.classes.push('ui-tooltip');
		this.classes.push(this.styles.tooltip);

		switch (nextProps.location) {
			case Location.topLeft:
				this.classes.push(this.styles.tooltipTopLeft);
				this._triangleDirection = Direction.down;
				this._triangleStyle = this.styles.tooltipTriangleTopLeft;
				break;

			case Location.top:
				this.classes.push(this.styles.tooltipTop);
				this._triangleDirection = Direction.down;
				this._triangleStyle = this.styles.tooltipTriangleTop;
				break;

			case Location.topRight:
				this.classes.push(this.styles.tooltipTopRight);
				this._triangleDirection = Direction.down;
				this._triangleStyle = this.styles.tooltipTriangleTopRight;
				break;

			case Location.middleLeft:
				this.classes.push(this.styles.tooltipMiddleLeft);
				this._triangleDirection = Direction.right;
				this._triangleStyle = this.styles.tooltipTriangleMiddleLeft;
				break;

			case Location.none:
				this.classes.push(this.styles.invisible);
				break;

			case Location.bottomLeft:
				this.classes.push(this.styles.tooltipBottomLeft);
				this._triangleDirection = Direction.up;
				this._triangleStyle = this.styles.tooltipTriangleBottomLeft;
				break;

			case Location.bottom:
				this.classes.push(this.styles.tooltipBottom);
				this._triangleDirection = Direction.up;
				this._triangleStyle = this.styles.tooltipTriangleBottom;
				break;

			case Location.bottomRight:
				this.classes.push(this.styles.tooltipBottomRight);
				this._triangleDirection = Direction.up;
				this._triangleStyle = this.styles.tooltipTriangleBottomRight;
				break;

			case Location.middle:
			case Location.middleRight:
			default:
				this.classes.push(this.styles.tooltipMiddleRight);
				this._triangleDirection = Direction.left;
				this._triangleStyle = this.styles.tooltipTriangleMiddleRight;
				break;
		}

		if (nextProps.show) {
			this.classes.push(this.styles.tooltipShow);
		} else {
			this.classes.push(this.styles.tooltipHide);
		}

		super.buildStyles(nextProps, {
			color: nextProps.backgroundColor,
			backgroundColor: nextProps.backgroundColor
		});

		return true;
	}

	render() {
		return (
			<div className={this.classes.join(' ')} style={this.inlineStyle}>
				<span className="ui-tooltip-content" style={{color: this.props.color}}>
					{this.props.children}
				</span>
				<Triangle
					{...this.props}
					className={this._triangleStyle}
					direction={this._triangleDirection}
					/>
			</div>
		);
	}
}
