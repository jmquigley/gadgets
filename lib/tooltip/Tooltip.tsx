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
import {ClassNames} from 'util.classnames';
import {
	BaseComponent,
	BaseProps,
	Direction,
	getDefaultBaseProps,
	Location,
	Sizing
} from '../shared';
import {Triangle} from '../triangle';

const styles = require('./styles.css');

export interface TooltipProps extends BaseProps {
	show?: boolean;
}

export function getDefaultTooltipProps(): TooltipProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			color: 'white',
			backgroundColor: 'gray',
			location: Location.middleRight,
			show: false,
			sizing: Sizing.inherit
		})
	);
}

export class Tooltip extends BaseComponent<TooltipProps, undefined> {

	public static defaultProps: TooltipProps = getDefaultTooltipProps();

	private static readonly _resetTooltipLocation = [
		styles.tooltipTopLeft,
		styles.tooltipTop,
		styles.tooltipTopRight,
		styles.tooltipMiddleLeft,
		styles.tooltipMiddle,
		styles.tooltipMiddleRight,
		styles.tooltipBottomLeft,
		styles.tooltipBottom,
		styles.tooltipBottomRight
	];

	private _contentStyles: ClassNames = new ClassNames();
	private _triangleDirection: Direction = Direction.down;
	private _triangleStyle: string = '';

	constructor(props: TooltipProps) {
		super(props, styles);

		this._contentStyles.add('ui-tooltip-content');
		this._rootStyles.add([
			'ui-tooltip',
			this.styles.tooltip
		]);

		this.componentWillUpdate(props);
	}

	public componentWillUpdate(nextProps: TooltipProps) {

		this.updateFontStyle(this._contentStyles, nextProps, this.props);

		if (nextProps.location !== this.props.location) {
			this._rootStyles.reset(Tooltip._resetTooltipLocation);
		}

		switch (nextProps.location) {
			case Location.topLeft:
				this._rootStyles.on(this.styles.tooltipTopLeft);
				this._triangleDirection = Direction.down;
				this._triangleStyle = this.styles.tooltipTriangleTopLeft;
				break;

			case Location.top:
				this._rootStyles.on(this.styles.tooltipTop);
				this._triangleDirection = Direction.down;
				this._triangleStyle = this.styles.tooltipTriangleTop;
				break;

			case Location.topRight:
				this._rootStyles.on(this.styles.tooltipTopRight);
				this._triangleDirection = Direction.down;
				this._triangleStyle = this.styles.tooltipTriangleTopRight;
				break;

			case Location.middleLeft:
				this._rootStyles.on(this.styles.tooltipMiddleLeft);
				this._triangleDirection = Direction.right;
				this._triangleStyle = this.styles.tooltipTriangleMiddleLeft;
				break;

			case Location.none:
				this._rootStyles.on(this.styles.invisible);
				break;

			case Location.bottomLeft:
				this._rootStyles.on(this.styles.tooltipBottomLeft);
				this._triangleDirection = Direction.up;
				this._triangleStyle = this.styles.tooltipTriangleBottomLeft;
				break;

			case Location.bottom:
				this._rootStyles.on(this.styles.tooltipBottom);
				this._triangleDirection = Direction.up;
				this._triangleStyle = this.styles.tooltipTriangleBottom;
				break;

			case Location.bottomRight:
				this._rootStyles.on(this.styles.tooltipBottomRight);
				this._triangleDirection = Direction.up;
				this._triangleStyle = this.styles.tooltipTriangleBottomRight;
				break;

			case Location.middle:
			case Location.middleRight:
			default:
				this._rootStyles.on(this.styles.tooltipMiddleRight);
				this._triangleDirection = Direction.left;
				this._triangleStyle = this.styles.tooltipTriangleMiddleRight;
				break;
		}

		this._rootStyles.onIfElse(nextProps.show)(
			this.styles.tooltipShow
		)(
			this.styles.tooltipHide
		);

		this.buildInlineStyles(nextProps, {
			color: nextProps.backgroundColor,
			backgroundColor: nextProps.backgroundColor
		});

		super.componentWillUpdate(nextProps);
	}

	public render() {
		return (
			<div
				className={this._rootStyles.classnames}
				style={this.inlineStyle}
			>
				<span
					className={this._contentStyles.classnames}
					style={{color: this.props.color}}
				>
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
