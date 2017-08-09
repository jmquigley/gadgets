/**
 * A button control that switches between the given icons when clicked.
 * The state of the button is maintained until it is clicked again.  On
 * each click the `onClick` is invoked and given the current state.
 *
 * #### Examples:
 *
 * ```javascript
 * import {ButtonToggle} from 'gadgets';
 * <ButtonToggle
 *     iconNameOn="star"
 *     iconNameOff="star-o"
 *     fgColorOn="red"
 *     fgColorOff="blue"
 *     sizing={Sizing.normal}
 *     onClick={somefunction}
 *     />
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
 * - `bgColorOff: string ('inherit')` - The background color when the
 * button is in the off position.
 * - `bgColorOn: string ('inherit')` - The background color when the
 * button is in the on position
 * - `fgColorOff: string ('gray')` - The foreground color when the
 * button is in the off position
 * - `fgColorOn: string ('black')` - the foreground color when the
 * button is in the on position
 * - `initialToggle: boolean (false)` - The initial on (true) or
 * off (false) state of the button.
 * - `iconNameOff: string ('bomb')` - the name of the font awesome icon
 * associated with the button when it is off.
 * - `iconNameOn: string ('bomb')` - the name of the font awesome icon
 * associated with the button when it is on.
 *
 * @module ButtonToggle
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {ClassNames} from 'util.classnames';
import {nilEvent} from 'util.toolbox';
import {Button, ButtonProps, getDefaultButtonProps} from '../button';
import {BaseComponent} from '../shared';

export interface ButtonToggleProps extends ButtonProps {
	bgColorOff?: string;
	bgColorOn?: string;
	fgColorOff?: string;
	fgColorOn?: string;
	initialToggle?: boolean;
	iconNameOff?: string;      // font awesome string
	iconNameOn?: string;       // font awesome string
	onClick?: any;
}

export function getDefaultButtonToggleProps(): ButtonToggleProps {
	return cloneDeep(Object.assign(
		getDefaultButtonProps(), {
			bgColorOff: 'inherit',
			bgColorOn: 'inherit',
			fgColorOff: 'gray',
			fgColorOn: 'black',
			initialToggle: false,
			iconNameOff: 'bomb',
			iconNameOn: 'bomb',
			onClick: nilEvent
		})
	);
}

export interface ButtonToggleState {
	toggle: boolean;
}

export class ButtonToggle extends BaseComponent<ButtonToggleProps, ButtonToggleState> {

	public static defaultProps: ButtonToggleProps = getDefaultButtonToggleProps();

	private _rootCN: ClassNames;

	constructor(props: ButtonToggleProps) {
		super(props, require('./styles.css'));

		this._rootCN = new ClassNames([
			'ui-button-toggle',
			this.styles.buttonToggle
		]);

		this.state = {
			toggle: props.initialToggle
		};

		this.bindCallbacks('handleClick');
		this.componentWillUpdate(props);
	}

	private handleClick() {
		this.setState({
			toggle: !this.state.toggle
		});

		this.props.onClick(this.state.toggle);
	}

	public componentWillUpdate(nextProps: ButtonToggleProps) {
		this.buildCommonStyles(this._rootCN, nextProps);
	}

	public render() {
		return (
			<Button
				{...this.props}
				backgroundColor={(this.state.toggle) ? this.props.bgColorOn : this.props.bgColorOff}
				className={this._rootCN.classnames}
				color={(this.state.toggle) ? this.props.fgColorOn : this.props.fgColorOff}
				iconName={this.state.toggle ? this.props.iconNameOn : this.props.iconNameOff}
				noripple
				onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nilEvent}
			/>
		);
	}
}
