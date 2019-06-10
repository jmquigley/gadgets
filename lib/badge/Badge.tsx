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
 * - `onClick(event)` - when the counter value is clicked this callback is invoked.
 * - `onUpdate(counter: number)` - Invoked when the badge count is updated/set.
 *
 * #### Styles
 * - `ui-badge` - Top level class on the `<div>` of the badge (not the
 * container)
 * - `ui-badge-container` - This class is on the div that surrounds the
 * badge and the child component that it decorates.
 *
 * #### Properties
 * - `counter=0 {number}` - The number value displayed by the badge
 * - `suppress=false {boolean}` - If this is set to true, then numbers less
 * than 1 are not shown, otherwise all values are shown.
 *
 * @module Badge
 */

import autobind from "autobind-decorator";
import * as React from "react";
import styled from "styled-components";
import {nilEvent} from "util.toolbox";
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
} from "../shared";

export interface BadgeProps extends BaseProps {
	counter?: number;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	onUpdate?: (counter: number) => void;
	suppress?: boolean;
}

export function getDefaultBadgeProps(): BadgeProps {
	return {
		...getDefaultBaseProps(),
		counter: 0,
		location: Location.topRight,
		onClick: nilEvent,
		onUpdate: nilEvent,
		sizing: Sizing.normal,
		style: {
			backgroundColor: "white",
			border: "solid 0.125em",
			color: "red"
		},
		suppress: false
	};
}

export type BadgeState = BaseState;

export function getDefaultBadgeState(): BadgeState {
	return {...getDefaultBaseState()};
}

const BadgeView: any = styled.div`
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

const BadgeContainerView: any = styled.div`
	box-sizing: border-box;
	display: block;
	position: relative;
`;

export class Badge extends BaseComponent<BadgeProps, BadgeState> {
	public static readonly defaultProps: BadgeProps = getDefaultBadgeProps();

	constructor(props: BadgeProps) {
		super("ui-badge", Badge, props, getDefaultBadgeState());
		this.props.onUpdate(this.props.counter);
	}

	@autobind
	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (!this.props.disabled && this.props.visible) {
			e.preventDefault();
			this.props.onClick(e);
		}
	}

	public componentDidUpdate(prevProps: BadgeProps) {
		if (this.props.counter !== prevProps.counter) {
			this.props.onUpdate(this.props.counter);
		}
	}

	public render() {
		super.render();

		let badge = null;
		if (
			(this.props.suppress && this.props.counter < 1) ||
			!this.props.visible
		) {
			badge = null;
		} else {
			badge = (
				<BadgeView
					className={this.className}
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
			<Wrapper {...this.props}>
				<BadgeContainerView className='ui-badge-container'>
					{this.props.children}
					{badge}
				</BadgeContainerView>
			</Wrapper>
		);
	}
}

export default Badge;
