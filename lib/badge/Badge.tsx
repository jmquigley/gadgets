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
 * - `ui-badge-container` - This class is on the div that surrounds the
 * badge and the child component that it decorates.
 *
 * #### Properties
 * - `counter: {number} (0)` - The number value displayed by the badge
 * - `suppress: {boolean} (false)` - If this is set to true, then numbers less
 * than 1 are not shown, otherwise all values are shown.
 *
 * @module Badge
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	fontStyle,
	getTheme,
	locationStyle,
	Sizing
} from '../shared';
import {getDefaultBaseProps, Location} from '../shared/props';
import styled, {ThemeProvider, withProps} from '../shared/themed-components';

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

export const BadgeView: any = withProps<BadgeProps, HTMLDivElement>(styled.div)`
	border-radius: 96px;
	font-weight: bold;
	position: absolute;
	text-align: center;
	user-select: none;
	cursor: default;
	padding: 0 7px;

	${props => props.location && locationStyle[props.location]};
	${props => props.sizing && fontStyle[props.sizing]};
`;

export const BadgeContainerView: any = withProps<BadgeProps, HTMLDivElement>(styled.div)`
	display: block;
	position: relative;
	box-sizing: border-box;
`;

export class Badge extends BaseComponent<BadgeProps, undefined> {

	public static readonly defaultProps: BadgeProps = getDefaultBadgeProps();

	constructor(props: BadgeProps) {
		super(props, {}, Badge.defaultProps.style);

		this._classes.add(['ui-badge']);
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
				<BadgeView
					className={this.classes}
					location={this.props.location}
					onClick={this.handleClick}
					sizing={this.props.sizing}
					style={this.inlineStyles}
				>
					{this.props.counter}
				</BadgeView>
			);
		}

		return (
			<ThemeProvider theme={getTheme()} >
				<BadgeContainerView className="ui-badge-container">
					{this.props.children}
					{badge}
				</BadgeContainerView>
			</ThemeProvider>
		);
	}
}
