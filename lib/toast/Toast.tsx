/**
 * A popup that contains a message on the top or bottom of that container.
 * The message will disapper after N seconds.  Contains an X button to remove
 * sooner if the user desires.  It contains four basic modes:
 *
 * - info
 * - warning
 * - error
 * - custom
 *
 * For this to work properly the container holding this control must have a
 * position of "relative".  The control relies on absolute positioning so the
 * parent needs to be relative for it to work.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Toast, ToastLevel, ToastType} from 'gadgets';
 *
 * <Toast
 *	level={ToastLevel.info}
 *	type={ToastType.persistent}>
 *	This is a sample info message
 * </Toast>
 * ```
 *
 * ```javascript
 * import {Toast, ToastLevel, ToastType} from 'gadgets';
 *
 * <Toast
 *	level={ToastLevel.custom}
 *	backgroundColor="#7fbf3f"
 *	color="magenta"
 *	borderColor="#3fbfbf"
 *	type={ToastType.persistent}>
 *	This is a sample custom message
 * </Toast>
 * ```
 *
 * #### Events
 * - `onClose()` - when the message is cloed or disappers this callback is
 * invoked.  It takes no parameters.
 *
 * #### Styles
 * - `ui-toast` - second level style placed on the content `<div>`.
 *
 * #### Properties
 * - `backgroundColor: string` - When using a custom type this will be the CSS
 * background color for the message.
 * - `borderColor: string` - When using a custom type this will be the CSS
 * color of the border around the message.
 * - `color: string` - When using a custom type this will be the color of the
 * message text.
 * - `bottom: boolean` - If this is true, then the message will be drawn at the
 * bottom of the container where the message generated, otherwise the message
 * is written to the top of the container.
 * - `duration: number` - The number of seconds the message will appear when
 * using a message type of *decay* (see type below). e.g. "5" = five seconds.
 * - `level: ToastLevel` - The logging level of message that will be printed.
 * This works like log4js levels and contains four basic types: info, warning,
 * error, and custom.  Each type has a special color scheme associated with it
 * (info is blue, warning is yellow, error is red).  An enumeration named
 * `ToastLevel` holds the value for each type (ToastLevel.info, ToastLevel.warning,
 * ToastLevel.error, ToastLevel.custom).
 * - `type: ToastType` - There are two types of Toast messages: decay and
 * persistent.  The decay type will automatically disapper after *duration*
 * seconds.  The persistent type will stay within the container until the user
 * presses the close button (X).  The default type is *decay*.  An enumeration
 * named `ToastType` holds the value for each type (ToastType.decay,
 * ToastType.persistent).
 *
 * @module Toast
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {ButtonCircle} from '../buttonCircle';
import {BaseComponent, BaseProps, getDefaultBaseProps, Sizing} from '../shared';

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
	bottom?: boolean;
	duration?: number;
	level?: ToastLevel;
	type?: ToastType;
}

export function getDefaultToastProps(): ToastProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			backgroundColor: "white",
			borderColor: "black",
			color: "black",
			bottom: false,
			duration: 3,
			level: ToastLevel.info,
			type: ToastType.decay,
			visible: true
		}));
}

export interface ToastState {
	visible: boolean;
}

export class Toast extends BaseComponent<ToastProps, ToastState> {

	public static defaultProps: ToastProps = getDefaultToastProps();

	private _timer: any = null;

	constructor(props: ToastProps) {
		super(props, require("./styles.css"));

		this.state = {
			visible: props.visible
		}

		this.handleClose = this.handleClose.bind(this);
		this.handleDecay = this.handleDecay.bind(this);

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

	private handleClose() {
		if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }

		this.setState({
			visible: false
		})

		this.props.onClose();
	}

	private handleDecay() {
		if (this.props.type === ToastType.decay && this.state.visible) {
			this._timer = setTimeout(() => {
				if (this.state.visible) {
					this.setState({visible: false});
					this.props.onClose();
				}
			}, this.props.duration * 1000);
		}
	}

	protected buildStyles() {

		if (this.props.level === ToastLevel.custom) {
			this.inlineStyle = {
				color: this.props.color,
				backgroundColor: this.props.backgroundColor,
				borderColor: this.props.borderColor
			}
		}

		super.buildStyles(this.props);

		this.classes.push("ui-toast");
		this.classes.push(this.styles.toast);

		switch (this.props.level) {
			case ToastLevel.info:
				this.classes.push(this.styles.info);
				break;

			case ToastLevel.warning:
				this.classes.push(this.styles.warning);
				break;

			case ToastLevel.error:
				this.classes.push(this.styles.error);
				break;
		}

		if (this.props.bottom) {
			this.classes.push(this.styles.bottom);
		} else {
			this.classes.push(this.styles.top);
		}

		if (!this.state.visible) {
			this.classes.push(this.styles.hide);
		}
	}

	render() {
		this.buildStyles();

		return (
			<div
				className={this.classes.join(" ")}
				style={this.inlineStyle}>
				<div className={`ui-toast-content ${this.styles.content}`}>
					{this.props.children}
				</div>

				<ButtonCircle
					className={this.styles.button}
					color="white"
					borderColor="white"
					iconName="times"
					onClick={this.handleClose}
					sizing={Sizing.normal}
					/>
			</div>
		);
	}
}
