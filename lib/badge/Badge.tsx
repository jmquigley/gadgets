/**
 * The Badge widget is used to annotate/overlay another widget with a
 * counter.  This widget surrounds the component it will annotate.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Badge} from 'gadgets';
 * <Badge
 *     counter={this.state.count}
 *     location={Location.topRight} >
 *     <div>...</div>
 * ```
 *
 * #### Events
 * - `{name}` - {description}
 *
 * #### Styles
 * - `` - {description}
 *
 * #### Properties
 * - `{name}: {datatype}` - {description}
 *
 * @module Badge
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {BaseComponent, BaseProps} from '../shared';
import {getDefaultBaseProps, Location} from '../shared/props';

export interface BadgeProps extends BaseProps {
	counter?: number;
}

export function getDefaultBadgeProps(): BadgeProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			backgroundColor: "white",
			color: "red",
			counter: 0,
			location: Location.topRight
	}));
}

export class Badge extends BaseComponent<BadgeProps, undefined> {

	public static defaultProps: BadgeProps = getDefaultBadgeProps();

	private _positionStyle: string = "";

	constructor(props: BadgeProps) {
		super(props, require("./styles.css"));
	}

	protected buildStyles() {
		super.buildStyles(this.props,{
			color: (this.props.color || "black"),
			backgroundColor: (this.props.backgroundColor || "white"),
			border: `solid 3px ${this.props.color}`
		});

		this.classes.push("ui-badge");
		this.classes.push(this.styles.badgeContainer);
		this._positionStyle = super.getLocationStyle();
	}

	render() {
		this.buildStyles();

		let badge = null;
		if (this.props.counter !== 0) {
			badge = (
				<div
					className={`${this.styles.badge} ${this._positionStyle}`}
					style={this.inlineStyle}>
					{this.props.counter}
				</div>
			);
		}

		return (
			<div className={this.classes.join(" ")}>
				{this.props.children}
				{badge}
			</div>
		);
	}
}
