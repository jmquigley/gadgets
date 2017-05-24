import * as React from 'react';
import {nil} from 'util.toolbox';
import {ButtonProps} from '../button';

const styles = require('./styles.css');

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
    <button
        className={`fa fa-${props.iconName} ui ui-buttonToggle ${props.classes.join(' ')}`}
        onClick={props.onClick}
		aria-hidden="true"
		disabled={props.enabled ? false : true}
		style={props.style}
	>
    </button>
);

export class ButtonToggle extends React.Component<ButtonToggleProps, ButtonToggleState> {

    public static defaultProps: ButtonToggleProps = {
		bgColorOff: "inherit",
		bgColorOn: "inherit",
		fgColorOff: "white",
		fgColorOn: "black",
		classes: [],
		enabled: true,
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
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);
		l.push(styles.button);

		if (!this.props.visible) {
			l.push(styles.buttonInvisible);
			l.push(styles.buttonDisabled);
		}

		if (!this.props.enabled) {
			l.push(styles.buttonDisabled);
			l.push(styles.nohover);
		}

		return l;
	}

	render() {
		return (
			<ButtonToggleComponent
				{...this.props}
				iconName={this.state.toggle ? this.props.iconNameOn : this.props.iconNameOff}
				onClick={(this.props.enabled && this.props.visible) ? this.handleClick : nil}
				classes={this.buildClasses()}
				style={{
					color: (this.state.toggle) ? this.props.fgColorOn : this.props.fgColorOff,
					backgroundColor: (this.state.toggle) ? this.props.bgColorOn : this.props.bgColorOff
				}}
			/>
		);
	}
}
