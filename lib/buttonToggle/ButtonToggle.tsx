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
 * - `iconNameOff: string ('bomb')` - the name of the font awesome icon
 * associated with the button when it is off.
 * - `iconNameOn: string ('bomb')` - the name of the font awesome icon
 * associated with the button when it is on.
 * - `selected: boolean (false)` - Sets the state of the button to
 * on (true) or off (false) state of the button.
 *
 * @module ButtonToggle
 */

'use strict';

// const debug = require('debug')('ButtonToggle');

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {Button, ButtonProps, getDefaultButtonProps} from '../button';
import {BaseComponent, getTheme} from '../shared';
import {ThemeProvider} from '../shared/themed-components';

export interface ButtonToggleProps extends ButtonProps {
	bgColorOff?: string;
	bgColorOn?: string;
	fgColorOff?: string;
	fgColorOn?: string;
	iconNameOff?: string;      // font awesome string
	iconNameOn?: string;       // font awesome string
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
			obj: 'ButtonToggle',
			onClick: nilEvent,
			selected: false
		})
	);
}

export interface ButtonToggleState {
	toggle: boolean;
}

export class ButtonToggle extends BaseComponent<ButtonToggleProps, ButtonToggleState> {

	public static defaultProps: ButtonToggleProps = getDefaultButtonToggleProps();

	constructor(props: ButtonToggleProps) {
		super(props, ButtonToggle.defaultProps.style);

		this._classes.add('ui-button-toggle');

		this.state = {
			toggle: this.props.selected
		};

		this.componentWillUpdate(this.props, this.state);
	}

	@autobind
	public handleClick() {
		if (!this.props.disabled && this.props.visible) {
			this.setState({
				toggle: !this.state.toggle
			}, () => {
				this.props.onClick(this.state.toggle);
			});
		}
	}

	public componentWillUpdate(nextProps: ButtonToggleProps, nextState: ButtonToggleState) {

		if (nextState.toggle) {
			this.inlineStyles = {
				backgroundColor: nextProps.bgColorOn,
				color: nextProps.fgColorOn
			};
		} else {
			this.inlineStyles = {
				backgroundColor: nextProps.bgColorOff,
				color: nextProps.fgColorOff
			};
		}

		super.componentWillUpdate(nextProps, nextState);
	}

	public componentWillReceiveProps(nextProps: ButtonToggleProps) {
		if (this.props.selected !== nextProps.selected && this.state.toggle !== nextProps.selected) {
			this.setState({toggle: nextProps.selected});
		}
	}

	public render() {
		return (
			<ThemeProvider theme={getTheme()}>
				<Button
					{...this.props}
					className={this.classes}
					iconName={this.state.toggle ? this.props.iconNameOn : this.props.iconNameOff}
					noripple
					onClick={this.handleClick}
					style={this.inlineStyles}
				/>
			</ThemeProvider>
		);
	}
}
