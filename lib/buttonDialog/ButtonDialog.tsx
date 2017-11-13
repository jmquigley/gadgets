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
import {ClassNames} from 'util.classnames';
import {nilEvent} from 'util.toolbox';
import {Button, ButtonProps, getDefaultButtonProps} from '../button';
import {
	BaseComponent,
	baseZIndex,
	Direction,
	fontStyle,
	getTheme,
	Location,
	Sizing
} from '../shared';
import {tooltip} from '../shared/helpers';
import styled, {css, ThemeProvider, withProps} from '../shared/themed-components';
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
			style: {
				backgroundColor: 'inherit',
				color: 'inherit'
			},
			triangleClasses: []
		})
	);
}

export interface ButtonDialogState {
	visible: boolean;
}

export const ButtonDialogContent: any = withProps<ButtonDialogProps, HTMLDivElement>(styled.div)`
	display: ${props => props.visible ? 'block' : 'none'};
	min-width: 100px;
	min-height: 100%;
	z-index: calc(${baseZIndex} + 1);

	${props => props.sizing && fontStyle[props.sizing]}
`;

export const ButtonDialogPopup: any = withProps<ButtonDialogProps, HTMLDivElement>(styled.div)`
	display: ${props => props.visible ? 'block' : 'none'};
	position: absolute;
	z-index: ${baseZIndex};

	${props => props.location === Location.top ? DialogTop : DialogBottom}
`;

export const ButtonDialogView: any = withProps<ButtonDialogProps, HTMLDivElement>(styled.div)`
	box-sizing: border-box;
	display: flex;
	height: inherit;
	position: relative;
	width: inherit;
`;

export const DialogBottom: any = css`
	left: 0;
	top: 108%;
`;

export const DialogTop: any = css`
	bottom: 108%;
	right: 0;
`;

export const StyledTriangle: any = withProps<ButtonDialogProps, HTMLElement>(styled(Triangle))`
	display: ${props => props.visible ? 'block' : 'none'};

	${props => props.location === Location.top ? TriangleTop : TriangleBottom}
`;

export const TriangleBottom: any = css`
	position: absolute;
	top: -13px;
	left: 2%;
	z-index: calc(${baseZIndex} + 2);
`;

export const TriangleTop: any = css`
	position: absolute;
	bottom: -13px;
	right: 2%;
	z-index: calc(${baseZIndex} + 2);
`;

export class ButtonDialog extends BaseComponent<ButtonDialogProps, ButtonDialogState> {

	public static readonly defaultProps: ButtonDialogProps = getDefaultButtonDialogProps();

	private _dialogStyles: ClassNames = new ClassNames();
	private _triangleStyles: ClassNames = new ClassNames();

	constructor(props: ButtonDialogProps) {
		super(props, {}, ButtonDialog.defaultProps.style);

		this._dialogStyles.add([
			'ui-dialog-popup',
			...props.dialogClasses.slice()
		]);

		this._classes.add(['ui-button-dialog']);

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

		this.componentWillUpdate(this.props, this.state);
	}

	private handleClick() {
		if (!this.props.disabled) {
			this.setState({
				visible: !this.state.visible
			}, () => {
				this.props.onClick();
			});
		}
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
		window.addEventListener('click', this.handleDialogClick);
	}

	public componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
		window.removeEventListener('click', this.handleDialogClick);
	}

	public render() {
		const ils = this.inlineStyles;

		if (ils['color'] !== 'inherit') {
			this.inlineStyles = {stroke: ils['color']};
		} else {
			this.inlineStyles = {stroke: 'black'};
		}

		if (ils['backgroundColor'] !== 'inherit') {
			this.inlineStyles = {fill: ils['backgroundColor']};
		} else {
			this.inlineStyles = {fill: 'white'};
		}

		return (
			<ThemeProvider theme={getTheme()}>
				<ButtonDialogView
					className={this.classes}
					id={this.id}
				>
					<Button
						disabled={this.props.disabled}
						iconName={this.props.iconName}
						onClick={this.handleClick}
						sizing={this.props.sizing}
						style={this.inlineStyles}
						visible={this.props.visible}
					/>
					<ButtonDialogPopup
						className={this._dialogStyles.classnames}
						location={this.props.location}
						onClick={this.handleDialogClick}
						visible={this.state.visible}
					>
						<ButtonDialogContent
							sizing={this.props.sizing}
							visible={this.state.visible}
						>
							{this.props.children}
						</ButtonDialogContent>
						{this.props.notriangle ?
						null
						:
						<StyledTriangle
							className={this._triangleStyles.classnames}
							direction={(this.props.location === Location.top) ? Direction.down : Direction.up}
							location={this.props.location}
							nobase
							sizing={Sizing.normal}
							style={{
								fill: ils['fill'],
								stroke: ils['stroke']
							}}
							visible={this.state.visible}
						/>
						}
					</ButtonDialogPopup>
					{tooltip(this.id, this.props)}
				</ButtonDialogView>
			</ThemeProvider>
		);
	}
}
