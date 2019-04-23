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

import autobind from "autobind-decorator";
import * as React from "react";
import {ClassNames} from "util.classnames";
import {nilEvent} from "util.toolbox";
import {
	Button,
	ButtonProps,
	ButtonState,
	getDefaultButtonProps,
	getDefaultButtonState
} from "../button";
import {
	BaseComponent,
	baseZIndex,
	Direction,
	fontStyle,
	Location,
	Sizing,
	Wrapper
} from "../shared";
import styled, {css} from "../shared/themed-components";
import {tooltip} from "../tooltip";
import {Triangle} from "../triangle";

export interface ButtonDialogProps extends ButtonProps {
	dialogClasses?: string[];
	notriangle?: boolean;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	triangleClasses?: string[];
}

export function getDefaultButtonDialogProps(): ButtonDialogProps {
	return {
		...getDefaultButtonProps(),
		dialogClasses: [],
		location: Location.bottom,
		notriangle: false,
		obj: "ButtonDialog",
		onClick: nilEvent,
		style: {
			backgroundColor: "inherit",
			color: "inherit"
		},
		triangleClasses: []
	};
}

export interface ButtonDialogState extends ButtonState {
	dialogStyles: ClassNames;
	triangleStyles: ClassNames;
	visible: boolean;
}

export function getDefaultButtonDialogState(): ButtonDialogState {
	return {
		...getDefaultButtonState("ui-button-dialog"),
		dialogStyles: new ClassNames("ui-dialog-popup"),
		triangleStyles: new ClassNames("ui-dialog-triangle"),
		visible: false
	};
}

const ButtonDialogContent: any = styled.div`
	background-color: ${(props: ButtonDialogProps) =>
		props.theme.backgroundColor};
	border: solid 1px ${(props: ButtonDialogProps) => props.theme.borderColor};
	color: ${(props: ButtonDialogProps) => props.theme.color};
	display: ${(props: ButtonDialogProps) =>
		props.visible ? "block" : "none"};
	min-width: 100px;
	min-height: 100%;
	z-index: calc(${baseZIndex} + 1);

	${(props: ButtonDialogProps) => props.sizing && fontStyle[props.sizing]}
`;

const ButtonDialogPopup: any = styled.div`
	display: ${(props: ButtonDialogProps) =>
		props.visible ? "block" : "none"};
	position: absolute;
	z-index: ${baseZIndex};

	${(props: ButtonDialogProps) =>
		props.location === Location.top ? DialogTop : DialogBottom}
`;

const ButtonDialogView: any = styled.div`
	box-sizing: border-box;
	display: flex;
	height: inherit;
	position: relative;
	width: inherit;
`;

const DialogBottom: any = css`
	left: 0;
	top: 108%;
`;

const DialogTop: any = css`
	bottom: 108%;
	right: 0;
`;

const StyledTriangle: any = styled(Triangle)`
	display: ${(props: ButtonDialogProps) =>
		props.visible ? "block" : "none"};

	${(props: ButtonDialogProps) =>
		props.location === Location.top ? TriangleTop : TriangleBottom}
`;

const TriangleBottom: any = css`
	position: absolute;
	top: -13px;
	left: 2%;
	z-index: calc(${baseZIndex} + 2);
`;

const TriangleTop: any = css`
	position: absolute;
	bottom: -13px;
	right: 2%;
	z-index: calc(${baseZIndex} + 2);
`;

export class ButtonDialog extends BaseComponent<
	ButtonDialogProps,
	ButtonDialogState
> {
	public static readonly defaultProps: ButtonDialogProps = getDefaultButtonDialogProps();
	public state: ButtonDialogState = getDefaultButtonDialogState();

	constructor(props: ButtonDialogProps) {
		super(props, ButtonDialog.defaultProps.style);
	}

	@autobind
	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (!this.props.disabled) {
			this.setState(
				{
					visible: !this.state.visible
				},
				() => {
					this.props.onClick(e);
				}
			);
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
		if (e.key === "Escape") {
			this.setState({
				visible: false
			});
		}
	}

	public componentDidMount() {
		document.addEventListener("keydown", this.handleKeyDown);
		window.addEventListener("click", this.handleDialogClick);
	}

	public componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyDown);
		window.removeEventListener("click", this.handleDialogClick);
	}

	public static getDerivedStateFromProps(
		props: ButtonDialogProps,
		state: ButtonDialogState
	) {
		const newState: ButtonDialogState = {...state};

		if (props.dialogClasses.length > 0) {
			newState.dialogStyles.add([...props.dialogClasses.slice()]);
		}

		if (props.triangleClasses.length > 0) {
			newState.triangleStyles.add([...props.triangleClasses.slice()]);
		}

		return super.getDerivedStateFromProps(props, newState);
	}

	public render() {
		let triangle = null;
		if (!this.props.notriangle) {
			const triangleStyles = {};

			if (this.state.style["color"] !== "inherit") {
				triangleStyles["stroke"] = this.state.style["color"];
			} else {
				triangleStyles["stroke"] = this.theme.borderColor;
			}

			if (this.state.style["backgroundColor"] !== "inherit") {
				triangleStyles["fill"] = this.state.style["backgroundColor"];
			} else {
				triangleStyles["fill"] = this.theme.backgroundColor;
			}

			triangle = (
				<StyledTriangle
					className={this.state.triangleStyles.classnames}
					direction={
						this.props.location === Location.top
							? Direction.down
							: Direction.up
					}
					location={this.props.location}
					nobase
					sizing={Sizing.normal}
					style={triangleStyles}
					visible={this.state.visible}
				/>
			);
		}

		return (
			<Wrapper {...this.props}>
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

export default ButtonDialog;
