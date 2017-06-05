'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {baseClasses, BaseProps} from '../shared';
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

export class Badge extends React.Component<BadgeProps, undefined> {

	public static defaultProps: BadgeProps = getDefaultBadgeProps();

	constructor(props: BadgeProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = baseClasses(this.props)
		return l;
	}

	render() {
		let style = {
			backgroundColor: this.props.backgroundColor,
			color: this.props.color,
			border: `solid 3px ${this.props.color}`
		}

		let positionStyle: string = '';
		switch (this.props.position) {
			case BadgePosition.topLeft: positionStyle = styles.topLeft; break;
			case BadgePosition.top: positionStyle = styles.top; break;
			case BadgePosition.topRight: positionStyle = styles.topRight; break;
			case BadgePosition.middleLeft: positionStyle = styles.middleLeft; break;
			case BadgePosition.middle: positionStyle = styles.middle; break;
			case BadgePosition.middleRight: positionStyle = styles.middleRight; break;
			case BadgePosition.bottomLeft: positionStyle = styles.bottomLeft; break;
			case BadgePosition.bottom: positionStyle = styles.bottom; break;
			case BadgePosition.bottomRight: positionStyle = styles.bottomRight; break;
		}

		let badge = null;
		if (this.props.counter !== 0) {
			badge = (
				<div
					className={`${styles.badge} ${positionStyle}`}
					style={style}>
					{this.props.counter}
				</div>
			);
		}

		return (
			<div className={`${styles.container} ${this.buildClasses().join(' ')}`}>
				{this.props.children}
				{badge}
			</div>
		);
	}
}
