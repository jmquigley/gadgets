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

import * as $ from 'jquery';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {ClassNames} from 'util.classnames';
import {nilEvent} from 'util.toolbox';
import {Button, ButtonProps, getDefaultButtonProps} from '../button';
import {BaseComponent, Direction, Location, Sizing} from '../shared';
import {Triangle} from '../triangle';

export interface ButtonDialogProps extends ButtonProps {
	dialogClasses?: string[];
	notriangle?: boolean;
	onClick?: any;
	triangleClasses?: string[];
}

export function getDefaultButtonDialogProps(): ButtonDialogProps {
	return cloneDeep(Object.assign({},
		getDefaultButtonProps(), {
			dialogClasses: [],
			location: Location.bottom,
			notriangle: false,
			onClick: nilEvent,
			triangleClasses: []
		})
	);
}

export interface ButtonDialogState {
	visible: boolean;
}

export class ButtonDialog extends BaseComponent<ButtonDialogProps, ButtonDialogState> {

	public static defaultProps: ButtonDialogProps = getDefaultButtonDialogProps();

	private _dialogStyles: ClassNames = new ClassNames();
	private _triangleStyles: ClassNames = new ClassNames();

	constructor(props: ButtonDialogProps) {
		super(props, require('./styles.css'));

		this._dialogStyles.add([
			'ui-dialog-popup',
			...props.dialogClasses.slice(),
			this.styles.buttonDialogPopup
		]);

		this._rootStyles.add([
			'ui-button-dialog',
			this.styles.buttonDialog
		]);

		this._triangleStyles.add([
			...props.triangleClasses.slice()
		]);

		this.state = {
			visible: false
		};

		this.bindCallbacks(
			'handleClick',
			'handleDialogClick',
			'handleKeyDown'
		);

		this.componentWillUpdate(props, this.state);
	}

	private handleClick() {
		this.setState({
			visible: !this.state.visible
		});

		this.props.onClick();
	}

	private handleDialogClick() {
		this.setState({
			visible: false
		});
	}

	private handleKeyDown(e: any) {
		if (e.key === 'Escape') {
			this.setState({
				visible: false
			});
		}
	}

	public componentWillMount() {
		$(document).on('keydown', this.handleKeyDown);
		$(window).on('click', this.handleDialogClick);
	}

	public componentWillUnmount() {
		$(document).off('keydown', this.handleKeyDown);
		$(window).off('click', this.handleDialogClick);
	}

	public componentWillUpdate(nextProps: ButtonDialogProps, nextState: ButtonDialogState) {

		this._dialogStyles.onIfElse(nextProps.location === Location.top)(
			this.styles.dialogTop
		)(
			this.styles.dialogBottom
		);

		this._triangleStyles.onIfElse(nextProps.location === Location.top)(
			this.styles.dialogTriangleTop
		)(
			this.styles.dialogTriangleBottom
		);

		this._dialogStyles.onIfElse(nextState.visible)(
			this.styles.buttonDialogShow
		)(
			this.styles.buttonDialogHide
		);

		this._triangleStyles.onIfElse(nextState.visible)(
			this.styles.buttonDialogShow
		)(
			this.styles.buttonDialogHide
		);

		super.componentWillUpdate(nextProps);
	}

	public render() {
		return (
			<div
				className={this._rootStyles.classnames}
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
					className={this._dialogStyles.classnames}
					onClick={this.handleDialogClick}
				>
					<div className={this.styles.buttonDialogContent}>
						{this.props.children}
					</div>
					{this.props.notriangle ?
					null
					:
					<Triangle
						className={this._triangleStyles.classnames}
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
