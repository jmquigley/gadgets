/**
 * A button control that switches between the given icons when clicked.
 * There are two forms for this component: controlled and uncontrolled.
 * The default process is controlled.  This means that the component will
 * maintain the internal toggled state of the command.  When the property
 * controlled is set to false, then the toggle state is managed by the
 * given *selected* property.  This property is ignored when the
 * component is controlled.
 *
 * On each click the `onClick` callback is invoked and given the current
 * state.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/buttons-icons.png" width="70%" />
 *
 * ## Examples:
 *
 * #### Controlled (default)
 * ```javascript
 * import {ButtonToggle} from 'gadgets';
 * <ButtonToggle
 *     iconNameOn="star"
 *     iconNameOff="star-o"
 *     fgColorOn="red"
 *     fgColorOff="blue"
 *     sizing={Sizing.normal}
 *     onClick={somefunction}
 * />
 * ```
 *
 * #### Uncontrolled
 * ```javascript
 * import {ButtonToggle} from 'gadgets';
 * <ButtonToggle
 *     controlled={false}
 *     iconNameOn="star"
 *     iconNameOff="star-o"
 *     fgColorOn="red"
 *     fgColorOff="blue"
 *     selected={true}
 *     sizing={Sizing.normal}
 *     onClick={somefunction}
 * />
 * ```
 *
 * #### Events
 * - `onclick(toggle: boolean)` - When the button is clicked, then the
 * button toggle is changed.  This callback returns the current state
 * of the toggle.  True is on, false is off.
 *
 * #### Styles
 * - `ui-button-toggle` - Style applied to the `<i>` button control.
 *
 * #### Properties
 * - `bgColorOff: {string} ('inherit')` - The background color when the
 * button is in the off position.
 * - `bgColorOn: {string} ('inherit')` - The background color when the
 * button is in the on position
 * - `fgColorOff: {string} ('gray')` - The foreground color when the
 * button is in the off position
 * - `fgColorOn: {string} ('black')` - the foreground color when the
 * button is in the on position
 * - `iconNameOff: {string} ('bomb')` - the name of the font awesome icon
 * associated with the button when it is off.
 * - `iconNameOn: {string} ('bomb')` - the name of the font awesome icon
 * associated with the button when it is on.
 * - `initialToggle: {boolean} (false)` - the initial state of the button
 * This is different than selected, as it is only used when the button
 * is created.  It is ignored after creation (where selected is not)
 * - `selected: boolean (false)` - Sets the state of the button to
 * on (true) or off (false).
 *
 * @module ButtonToggle
 */

'use strict';

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {
	Button,
	ButtonProps,
	ButtonState,
	getDefaultButtonProps,
	getDefaultButtonState
} from '../button';
import {
	BaseComponent,
	// @ts-ignore
	BaseState,
	Wrapper
} from '../shared';

export interface ButtonToggleProps extends ButtonProps {
	bgColorOff?: string;
	bgColorOn?: string;
	fgColorOff?: string;
	fgColorOn?: string;
	iconNameOff?: string;      // font awesome string
	iconNameOn?: string;       // font awesome string
	initialToggle?: boolean;
	onClick?: any;
}

export function getDefaultButtonToggleProps(): ButtonToggleProps {
	return cloneDeep(Object.assign({},
		getDefaultButtonProps(), {
			bgColorOff: 'inherit',
			bgColorOn: 'inherit',
			fgColorOff: 'gray',
			fgColorOn: 'black',
			iconNameOff: 'bomb',
			iconNameOn: 'bomb',
			initialToggle: false,
			obj: 'ButtonToggle',
			onClick: nilEvent,
			selected: false
		})
	);
}

export interface ButtonToggleState extends ButtonState {
	toggle: boolean;
}

export function getDefaultButtonToggleState(): ButtonToggleState {
	return cloneDeep(Object.assign({},
		getDefaultButtonState(), {
			toggle: false
		}));
}

export class ButtonToggle extends BaseComponent<ButtonToggleProps, ButtonToggleState> {

	public static defaultProps: ButtonToggleProps = getDefaultButtonToggleProps();
	public state: ButtonToggleState = getDefaultButtonToggleState();

	constructor(props: ButtonToggleProps) {
		super(props, ButtonToggle.defaultProps.style);
		this.state['toggle'] = this.props.initialToggle;
	}

	@autobind
	public handleClick() {
		if (!this.props.disabled && this.props.visible && this.props.controlled) {
			this.setState({
				toggle: !this.state.toggle
			}, () => {
				this.props.onClick(this.state.toggle);
			});
		} else {
			this.props.onClick(this.state.toggle);
		}
	}

	public static getDerivedStateFromProps(props: ButtonToggleProps, state: ButtonToggleState) {
		state.classes.clear();
		state.classes.add('ui-button-toggle');

		if (!props.controlled) {
			state.toggle = props.selected;
		}

		if (props.controlled) {
			if (state.toggle) {
				state.style['backgroundColor'] = props.bgColorOn;
				state.style['color'] = props.fgColorOn;
			} else {
				state.style['backgroundColor'] = props.bgColorOff;
				state.style['color'] = props.fgColorOff;
			}
		}

		return super.getDerivedStateFromProps(props, state);
	}

	public render() {
		return (
			<Wrapper {...this.props} >
				<Button
					{...this.props}
					className={this.state.classes.classnames}
					iconName={this.state.toggle ? this.props.iconNameOn : this.props.iconNameOff}
					noripple
					onClick={this.handleClick}
					style={this.state.style}
				/>
			</Wrapper>
		);
	}
}
