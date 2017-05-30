'use strict';

import * as React from 'react';
import {nil} from 'util.toolbox';
import {Button, ButtonProps, getDefaultButtonProps} from '../button';

const styles = require('./styles.css');

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

export const ButtonToggleComponent = (props: ButtonToggleProps) => (
    <Button
		classes={props.classes}
		disabled={props.disabled}
		iconName={props.iconName}
        onClick={props.onClick}
		style={props.style}
		visible={props.visible}
		noripple
	/>
);

export class ButtonToggle extends React.Component<ButtonToggleProps, ButtonToggleState> {

    public static defaultProps: ButtonToggleProps = Object.assign(
		getDefaultButtonProps(), {
			bgColorOff: "inherit",
			bgColorOn: "inherit",
			fgColorOff: "white",
			fgColorOn: "black",
			initialToggle: false,
			iconNameOff: 'bomb',
			iconNameOn: 'bomb',
			style: {
				color: "black",
				backgroundColor: "white"
			}
		});

    constructor(props: ButtonToggleProps) {
		super(props);
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

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);

		if (this.props.className !== '') {
			l.push(this.props.className);
		}
		l.push('ui-buttonToggle');

		if (!this.props.visible) {
			l.push(styles.invisible);
		}

		if (this.props.disabled) {
			l.push(styles.disabled);
		}

		return l;
	}

	render() {
		return (
			<ButtonToggleComponent
				{...this.props}
				iconName={this.state.toggle ? this.props.iconNameOn : this.props.iconNameOff}
				onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nil}
				classes={this.buildClasses()}
				style={{
					color: (this.state.toggle) ? this.props.fgColorOn : this.props.fgColorOff,
					backgroundColor: (this.state.toggle) ? this.props.bgColorOn : this.props.bgColorOff
				}}
			/>
		);
	}
}
