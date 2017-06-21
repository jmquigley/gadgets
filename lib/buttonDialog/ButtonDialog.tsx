/**
 * A button control that opens up a local dialog box when clicked.
 * The dialog box content is the child content of the control.  When the
 * button is clicked the hidden dialog window is shown.  See the `Button` control
 * for additional events and properties.
 *
 * #### Examples:
 *
 * ```javascript
 * import {ButtonDialog} from 'gadgets';
 * <ButtonDialog iconName="bars" sizing={Sizing.normal} onClick={someFunction}>
 *    ... dialog popup content
 * </ButtonDialog>
 * ```
 *
 * #### Events
 * - `onClick()` - This callback is invoked when the control is clicked by the user
 *
 * #### Styles
 * - `ui-button-dialog` - A top level style placed on the `<div>` element that contains
 * the button and the hidden dialogue window.
 * - `ui-dialog-popup` - Exists on the hidden dialog window.
 *
 * #### Properties
 * - `dialogClasses: string[] ([])` - An array of CSS class strings that will be
 * applied to the dialog window.
 *
 * @module ButtonDialog
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {Button, ButtonProps, getDefaultButtonProps} from '../button';
import {BaseComponent} from '../shared';

export interface ButtonDialogProps extends ButtonProps {
	dialogClasses?: string[];
}

export function getDefaultButtonDialogProps(): ButtonDialogProps {
	return cloneDeep(Object.assign(
		getDefaultButtonProps(), {
			dialogClasses: []
		}));
}

export interface ButtonDialogState {
	visible: boolean;
}

export class ButtonDialog extends BaseComponent<ButtonDialogProps, ButtonDialogState> {

    public static defaultProps: ButtonDialogProps = getDefaultButtonDialogProps();

	private _dialogClasses: string[] = [];

	constructor(props: ButtonDialogProps) {
		super(props, require('./styles.css'));
		this.state = {
			visible: false
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleDialogClick = this.handleDialogClick.bind(this);
	}

	private handleClick() {
		this.setState({
			visible: !this.state.visible
		});

		this.props.onClick();
	};

	private handleDialogClick() {
		this.setState({
			visible: false
		});
	};

	protected buildStyles() {
		super.buildStyles(this.props);

		this.classes.push('ui-button-dialog');
		this.classes.push(this.styles.buttonDialog);

		this._dialogClasses = this.props.dialogClasses.slice();
		this._dialogClasses.push(this.styles.buttonDialogPopup);
		this._dialogClasses.push('ui-dialog-popup');

		if (!this.state.visible) {
			this._dialogClasses.push(this.styles.buttonDialogHide);
		}
	}

	render() {
		this.buildStyles();

		return (
			<div
				className={this.classes.join(' ')}
				disabled={this.props.disabled}
				>
				<Button
					style={this.inlineStyle}
					color={this.props.color}
					backgroundColor={this.props.backgroundColor}
					disabled={this.props.disabled}
					iconName={this.props.iconName}
					onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nilEvent}
					sizing={this.props.sizing}
					visible={this.props.visible}
					/>
				<div
					onClick={this.handleDialogClick}
					className={this._dialogClasses.join(' ')}
					>
					{this.props.children}
				</div>
			</div>
		);
	}
}
