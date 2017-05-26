import * as React from 'react';
import {Button, ButtonProps} from '../button';

const styles = require('./styles.css');

export interface ButtonDialogProps extends ButtonProps {
	dialogClasses?: string[];
}

export interface ButtonDialogState {
	visible: boolean;
}

export const ButtonDialogComponent = (props: ButtonDialogProps) => (
	<div
		className={`ui ui-button-dialog ${props.classes.join(' ')}`}
		disabled={props.enabled ? false : true}>

		<Button
			enabled={props.enabled}
			iconName={props.iconName}
			onClick={props.onClick}
			style={props.style}
			visible={props.visible}
		/>
		<div className={`ui ui-dialog-popup ${props.dialogClasses.join(' ')}`} >
			<span>
			{props.children}
			</span>
		</div>
	</div>
);

export class ButtonDialog extends React.Component<ButtonDialogProps, ButtonDialogState> {

    public static defaultProps: ButtonDialogProps = {
		classes: [],
		dialogClasses: [],
		enabled: true,
        iconName: 'bomb',
		style: {},
		visible: true
    };

	constructor(props: ButtonDialogProps) {
		super(props);
		this.state = {
			visible: false
		};
	}

	handleClick = () => {
		this.setState({
			visible: !this.state.visible
		})
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);

		if (!this.props.visible) {
			l.push(styles.buttonDialogInvisible);
			l.push(styles.buttonDialogDisabled);
		}

		if (!this.props.enabled) {
			l.push(styles.buttonDialogDisabled);
		}

		return l;
	}

	private buildDialogClasses = () => {
		let l: string[] = Array.from(this.props.dialogClasses);
		l.push(styles.buttonDialog);
		l.push(styles.buttonDialogPopup);

		if (!this.state.visible) {
			l.push(styles.buttonDialogHide);
		}
		return l;
	}

	render() {
		return (
			<ButtonDialogComponent
				{...this.props}
				onClick={this.handleClick}
				classes={this.buildClasses()}
				dialogClasses={this.buildDialogClasses()}
			/>
		);
	}
}
