/**
 * The Badge widget is used to annotate/overlay another widget with a counter.
 * This widget surrounds the component it will annotate.  The control receives
 * a prop named `counter` that sets the actual value.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/badge.png" width="60%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Badge} from 'gadgets';
 * <Badge
 *     counter={this.state.count}
 *     location={Location.topRight}
 *     >
 *     <div>...</div>
 * </Badge>
 * ```
 *
 * ## API
 * #### Events
 * - `onClick(counter: number)` - when the counter value is clicked this
 * callback is invoked.  It is given the current count value.
 *
 * #### Styles
 * - `ui-badge` - Top level class on the `<div>` of the badge (not the
 * container)
 *
 * #### Properties
 * - `counter: number (0)` - The number value displayed by the badge
 * - `suppress: boolean (false)` - If this is set to true, then numbers less
 * than 1 are not shown, otherwise all values are shown.
 *
 * @module Badge
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {ClassNames} from 'util.classnames';
import {nilEvent} from 'util.toolbox';
import {BaseComponent, BaseProps, Sizing} from '../shared';
import {getDefaultBaseProps, Location} from '../shared/props';

export interface BadgeProps extends BaseProps {
	counter?: number;
	onClick?: any;
	suppress?: boolean;
}

export function getDefaultBadgeProps(): BadgeProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			counter: 0,
			location: Location.topRight,
			onClick: nilEvent,
			sizing: Sizing.normal,
			style: {
				backgroundColor: 'white',
				border: 'solid 3px',
				color: 'red'
			},
			suppress: false
		})
	);
}

export class Badge extends BaseComponent<BadgeProps, undefined> {

	public static readonly defaultProps: BadgeProps = getDefaultBadgeProps();

	private _badgeCN: ClassNames = new ClassNames();

	constructor(props: BadgeProps) {
		super(props, require('./styles.css'), Badge.defaultProps.style);

		this._rootStyles.add([
			this.styles.badgeContainer
		]);

		this._badgeCN.add([
			'ui-badge',
			this.styles.badge,
			this.locationStyle,
			this.fontStyle()
		]);

		this.bindCallbacks('handleClick');
		this.componentWillUpdate(props);
	}

	private handleClick() {
		this.props.onClick(this.props.counter);
	}

	public render() {
		let badge = null;

		if (this.props.suppress && this.props.counter < 1) {
			badge = null;
		} else {
			badge = (
				<div
					className={this._badgeCN.classnames}
					onClick={this.handleClick}
					style={this.inlineStyles}
				>
					{this.props.counter}
				</div>
			);
		}

		return (
			<div className={this._rootStyles.classnames}>
				{this.props.children}
				{badge}
			</div>
		);
	}
}
