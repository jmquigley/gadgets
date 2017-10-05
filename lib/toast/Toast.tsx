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
 *     level={ToastLevel.info}
 *     type={ToastType.persistent}>
 *     This is a sample info message
 * </Toast>
 * ```
 *
 * ```javascript
 * import {Toast, ToastLevel, ToastType} from 'gadgets';
 *
 * <Toast
 *     level={ToastLevel.custom}
 *     backgroundColor="#7fbf3f"
 *     color="magenta"
 *     borderColor="#3fbfbf"
 *     type={ToastType.persistent}
 * >
 *     This is a sample custom message
 * </Toast>
 * ```
 *
 * #### Events
 * - `onClick()` - If the user clicks the close button this event is invoked.
 * - `onClose()` - when the message is closed or disappers this callback is
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
import {ClassNames} from 'util.classnames';
import {nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {BaseComponent, BaseProps, getDefaultBaseProps, Sizing} from '../shared';

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
	bottom?: boolean;
	duration?: number;
	level?: ToastLevel;
	onClick?: any;
	onClose?: any;
	type?: ToastType;
}

export function getDefaultToastProps(): ToastProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			backgroundColor: 'white',
			borderColor: 'black',
			color: 'black',
			bottom: false,
			duration: 3,
			level: ToastLevel.info,
			onClick: nilEvent,
			onClose: nilEvent,
			type: ToastType.decay,
			visible: true
		}));
}

export interface ToastState {
	visible: boolean;
}

export class Toast extends BaseComponent<ToastProps, ToastState> {

	public static readonly defaultProps: ToastProps = getDefaultToastProps();

	private static readonly _resetMessageLevels = [
		styles.info,
		styles.warning,
		styles.error
	];

	private _buttonSizing: Sizing;
	private _contentStyles: ClassNames = new ClassNames();
	private _timer: any = null;

	constructor(props: ToastProps) {
		super(props, styles, Toast.defaultProps.style);

		this._rootStyles.add([
			'ui-toast',
			this.styles.toast
		]);

		this._contentStyles.add([
			'ui-toast-content',
			this.styles.content
		]);

		this.state = {
			visible: props.visible
		};

		this.bindCallbacks(
			'handleClose',
			'handleDecay'
		);

		this.handleDecay();
		this.componentWillUpdate(props, this.state);
	}

	private handleClose() {
		if (this._timer) {
			clearTimeout(this._timer);
			this._timer = null;
		}

		this.setState({
			visible: false
		});

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

	public componentDidUpdate() {
		this.handleDecay();
	}

	public componentWillReceiveProps(nextProps: ToastProps) {
		if (nextProps.visible !== this.state.visible) {
			this.setState({
				visible: nextProps.visible
			});
		}
	}

	public componentWillUpdate(nextProps: ToastProps, nextState: ToastState) {

		this._buttonSizing = this.next(nextProps.sizing).type;

		if (nextProps.level !== this.props.level) {
			this._rootStyles.reset(Toast._resetMessageLevels);
		}

		switch (nextProps.level) {
			case ToastLevel.info:
				this._rootStyles.on(this.styles.info);
				break;

			case ToastLevel.warning:
				this._rootStyles.on(this.styles.warning);
				break;

			case ToastLevel.error:
				this._rootStyles.on(this.styles.error);
				break;
		}

		this._rootStyles.onIfElse(nextProps.bottom)(
			this.styles.toastBottom
		)(
			this.styles.toastTop
		);

		this._rootStyles.onIf(!nextState.visible)(
			this.styles.hide
		);

		this.updateFontStyle(this._contentStyles, nextProps, this.props);

		super.componentWillUpdate(nextProps);
	}

	public render() {
		return (
			<div
				className={this._rootStyles.classnames}
				style={this.inlineStyles}
			>
				<div className={this._contentStyles.classnames}>
					<span>{this.props.children}</span>
				</div>
				<Button
					className={this.styles.button}
					color="white"
					iconName="times"
					onClick={this.handleClose}
					sizing={this._buttonSizing}
				/>
			</div>
		);
	}
}
