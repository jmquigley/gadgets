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
 * Note that the "visible" property is handled internally.  The *show* property
 * is used to display the message within the `Toast`.
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
 *     onClose={() => console.log('closed toast message')}
 *     show={true}
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
 *     show={true}
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
 * - `usebottom {boolean} (false)` - If this is true, then the message will be
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
 * - `show {boolean} (false)` - when set to true, the toast message is shown within
 * the container for the duration of its delay.  When false it is not shown.
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
	BaseState,
	baseZIndex,
	Color,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Wrapper
} from '../shared';
import styled, {css} from '../shared/themed-components';

export enum ToastLevel {
	info,
	warning,
	error,
	custom
}

export interface ToastProps extends BaseProps {
	usebottom?: boolean;
	decay?: boolean;
	duration?: number;
	level?: ToastLevel;
	onClick?: any;
	onClose?: any;
	show?: boolean;
}

export function getDefaultToastProps(): ToastProps {
	return cloneDeep({...getDefaultBaseProps(),
		usebottom: false,
		decay: true,
		duration: 3,
		level: ToastLevel.info,
		obj: 'Toast',
		onClick: nilEvent,
		onClose: nilEvent,
		show: false
	});
}

export interface ToastState extends BaseState {
	visible: boolean;
}

export function getDefaultToastState(): ToastState {
	return cloneDeep({...getDefaultBaseState('ui-toast'),
		visible: false
	});
}

export const ContentView: any = styled.div`
	align-items: center;
	display: flex;
	flex: 6;
	padding: 12px 15px;

	span {
		display: inline-flex;
		user-select: auto;
	}

	${(props: ToastProps) => fontStyle[props.sizing]}
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
	animation: fadeOut ${(props: ToastProps) => calc(props.theme.transitionDelay, '* 2')};
	opacity: 0;
	z-index: -1;
`;

export const Show: any = css`
	opacity: 1.0;
	z-index: ${baseZIndex};
`;

export const StyledButton: any = styled(Button)`
	flex: 1;
	height: unset;
`;

export const ToastView: any = styled.div`
	bottom: ${(props: ToastProps) => props.usebottom ? '0' : 'unset'};
	color: white;
	display: flex;
	left: 50%;
	margin: 0 auto;
	position: absolute;
	top: ${(props: ToastProps) => props.usebottom ? 'unset' : '0'};
	transform: translateX(-50%);
	width: 70%;

	${(props: ToastProps) => {
		switch (props.level) {
			case ToastLevel.warning: return Warning;
			case ToastLevel.error: return Error;
			case ToastLevel.info:
			default:
				return Info;
		}
	}};

	${(props: ToastProps) => props.xcss}
	${(props: ToastProps) => disabled(props)}
	${(props: ToastProps) => invisible(props)}
`;

export class Toast extends BaseComponent<ToastProps, ToastState> {

	public static readonly defaultProps: ToastProps = getDefaultToastProps();

	private _initialVisibility: boolean = false;
	private _timer: any = null;

	constructor(props: ToastProps) {
		super(props, Toast.defaultProps.style);

		this.state = {...getDefaultToastState(),
			visible: props.show
		};

		this.handleDecay();
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

	public componentDidMount() {
		// The initial visibility of the control is set to invisible
		// This prevents a "flicker" when the component is first created
		// where it is shown within it's parent before it is initially
		// hidden due to use of dynamic styling.  If the display is not
		// set to "none" then the control will be visible for a split
		// second before the dynamic stying is applied to hide it.

		this._initialVisibility = true;
	}

	public static getDerivedStateFromProps(props: ToastProps, state: ToastState) {
		const newState: ToastState = {...state,
			visible: props.show
		};

		return super.getDerivedStateFromProps(props, newState);
	}

	public render() {
		return (
			<Wrapper {...this.props} >
				<ToastView
					usebottom={this.props.usebottom}
					className={this.state.classes.classnames}
					disabled={this.props.disabled}
					level={this.props.level}
					style={this.state.style}
					xcss={this.state.visible ? Show : Hide}
					visible={this._initialVisibility}
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
						sizing={BaseComponent.next(this.props.sizing).type}
						style={{
							color: 'white'
						}}
					/>
				</ToastView>
			</Wrapper>
		);
	}
}
