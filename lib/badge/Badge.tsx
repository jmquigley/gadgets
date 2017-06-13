/**
 * {description}
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button} from 'gadgets';
 * <Button iconName="cab" onClick={someFunction} />
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
import {getDefaultBaseProps} from '../shared/props';

export enum BadgePosition {
	topLeft,
	top,
	topRight,
	middleLeft,
	middle,
	middleRight,
	bottomLeft,
	bottom,
	bottomRight
}

export interface BadgeProps extends BaseProps {
	counter?: number;
	position?: number;
}

export function getDefaultBadgeProps(): BadgeProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			backgroundColor: "white",
			color: "red",
			counter: 0,
			position: BadgePosition.topRight
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

		switch (this.props.position) {
			case BadgePosition.topLeft: this._positionStyle = this.styles.topLeft; break;
			case BadgePosition.top: this._positionStyle = this.styles.top; break;
			case BadgePosition.topRight: this._positionStyle = this.styles.topRight; break;
			case BadgePosition.middleLeft: this._positionStyle = this.styles.middleLeft; break;
			case BadgePosition.middle: this._positionStyle = this.styles.middle; break;
			case BadgePosition.middleRight: this._positionStyle = this.styles.middleRight; break;
			case BadgePosition.bottomLeft: this._positionStyle = this.styles.bottomLeft; break;
			case BadgePosition.bottom: this._positionStyle = this.styles.bottom; break;
			case BadgePosition.bottomRight: this._positionStyle = this.styles.bottomRight; break;
		}
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
