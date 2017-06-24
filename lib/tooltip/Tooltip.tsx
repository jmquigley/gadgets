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
 *
 * #### Properties
 * - `color: string ('white')` - the color of the tooltip text
 * - `backgroundColor: string ('gray')` - the color of the containing
 * box
 * - `location: Location (Location.middleRight)` - when the tooltip is
 * displayed this is the side of the parent control where it will be
 * displayed.
 *
 * @module Tooltip
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	Location
} from '../shared';

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

	constructor(props: TooltipProps) {
		super(props, require('./styles.css'));
	}

	protected buildStyles() {
		super.buildStyles(this.props, {
			color: this.props.backgroundColor,
			backgroundColor: this.props.backgroundColor
		});

		this.classes.push('ui-tooltip');
		this.classes.push(this.styles.tooltip);

		switch (this.props.location) {
			case Location.topLeft:
				this.classes.push(this.styles.tooltipTopLeft);
				break;

			case Location.top:
				this.classes.push(this.styles.tooltipTop);
				break;

			case Location.topRight:
				this.classes.push(this.styles.tooltipTopRight);
				break;

			case Location.middleLeft:
				this.classes.push(this.styles.tooltipMiddleLeft);
				break;

			case Location.none:
				this.classes.push(this.styles.invisible);
				break;

			case Location.bottomLeft:
				this.classes.push(this.styles.tooltipBottomLeft);
				break;

			case Location.bottom:
				this.classes.push(this.styles.tooltipBottom);
				break;

			case Location.bottomRight:
				this.classes.push(this.styles.tooltipBottomRight);
				break;

			case Location.middle:
			case Location.middleRight:
			default:
				this.classes.push(this.styles.tooltipMiddleRight);
				break;
		}

		if (this.props.show) {
			this.classes.push(this.styles.tooltipShow);
		} else {
			this.classes.push(this.styles.tooltipHide);
		}
	}

	render() {
		this.buildStyles();

		return (
			<div className={this.classes.join(' ')} style={this.inlineStyle}>
				<span className="tooltipContent" style={{color: this.props.color}}>
					{this.props.children}
				</span>
			</div>
		);
	}
}
