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

const styles = require('./styles.css');

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

	private _positionStyle: string = '';

	constructor(props: BadgeProps) {
		super(props);
	}

	protected buildStyles() {
		super.buildStyles(this.props,{
			color: (this.props.color || 'black'),
			backgroundColor: (this.props.backgroundColor || 'white'),
			border: `solid 3px ${this.props.color}`
		});

		this._classes += " ui-badge";
		this._classes += ` ${styles.badgeContainer}`;

		switch (this.props.position) {
			case BadgePosition.topLeft: this._positionStyle = styles.topLeft; break;
			case BadgePosition.top: this._positionStyle = styles.top; break;
			case BadgePosition.topRight: this._positionStyle = styles.topRight; break;
			case BadgePosition.middleLeft: this._positionStyle = styles.middleLeft; break;
			case BadgePosition.middle: this._positionStyle = styles.middle; break;
			case BadgePosition.middleRight: this._positionStyle = styles.middleRight; break;
			case BadgePosition.bottomLeft: this._positionStyle = styles.bottomLeft; break;
			case BadgePosition.bottom: this._positionStyle = styles.bottom; break;
			case BadgePosition.bottomRight: this._positionStyle = styles.bottomRight; break;
		}
	}

	render() {
		this.buildStyles();

		let badge = null;
		if (this.props.counter !== 0) {
			badge = (
				<div
					className={`${styles.badge} ${this._positionStyle}`}
					style={this._style}>
					{this.props.counter}
				</div>
			);
		}

		return (
			<div className={this._classes}>
				{this.props.children}
				{badge}
			</div>
		);
	}
}
