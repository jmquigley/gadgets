/**
 * The Badge widget is used to annotate/overlay another widget with a counter.
 * This widget surrounds the component it will annotate.  The control receives
 * a prop named `counter` that sets the actual value.
 *
 * #### Examples:
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
import {join, nilEvent} from 'util.toolbox';
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
			backgroundColor: 'white',
			color: 'red',
			counter: 0,
			location: Location.topRight,
			onClick: nilEvent,
			sizing: Sizing.normal,
			suppress: false
		})
	);
}

export class Badge extends BaseComponent<BadgeProps, undefined> {

	public static defaultProps: BadgeProps = getDefaultBadgeProps();

	private _rootClasses: Set<string>;
	private _badgeClasses: Set<string>;

	constructor(props: BadgeProps) {
		super(props, require('./styles.css'));

		this._rootClasses = new Set<string>([
			this.styles.badgeContainer
		]);

		this._badgeClasses = new Set<string>([
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

	public componentWillUpdate(nextProps: BadgeProps) {
		this.buildCommonStyles(this._rootClasses, nextProps);
		this.buildInlineStyles(nextProps, {
			color: (nextProps.color || 'black'),
			backgroundColor: (nextProps.backgroundColor || 'white'),
			border: `solid 3px ${nextProps.color}`
		});
	}

	public render() {
		let badge = null;

		if (this.props.suppress && this.props.counter < 1) {
			badge = null;
		} else {
			badge = (
				<div
					className={join(this._badgeClasses, ' ')}
					onClick={this.handleClick}
					style={this.inlineStyle}
				>
					{this.props.counter}
				</div>
			);
		}

		return (
			<div className={join(this._rootClasses, ' ')}>
				{this.props.children}
				{badge}
			</div>
		);
	}
}
