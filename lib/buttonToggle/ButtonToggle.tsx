import * as React from 'react';
import {nil} from 'util.toolbox';
import {Button, ButtonProps} from '../button';

const sharedStyles = require('../shared/styles.css');

export interface ButtonToggleProps extends ButtonProps {
	bgColorOff?: string;
	bgColorOn?: string;
	fgColorOff?: string;
	fgColorOn?: string;
	iconName?: string;
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

    public static defaultProps: ButtonToggleProps = {
		bgColorOff: "inherit",
		bgColorOn: "inherit",
		fgColorOff: "white",
		fgColorOn: "black",
		classes: [],
		className: '',
		disabled: false,
		initialToggle: false,
		iconName: 'bomb',
        iconNameOff: 'bomb',
        iconNameOn: 'bomb',
        onClick: nil,
		style: {
			color: "black",
			backgroundColor: "white"
		},
		visible: true
    };

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
			l.push(sharedStyles.invisible);
			l.push(sharedStyles.disabled);
		}

		if (this.props.disabled) {
			l.push(sharedStyles.disabled);
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
