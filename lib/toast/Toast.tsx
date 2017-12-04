/**
 * A popup that contains a message on the top or bottom of that container.
 * The message will disapper after N seconds.  Contains an X button to remove
 * sooner if the user desires.  A toast can also be persistent and then it
 * will only disappear when the user clicks the close button.
 *
 * It contains four basic modes:
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
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/toast.png" width="50%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Toast, ToastLevel} from 'gadgets';
 *
 * <Toast
 *     decay={true}
 *     level={ToastLevel.info}
 * >
 *     This is a sample info message
 * </Toast>
 * ```
 *
 * ```javascript
 * import {Toast, ToastLevel} from 'gadgets';
 *
 * <Toast
 *     decay={false}
 *     level={ToastLevel.custom}
 *     style={{
 *         backgroundColor="#7fbf3f"
 *         borderColor="#3fbfbf"
 *         color="magenta"
 *     }}
 * >
 *     This is a sample custom message
 * </Toast>
 * ```
 *
 * ## API
 * #### Events
 * - `onClick()` - If the user clicks the close button this event is invoked.
 * - `onClose()` - when the message is closed or disappers this callback is
 * invoked.  It takes no parameters.
 *
 * #### Styles
 * - `ui-toast` - second level style placed on the content `<div>`.
 *
 * #### Properties
 * - `bottom {boolean} (false)` - If this is true, then the message will be
 * drawn at the bottom of the container where the message generated,
 * otherwise the message is written to the top of the container.
 * - `decay {boolean} (true)` - There are two types of Toast messages: decay and
 * persistent.  The decay type, when this property is true, will automatically
 * disapper after *duration*  seconds.  The persistent type will stay within
 * the container until the user presses the close button (X).
 * - `duration {number} (3)` - The number of seconds the message will appear when
 * using a message type of *decay* (see type below). e.g. "5" = five seconds.
 * - `level {ToastLevel} (ToastLevel.info)` - The logging level of message that
 * will be printed.  This works like log4js levels and contains four basic
 * types: info, warning, error, and custom.  Each type has a special color scheme
 * associated with it (info is blue, warning is yellow, error is red).  An enumeration
 * named `ToastLevel` holds the value for each type (ToastLevel.info,
 * ToastLevel.warning, ToastLevel.error, ToastLevel.custom).
 *
 * @module Toast
 */

'use strict';

// const debug = require('debug')('Toast');

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {calc} from 'util.calc';
import {nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {
	BaseComponent,
	BaseProps,
	baseZIndex,
	Color,
	fontStyle,
	getDefaultBaseProps,
	getTheme
} from '../shared';
import styled, {css, ThemeProvider, withProps} from '../shared/themed-components';

export enum ToastLevel {
	info,
	warning,
	error,
	custom
}

export interface ToastProps extends BaseProps {
	bottom?: boolean;
	decay?: boolean;
	duration?: number;
	level?: ToastLevel;
	onClick?: any;
	onClose?: any;
	show?: boolean;
}

export function getDefaultToastProps(): ToastProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			bottom: false,
			decay: true,
			duration: 3,
			level: ToastLevel.info,
			obj: 'Toast',
			onClick: nilEvent,
			onClose: nilEvent,
			show: false
		}));
}

export interface ToastState {
	visible: boolean;
}

export const ContentView: any = withProps<ToastProps, HTMLDivElement>(styled.div)`
	align-items: center;
	display: flex;
	flex: 6;
	padding: 12px 15px;

	span {
		display: inline-flex;
		user-select: auto;
	}

	${props => fontStyle[props.sizing]}
`;

export const Error: any = css`
	border-color: ${Color.error};
	background-color: ${Color.error};
`;

export const Info: any = css`
	border-color: ${Color.info};
	background-color: ${Color.info};
`;

export const Warning: any = css`
	border-color: ${Color.warning};
	background-color: ${Color.warning};
`;

export const Hide: any = css`
	opacity: 0;
	z-index: -1;
	animation: fadeOut ${props => calc(props.theme.transitionDelay, '* 2')};
`;

export const Show: any = css`
	opacity: 1.0;
	z-index: ${baseZIndex};
`;

export const StyledButton: any = styled(Button)`
	flex: 1;
	height: unset;
`;

export const ToastView: any = withProps<ToastProps, HTMLDivElement>(styled.div)`
	bottom: ${props => props.bottom ? '0' : 'unset'};
	color: white;
	display: flex;
	left: 50%;
	margin: 0 auto;
	position: absolute;
	top: ${props => props.bottom ? 'unset' : '0'};
	transform: translateX(-50%);
	width: 70%;

	${props => {
		switch (props.level) {
			case ToastLevel.warning: return Warning;
			case ToastLevel.error: return Error;
			case ToastLevel.info:
			default:
				return Info;
		}
	}};

	${props => props.xcss}
`;

export class Toast extends BaseComponent<ToastProps, ToastState> {

	public static readonly defaultProps: ToastProps = getDefaultToastProps();

	private _timer: any = null;

	constructor(props: ToastProps) {
		super(props, Toast.defaultProps.style);

		this._classes.add('ui-toast');

		this.state = {
			visible: this.props.show
		};

		this.handleDecay();
		this.componentWillUpdate(this.props, this.state);
	}

	@autobind
	private handleClose() {
		if (this._timer) {
			clearTimeout(this._timer);
			this._timer = null;
		}

		this.setState({
			visible: false
		}, () => {
			this.props.onClose();
		});
	}

	@autobind
	private handleDecay() {
		if (this.props.decay && this.state.visible) {
			this._timer = setTimeout(() => {
				this.handleClose();
			}, this.props.duration * 1000);
		}
	}

	public componentDidUpdate() {
		this.handleDecay();
	}

	public componentWillReceiveProps(nextProps: ToastProps) {
		if (nextProps.show !== this.state.visible) {
			this.setState({
				visible: nextProps.visible
			});
		}
	}

	public render() {
		return (
			<ThemeProvider theme={getTheme()} >
				<ToastView
					bottom={this.props.bottom}
					className={this.classes}
					level={this.props.level}
					style={this.inlineStyles}
					xcss={this.state.visible ? Show : Hide}
				>
					<ContentView
						className="ui-toast-content"
						sizing={this.props.sizing}
					>
						<span>{this.props.children}</span>
					</ContentView>
					<StyledButton
						iconName="times"
						onClick={this.handleClose}
						sizing={this.next(this.props.sizing).type}
						style={{
							color: 'white'
						}}
					/>
				</ToastView>
			</ThemeProvider>
		);
	}
}
