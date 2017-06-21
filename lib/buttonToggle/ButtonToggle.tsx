/**
 * {description}
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button} from 'gadgets';
 * <Button iconName="cab" onClick={someFunction} />
 * ```
 *
 * #### Events
 * - `{name}` - {description}
 *
 * #### Styles
 * - `` - {description}
 *
 * #### Properties
 * - `{name}: {datatype}` - {description}
 *
 * @module ButtonToggle
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
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
}

export function getDefaultButtonToggleProps(): ButtonToggleProps {
	return cloneDeep(Object.assign(
		getDefaultButtonProps(), {
			bgColorOff: "inherit",
			bgColorOn: "inherit",
			fgColorOff: "gray",
			fgColorOn: "black",
			initialToggle: false,
			iconNameOff: "bomb",
			iconNameOn: "bomb"
		}));
}

export interface ButtonToggleState {
	toggle: boolean;
}

export class ButtonToggle extends BaseComponent<ButtonToggleProps, ButtonToggleState> {

    public static defaultProps: ButtonToggleProps = getDefaultButtonToggleProps();

    constructor(props: ButtonToggleProps) {
		super(props, require('./styles.css'));
		this.state = {
			toggle: props.initialToggle
		};

		this.handleClick = this.handleClick.bind(this);
	}

	private handleClick() {
		this.setState({
			toggle: !this.state.toggle
		});

		this.props.onClick(this.state.toggle);
	}

	protected buildStyles() {
		super.buildStyles(this.props);
		this.classes.push('ui-button-toggle');
		this.classes.push(this.styles.buttonToggle);
	}

	render() {
		this.buildStyles();

		return (
			<Button
				backgroundColor={(this.state.toggle) ? this.props.bgColorOn : this.props.bgColorOff}
				className={this.classes.join(" ")}
				color={(this.state.toggle) ? this.props.fgColorOn : this.props.fgColorOff}
				disabled={this.props.disabled}
				iconName={this.state.toggle ? this.props.iconNameOn : this.props.iconNameOff}
				noripple
				onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nilEvent}
				sizing={this.props.sizing}
				style={this.inlineStyle}
				/>
		);
	}
}
