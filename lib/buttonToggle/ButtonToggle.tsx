'use strict';

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

export interface ButtonToggleState {
	toggle: boolean;
}

export class ButtonToggle extends BaseComponent<ButtonToggleProps, ButtonToggleState> {

    public static defaultProps: ButtonToggleProps = Object.assign(
		getDefaultButtonProps(), {
			bgColorOff: "inherit",
			bgColorOn: "inherit",
			fgColorOff: "gray",
			fgColorOn: "black",
			initialToggle: false,
			iconNameOff: 'bomb',
			iconNameOn: 'bomb'
		});

    constructor(props: ButtonToggleProps) {
		super(props, require('./styles.css'));
		this.state = {
			toggle: props.initialToggle
		};
	}

	private handleClick = () => {
		this.setState({
			toggle: !this.state.toggle
		});

		this.props.onClick(this.state.toggle);
	}

	protected buildStyles() {
		super.buildStyles(this.props);
		this.classes += " ui-buttontoggle";
		this.classes += ` ${this.styles.buttonToggle}`;
	}

	render() {
		this.buildStyles();

		return (
			<Button
				className={this.classes}
				style={this.inlineStyle}
				color={(this.state.toggle) ? this.props.fgColorOn : this.props.fgColorOff}
				backgroundColor={(this.state.toggle) ? this.props.bgColorOn : this.props.bgColorOff}
				disabled={this.props.disabled}
				size={this.props.size}
				iconName={this.state.toggle ? this.props.iconNameOn : this.props.iconNameOff}
				onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nilEvent}
				noripple
			/>
		);
	}
}
