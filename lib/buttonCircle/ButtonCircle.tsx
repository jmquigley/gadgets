/**
 * Works like a typical button control, but instead of a square button the
 * clickable surface is within a circle.  This type of button does NOT fill
 * the parent container.  Its size is determined by the sizing parameter.
 *
 * #### Examples:
 *
 * ```javascript
 * import {ButtonCircle} from 'gadgets';
 *
 * <ButtonCircle
 *     iconName="times"
 *     sizing={Sizing.small}
 *     onClick={someFunction}
 *     style={{
 *         color: "green",
 *         backgroundColor: "orange",
 *         borderColor: "green"
 *     }}
 * />
 * ```
 *
 * #### Events
 * - `onClick()` - This callback is invoked when the control is clicked by the
 * user
 *
 * #### Styles
 * - `ui-button-circle` - A top level style placed on the `<div>` container for
 * the control.
 *
 * #### Properties
 * - `iconName="bomb" {string}` - the name of the font awesome icon used with
 * this button
 * - `kbActivate="" {string}` - Invokes the keyboard handler for the button for the
 * given sequence.
 * - `sizing: Sizing (Sizing.normal)` - Allows one to change the size of the
 * icon within the button.  See the shared props object for the `Sizing`
 * enumeration.
 * - `style {any}` - custom styles applied to the icon image within the circle
 *   - `backgroundColor {string}` - The color of the background of the button
 *   - `borderColor="black" {string}` - The color of the border around the
 *   circle.
 *   - `color="black" {string}` - the color of the button icon
 *
 * @module ButtonCircle
 */

import * as React from "react";
import styled from "styled-components";
import {nilEvent} from "util.toolbox";
import {
	BaseButtonView,
	Button,
	ButtonProps,
	ButtonState,
	getDefaultButtonProps,
	getDefaultButtonState
} from "../button";
import {BaseComponent, borderStyle, Sizing, Wrapper} from "../shared";

export interface ButtonCircleProps extends ButtonProps {
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function getDefaultButtonCircleProps(): ButtonProps {
	return {
		...getDefaultButtonProps(),
		onClick: nilEvent,
		ripple: false
	};
}

export type ButtonCircleState = ButtonState;

export function getDefaultButtonCircleState(): ButtonCircleState {
	return {...getDefaultButtonState()};
}

const ButtonCircleContainerView: any = styled.div`
	${BaseButtonView}
	height: unset;
`;

const ButtonCircleInnerView: any = styled.div`
	border-radius: 4em;
	display: inline-block;
	height: ${(props: ButtonCircleProps) => props.height};
	width: ${(props: ButtonCircleProps) => props.width};
`;

const StyledButton: any = styled(Button)`
	border-radius: 4em;
	padding: ${(props: ButtonCircleProps) => {
		switch (props.sizing) {
			case Sizing.xxsmall:
				return "0.2em 0.2em";
			case Sizing.xsmall:
				return "0.08em 0.005em";
			case Sizing.small:
				return "0.1em 0.005em";
			case Sizing.large:
				return "0.175em 0";
			case Sizing.xlarge:
				return "0.25em 0";
			case Sizing.xxlarge:
				return "0.33em 0";

			case Sizing.normal:
			default:
				return "0.125em 0";
		}
	}};

	${(props: ButtonCircleProps) => props.sizing && borderStyle[props.sizing]}
`;

export class ButtonCircle extends BaseComponent<
	ButtonCircleProps,
	ButtonCircleState
> {
	public static readonly defaultProps: ButtonCircleProps = getDefaultButtonCircleProps();

	constructor(props: ButtonCircleProps) {
		super(
			"ui-button-circle",
			ButtonCircle,
			props,
			getDefaultButtonCircleState()
		);
	}

	public render() {
		super.render();

		const size: string = BaseComponent.fontSizePX(this.props.sizing, 1.5);

		return (
			<Wrapper {...this.props}>
				<ButtonCircleContainerView className={this.className}>
					<ButtonCircleInnerView height={size} width={size}>
						<StyledButton
							{...this.props}
							iconName={this.props.iconName}
							ripple
							style={this.state.style}
						/>
					</ButtonCircleInnerView>
				</ButtonCircleContainerView>
			</Wrapper>
		);
	}
}

export default ButtonCircle;
