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
 * - `location: Location (Location.bottom)` - Determines if the popup will be shown
 * above or below the button.  Only uses `Location.top` or `Location.bottom`.
 * - `notriangle: boolean (false)` - If true this will suppress the triangle pointer
 * within the dialog popup.  The default is to show it.
 * - `triangleClasses: string[] ([])` - An array of CSS class strings that will be
 * applied to the dialog box triangle.
 *
 * @module ButtonDialog
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {Button, ButtonProps, getDefaultButtonProps} from '../button';
import {BaseComponent, Direction, Location, Sizing} from '../shared';
import {Triangle} from '../triangle';

export interface ButtonDialogProps extends ButtonProps {
	dialogClasses?: string[];
	notriangle?: boolean;
	onClick?: any;
	triangleClasses? : string[];
}

export function getDefaultButtonDialogProps(): ButtonDialogProps {
	return cloneDeep(Object.assign(
		getDefaultButtonProps(), {
			dialogClasses: [],
			location: Location.bottom,
			notriangle: false,
			onClick: nilEvent,
			triangleClasses: []
		}));
}

export interface ButtonDialogState {
	visible: boolean;
}

export class ButtonDialog extends BaseComponent<ButtonDialogProps, ButtonDialogState> {

    public static defaultProps: ButtonDialogProps = getDefaultButtonDialogProps();

	private _dialogClasses: string[] = [];
	private _triangleClasses: string[] = [];

	constructor(props: ButtonDialogProps) {
		super(props, require('./styles.css'));
		this.state = {
			visible: false
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleDialogClick = this.handleDialogClick.bind(this);

		this.shouldComponentUpdate(props, this.state);
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

	shouldComponentUpdate(nextProps: ButtonDialogProps, nextState: ButtonDialogState): boolean {
		this.resetStyles(nextProps);

		this.classes.push('ui-button-dialog');
		this.classes.push(this.styles.buttonDialog);

		this._dialogClasses = nextProps.dialogClasses.slice();
		this._dialogClasses.push(this.styles.buttonDialogPopup);
		this._dialogClasses.push('ui-dialog-popup');

		this._triangleClasses = nextProps.triangleClasses.slice();

		if (nextProps.location === Location.top) {
			this._dialogClasses.push(this.styles.dialogTop);
			this._triangleClasses.push(this.styles.dialogTriangleTop);
		} else {
			this._dialogClasses.push(this.styles.dialogBottom);
			this._triangleClasses.push(this.styles.dialogTriangleBottom);
		}

		if (nextState.visible) {
			this._dialogClasses.push(this.styles.buttonDialogShow);
			this._triangleClasses.push(this.styles.buttonDialogShow);
		}
		else {
			this._dialogClasses.push(this.styles.buttonDialogHide);
			this._triangleClasses.push(this.styles.buttonDialogHide);
		}

		this._dialogClasses.push(this.styling.fontStyle);

		super.buildStyles(nextProps);
		return true;
	}

	render() {
		return (
			<div
				className={this.classes.join(' ')}
				disabled={this.props.disabled}
				>
				<Button
					backgroundColor={this.props.backgroundColor}
					color={this.props.color}
					disabled={this.props.disabled}
					iconName={this.props.iconName}
					onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nilEvent}
					sizing={this.props.sizing}
					style={this.inlineStyle}
					visible={this.props.visible}
					/>
				<div
					className={this._dialogClasses.join(' ')}
					onClick={this.handleDialogClick}
					>
					<div className={this.styles.buttonDialogContent}>
						{this.props.children}
					</div>
					{this.props.notriangle ?
					 null
					 :
					 <Triangle
						 className={this._triangleClasses.join(' ')}
						 direction={(this.props.location === Location.top) ? Direction.down : Direction.up}
						 nobase
						 sizing={Sizing.normal}
					 />
					}
				</div>
			</div>
		);
	}
}
