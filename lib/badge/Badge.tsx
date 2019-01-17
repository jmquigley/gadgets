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

const debug = require('debug')('Badge');

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	BaseState,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Location,
	locationStyle,
	Sizing,
	Wrapper
} from '../shared';
import styled from '../shared/themed-components';

export interface BadgeProps extends BaseProps {
	counter?: number;
	onClick?: any;
	suppress?: boolean;
}

export function getDefaultBadgeProps(): BadgeProps {
	return cloneDeep({...getDefaultBaseProps(),
		counter: 0,
		location: Location.topRight,
		obj: 'Badge',
		onClick: nilEvent,
		sizing: Sizing.normal,
		style: {
			backgroundColor: 'white',
			border: 'solid 0.125em',
			color: 'red'
		},
		suppress: false
	});
}

export type BadgeState = BaseState;

export function getDefaultBadgeState(): BadgeState {
	return cloneDeep({...getDefaultBaseState('ui-badge')});
}

export const BadgeView: any = styled.div`
	border-radius: 96px;
	cursor: default;
	font-weight: bold;
	padding: 0.2em 0.6em;
	position: absolute;
	text-align: center;
	user-select: none;

	${(props: BadgeProps) => props.location && locationStyle[props.location]};
	${(props: BadgeProps) => props.sizing && fontStyle[props.sizing]};
	${(props: BadgeProps) => disabled(props)}
	${(props: BadgeProps) => invisible(props)}
`;

export const BadgeContainerView: any = styled.div`
	box-sizing: border-box;
	display: block;
	position: relative;
`;

export class Badge extends BaseComponent<BadgeProps, BadgeState> {

	public static readonly defaultProps: BadgeProps = getDefaultBadgeProps();
	public state: BadgeState = getDefaultBadgeState();

	constructor(props: BadgeProps) {
		super(props, Badge.defaultProps.style);
	}

	@autobind
	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (!this.props.disabled && this.props.visible && this.props.onClick) {
			debug('clicking badge');
			e.preventDefault();
			this.props.onClick(this.props.counter);
		}
	}

	public render() {
		let badge = null;

		if ((this.props.suppress && this.props.counter < 1) || !this.props.visible) {
			badge = null;
		} else {
			badge = (
				<BadgeView
					className={this.state.classes.classnames}
					disabled={this.props.disabled}
					location={this.props.location}
					onClick={this.handleClick}
					sizing={this.props.sizing}
					style={this.state.style}
					visible={this.props.visible}
				>
					{this.props.counter}
				</BadgeView>
			);
		}

		return (
			<Wrapper {...this.props} >
				<BadgeContainerView className="ui-badge-container">
					{this.props.children}
					{badge}
				</BadgeContainerView>
			</Wrapper>
		);
	}
}
