'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {baseClasses, BaseProps, getDefaultBaseProps} from '../shared';

// const styles = require('./styles.css');

export enum ToastEffect {
	rollup,
	fade
}

export enum ToastLevel {
	info,
	warning,
	error,
	custom
}

export enum ToastType {
	persistent,
	decay
}

export interface ToastProps extends BaseProps {
	duration?: number;
	effect?: ToastEffect;
	level?: ToastLevel;
	type?: ToastType;
	width?: number;
}

export function getDefaultToastProps(): ToastProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			duration: 5,
			effect: ToastEffect.fade,
			level: ToasLevel.info,
			type: ToastType.decay,
			width: 0
		}));
}

export interface ToastState {
}

export class Toast extends React.Component<ToastProps, undefined> {

	public static defaultProps: ToastProps = getDefaultToastProps();

	constructor(props: ToastProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = baseClasses(this.props)
		return l;
	}

	render() {
		return (
			<div className={`ui-toast ${this.buildClasses().join(' ')}`}>
			</div>
		);
	}
}
