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
import {toggleOnIfElse} from 'util.toggle';
import {join, nilEvent} from 'util.toolbox';
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

	private _dialogClasses: Set<string>;
	private _rootClasses: Set<string>;
	private _triangleClasses: Set<string>;

	constructor(props: ButtonDialogProps) {
		super(props, require('./styles.css'));

		this._dialogClasses = new Set<string>([
			'ui-dialog-popup',
			...props.dialogClasses.slice(),
			this.styles.buttonDialogPopup
		]);

		this._rootClasses = new Set<string>([
			'ui-button-dialog',
			this.styles.buttonDialog
		]);

		this._triangleClasses = new Set<string>([
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
		document.addEventListener('keydown', this.handleKeyDown);
	}

	public componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	public componentWillUpdate(nextProps: ButtonDialogProps, nextState: ButtonDialogState) {

		toggleOnIfElse(this._dialogClasses, nextProps.location === Location.top)(
			this.styles.dialogTop
		)(
			this.styles.dialogBottom
		);

		toggleOnIfElse(this._triangleClasses, nextProps.location === Location.top)(
			this.styles.dialogTriangleTop
		)(
			this.styles.dialogTriangleBottom
		);

		toggleOnIfElse(this._dialogClasses, nextState.visible)(
			this.styles.buttonDialogShow
		)(
			this.styles.buttonDialogHide
		);

		toggleOnIfElse(this._triangleClasses, nextState.visible)(
			this.styles.buttonDialogShow
		)(
			this.styles.buttonDialogHide
		);

		this.buildCommonStyles(this._rootClasses, nextProps);
	}

	public render() {
		return (
			<div
				className={join(this._rootClasses, ' ')}
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
					className={join(this._dialogClasses, ' ')}
					onClick={this.handleDialogClick}
				>
					<div className={this.styles.buttonDialogContent}>
						{this.props.children}
					</div>
					{this.props.notriangle ?
					null
					:
					<Triangle
						className={join(this._triangleClasses, ' ')}
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
