'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Button} from '../button';
import {baseClasses, BaseProps, getDefaultBaseProps} from '../shared';

const styles = require('./styles.css');

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
	level?: ToastLevel;
	type?: ToastType;
}

export function getDefaultToastProps(): ToastProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			duration: 3,
			level: ToastLevel.info,
			type: ToastType.decay,
			visible: false
		}));
}

export interface ToastState {
	visible: boolean;
}

/**
 * For this to work properly the container holding this control must have a
 * position of "relative".  The control relies on absolute positioning so the
 * parent needs to be relative for it to work.
 */
export class Toast extends React.Component<ToastProps, ToastState> {

	public static defaultProps: ToastProps = getDefaultToastProps();
	private _timer: any = null;

	constructor(props: ToastProps) {
		super(props);
		this.state = {
			visible: props.visible
		}

		this.handleDecay();
	}

	componentWillReceiveProps(nextProps: ToastProps) {
		if (nextProps.visible != this.state.visible) {
			this.setState({
				visible: nextProps.visible
			});
		}
	}

	componentDidUpdate() {
		this.handleDecay();
	}

	private buildClasses = () => {
		let l: string[] = baseClasses(this.props, {visible: false})

		let level = 'ui-toast-custom';
		switch (this.props.level) {
			case ToastLevel.info:
				level = styles.info;
				break;

			case ToastLevel.warning:
				level = styles.warning;
				break;

			case ToastLevel.error:
				level = styles.error;
				break;
		}
		l.push(level);

		return l;
	}

	private handleClose = () => {
		if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }

		this.setState({
			visible: false
		})

		this.props.onClose();
	}

	private handleDecay = () => {
		if (this.props.type === ToastType.decay && this.state.visible) {
			this._timer = setTimeout(() => {
				if (this.state.visible) {
					this.setState({visible: false});
					this.props.onClose();
				}
			}, this.props.duration * 1000);
		}
	}

	render() {
		return (
			<div className={`ui-toast ${styles.toast} ${!this.state.visible ? styles.hide : ''} ${this.buildClasses().join(' ')}`}>
				<div className={styles.content}>
					{this.props.children}
				</div>

				<Button className={styles.button} iconName="times" onClick={this.handleClose} />
			</div>
		);
	}
}
