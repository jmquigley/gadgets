import * as React from 'react';
import {Button, ButtonProps} from '../button';

const sharedStyles = require('../shared/styles.css');
const styles = require('./styles.css');

export interface ButtonDialogProps extends ButtonProps {
	dialogClasses?: string[];
}

export interface ButtonDialogState {
	visible: boolean;
}

export const ButtonDialogComponent = (props: ButtonDialogProps) => (
	<div
		className={props.classes.join(' ')}
		disabled={props.disabled}>

		<Button
			disabled={props.disabled}
			iconName={props.iconName}
			onClick={props.onClick}
			style={props.style}
			visible={props.visible}
		/>
		<div className={props.dialogClasses.join(' ')}>
			<span>
			{props.children}
			</span>
		</div>
	</div>
);

export class ButtonDialog extends React.Component<ButtonDialogProps, ButtonDialogState> {

    public static defaultProps: ButtonDialogProps = {
		classes: [],
		className: '',
		dialogClasses: [],
		disabled: false,
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
		});
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);

		if (this.props.className !== '') {
			l.push(this.props.className);
		}
		l.push('ui-button-dialog');

		if (!this.props.visible) {
			l.push(sharedStyles.invisible);
		}

		if (this.props.disabled) {
			l.push(sharedStyles.disabled);
		}

		return l;
	}

	private buildDialogClasses = () => {
		let l: string[] = Array.from(this.props.dialogClasses);
		l.push(styles.buttonDialog);
		l.push(styles.buttonDialogPopup);
		l.push('ui-dialog-popup');

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
