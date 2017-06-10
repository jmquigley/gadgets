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

	private _classes: string = '';
	private _dialogClasses: string = '';
	private _style: any = null;

	constructor(props: ButtonDialogProps) {
		super(props);
		this.state = {
			visible: false
		};
	}

	private buildStyles = () => {
		this._style = Object.assign({
			color: (this.props.color || 'black'),
			backgroundColor: (this.props.backgroundColor || 'white')
		}, this.props.style);

		this._classes = baseClasses(this.props);
		this._classes += ` ${styles.buttonDialog}`;
		this._classes += ' ui-button-dialog';

		this._dialogClasses = this.props.dialogClasses.join(' ');
		this._dialogClasses += ` ${styles.buttonDialogPopup}`;
		this._dialogClasses += ` ui-dialog-popup`;

		if (!this.state.visible) {
			this._dialogClasses += ` ${styles.buttonDialogHide}`;
		}
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
		this.buildStyles();

		return (
			<div
				className={this._classes}
				disabled={this.props.disabled}>

				<Button
					disabled={this.props.disabled}
					iconName={this.props.iconName}
					onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nil}
					visible={this.props.visible}
					style={this._style}
				/>
				<div
					onClick={this.handleDialogClick}
					className={this._dialogClasses}>
					<span>
						{this.props.children}
					</span>
				</div>
			</div>
		);
	}
}
