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

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {ClassNames} from 'util.classnames';
import {nilEvent} from 'util.toolbox';
import {
	Button,
	ButtonProps,
	ButtonState,
	getDefaultButtonProps,
	getDefaultButtonState
} from '../button';
import {
	BaseComponent,
	baseZIndex,
	Direction,
	fontStyle,
	Location,
	Sizing,
	Wrapper
} from '../shared';
import {debug} from '../shared/helpers';
import styled, {css, withProps} from '../shared/themed-components';
import {tooltip} from '../tooltip';
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
			obj: 'ButtonDialog',
			onClick: nilEvent,
			style: {
				backgroundColor: 'inherit',
				color: 'inherit'
			},
			triangleClasses: []
		})
	);
}

export interface ButtonDialogState extends ButtonState {
	dialogStyles: ClassNames;
	triangleStyles: ClassNames;
	visible: boolean;
}

export function getDefaultButtonDialogState(): ButtonDialogState {
	return cloneDeep(Object.assign({},
		getDefaultButtonState(), {
			dialogStyles: new ClassNames(),
			triangleStyles: new ClassNames(),
			visible: false
		}));
}

export const ButtonDialogContent: any = withProps<ButtonDialogProps, HTMLDivElement>(styled.div)`
	background-color: ${props => props.theme.backgroundColor};
	border: solid 1px ${props => props.theme.borderColor};
	color: ${props => props.theme.color};
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

export const StyledTriangle: any = styled(Triangle)`
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
	public state: ButtonDialogState = getDefaultButtonDialogState();

	constructor(props: ButtonDialogProps) {
		super(props, ButtonDialog.defaultProps.style);
	}

	@autobind
	private handleClick() {
		if (!this.props.disabled) {
			this.setState({
				visible: !this.state.visible
			}, () => {
				this.props.onClick();
			});
		}
	}

	@autobind
	private handleDialogClick() {
		this.setState({
			visible: false
		});
	}

	@autobind
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

	public static getDerivedStateFromProps(props: ButtonDialogProps, state: ButtonDialogState) {
		state.classes.clear();
		state.dialogStyles.clear();
		state.triangleStyles.clear();

		state.classes.add('ui-button-dialog');

		state.dialogStyles.add([
			'ui-dialog-popup',
			...props.dialogClasses.slice()
		]);

		state.triangleStyles.add([
			'ui-dialog-triangle',
			...props.triangleClasses.slice()
		]);

		return super.getDerivedStateFromProps(props, state);
	}

	public render() {
		let triangle = null;
		if (!this.props.notriangle) {
			const triangleStyles = {};

			if (this.state.style['color'] !== 'inherit') {
				triangleStyles['stroke'] = this.state.style['color'];
			} else {
				triangleStyles['stroke'] = this.theme.borderColor;
			}

			if (this.state.style['backgroundColor'] !== 'inherit') {
				triangleStyles['fill'] = this.state.style['backgroundColor'];
			} else {
				triangleStyles['fill'] = this.theme.backgroundColor;
			}

			triangle = (
				<StyledTriangle
					className={this.state.triangleStyles.classnames}
					direction={(this.props.location === Location.top) ? Direction.down : Direction.up}
					location={this.props.location}
					nobase
					sizing={Sizing.normal}
					style={triangleStyles}
					visible={this.state.visible}
				/>
			);
		}

		debug('ButtonDialog', 'triangle: %O, props: %O, state: %O', triangle, this.props, this.state);

		return (
			<Wrapper {...this.props} >
				<ButtonDialogView
					className={this.state.classes.classnames}
					id={this.id}
				>
					<Button
						disabled={this.props.disabled}
						iconName={this.props.iconName}
						onClick={this.handleClick}
						sizing={this.props.sizing}
						style={this.state.style}
						visible={this.props.visible}
					/>
					<ButtonDialogPopup
						className={this.state.dialogStyles.classnames}
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
						{triangle}
					</ButtonDialogPopup>
					{tooltip(this.id, this.props)}
				</ButtonDialogView>
			</Wrapper>
		);
	}
}
