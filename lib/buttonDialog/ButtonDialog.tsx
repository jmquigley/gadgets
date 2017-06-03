'use strict';

import * as React from 'react';
import {nil} from 'util.toolbox';
import {Button, ButtonProps, getDefaultButtonProps} from '../button';
import {baseClasses} from '../shared';

const styles = require('./styles.css');

export interface ButtonDialogProps extends ButtonProps {
	dialogClasses?: string[];
}

export interface ButtonDialogState {
	visible: boolean;
}

export class ButtonDialog extends React.Component<ButtonDialogProps, ButtonDialogState> {

    public static defaultProps: ButtonDialogProps = Object.assign(
		getDefaultButtonProps(), {
			dialogClasses: []
     });

	constructor(props: ButtonDialogProps) {
		super(props);
		this.state = {
			visible: false
		};
	}

	private buildClasses = () => {
		let l: string[] = baseClasses(this.props);
		l.push(styles.buttonDialog);
		l.push('ui-button-dialog');

		return l;
	}

	private buildDialogClasses = () => {
		let l: string[] = Array.from(this.props.dialogClasses);
		l.push(styles.buttonDialogPopup);
		l.push('ui-dialog-popup');

		if (!this.state.visible) {
			l.push(styles.buttonDialogHide);
		}
		return l;
	}

	private handleClick = () => {
		this.setState({
			visible: !this.state.visible
		});

		this.props.onClick();
	}

	private handleDialogClick = () => {
		this.setState({
			visible: false
		});
	}

	render() {
		return (
			<div
				className={this.buildClasses().join(' ')}
				disabled={this.props.disabled}>

				<Button
					disabled={this.props.disabled}
					iconName={this.props.iconName}
					onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nil}
					visible={this.props.visible}
				/>
				<div
					onClick={this.handleDialogClick}
					className={this.buildDialogClasses().join(' ')}>
					<span>
						{this.props.children}
					</span>
				</div>
			</div>
		);
	}
}
