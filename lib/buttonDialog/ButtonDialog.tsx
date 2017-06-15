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

export function getDefaultButtonDialogProps(): ButtonProps {
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
		super(props, require("./styles.css"));
		this.state = {
			visible: false
		};
	}

	private handleClick = () => {
		this.setState({
			visible: !this.state.visible
		});

		this.props.onClick();
	};

	private handleDialogClick = () => {
		this.setState({
			visible: false
		});
	};

	protected buildStyles() {
		super.buildStyles(this.props);

		this.classes.push("ui-button-dialog");
		this.classes.push(this.styles.buttonDialog);

		this._dialogClasses = this.props.dialogClasses.slice();
		this._dialogClasses.push(this.styles.buttonDialogPopup);
		this._dialogClasses.push("ui-dialog-popup");

		if (!this.state.visible) {
			this._dialogClasses.push(this.styles.buttonDialogHide);
		}
	}

	render() {
		this.buildStyles();

		return (
			<div
				className={this.classes.join(" ")}
				disabled={this.props.disabled}
				>

				<Button
					style={this.inlineStyle}
					color={this.props.color}
					backgroundColor={this.props.backgroundColor}
					disabled={this.props.disabled}
					iconName={this.props.iconName}
					onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nilEvent}
					size={this.props.size}
					visible={this.props.visible}
					/>
				<div
					onClick={this.handleDialogClick}
					className={this._dialogClasses.join(" ")}>
					{this.props.children}
				</div>
			</div>
		);
	}
}
