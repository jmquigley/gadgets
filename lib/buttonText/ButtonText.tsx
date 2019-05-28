/**
 * A typical button control widget that uses an icon and text.  The
 * text for the button is given as a property.  It can be left, right,
 * or center justified using the Justify enumeration.
 *
 * #### Examples:
 *
 * ```javascript
 * import {ButtonText} from 'gadgets';
 * <ButtonText
 *     text="some text"
 *     iconName="cab"
 *     justify={Justify.left}
 *     onClick={someFunction}
 * />
 * ```
 *
 * #### Events
 * - `onClick()` - This callback is invoked when the control is clicked by the
 * user
 *
 * #### Style
 * - `ui-button` - A top level style placed on the control that constructs the
 * button.
 * - `ui-buttontext` - A top level style used to differentiate this from
 * generic buttons.
 *
 * #### Properties
 * - `iconName="bomb" {string}` - The name of the font awesome icon used with
 * this button.
 * - `justify=Justify.right {Justify}` - Determines if the button will be on the
 * left, center, right.
 * - `kbActivate="" {string}` - Invokes the keyboard handler for the button for
 * the given sequence.
 * - `noicon=false {boolean}` - Turns off the icon and only shows the text in
 * the center of the button.
 * - `text="" {string}` - The text string used by the button
 *
 * @module ButtonText
 */

// const debug = require("debug")("gadgets.ButtonText");

import autobind from "autobind-decorator";
import * as React from "react";
import {HotKeys} from "react-hotkeys";
import styled from "styled-components";
import {nilEvent} from "util.toolbox";
import {BaseButtonView} from "../button";
import {getDefaultIconProps, Icon, IconProps} from "../icon";
import {
	BaseComponent,
	BaseState,
	disabled,
	fontStyle,
	getDefaultBaseState,
	hidden,
	Justify,
	Wrapper
} from "../shared";

export interface ButtonTextProps extends IconProps {
	justify?: Justify;
	kbActivate?: string;
	noicon?: boolean;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	text?: string;
}

export function getDefaultButtonTextProps(): ButtonTextProps {
	return {
		...getDefaultIconProps(),
		justify: Justify.right,
		kbActivate: "",
		noicon: false,
		obj: "ButtonText",
		onClick: nilEvent,
		ripple: true,
		text: ""
	};
}

export type ButtonTextState = BaseState;

export function getDefaultButtonTextState(): ButtonTextState {
	return {...getDefaultBaseState()};
}

const ButtonTextContent: any = styled.div`
	flex: 1;
	padding: 0 0.2em;
	text-align: ${(props: ButtonTextProps) => {
		if (props.justify === Justify.center || props.noicon) {
			return "center";
		} else if (props.justify === Justify.left) {
			return "right";
		} else {
			return "left";
		}
	}};

	${(props: ButtonTextProps) => props.sizing && fontStyle[props.sizing]};

	span {
		margin: 0 auto;
		user-select: none;
	}
`;

const StyledButtonText: any = styled(HotKeys)`
	${BaseButtonView}

	&:not(.nohover):hover {
		background-color: ${(props: ButtonTextProps) => props.theme.hoverColor}
			${(props) => props.style.backgroundColor && "!important"};
	}

	${(props: ButtonTextProps) => hidden(props)}
`;

const StyledIcon: any = styled(Icon)`
	${(props: ButtonTextProps) => disabled(props)}
`;

export class ButtonText extends BaseComponent<
	ButtonTextProps,
	ButtonTextState
> {
	public static readonly defaultProps: ButtonTextProps = getDefaultButtonTextProps();
	public state: ButtonTextState = getDefaultButtonTextState();

	constructor(props: ButtonTextProps) {
		super(props, "ui-button-text", ButtonText.defaultProps.style);

		this.buildKeyMap({
			kbActivate: this.handleClick
		});
	}

	@autobind
	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (this.props.nopropagation) {
			e.stopPropagation();
		}

		if (!this.props.disabled) {
			this.props.onClick(e);
		}
	}

	public render() {
		this.updateClassName();

		let leftButton = null;
		let rightButton = null;

		const content = (
			<ButtonTextContent
				justify={this.props.justify}
				sizing={this.props.sizing}
			>
				{this.props.text}
			</ButtonTextContent>
		);

		if (this.props.justify === Justify.right) {
			rightButton = content;
		} else {
			leftButton = content;
		}

		let icon = null;
		if (!this.props.noicon && this.props.justify !== Justify.center) {
			icon = (
				<StyledIcon
					disabled={this.props.disabled}
					iconName={this.props.iconName}
					sizing={this.props.sizing}
				/>
			);
		}

		return (
			<Wrapper {...this.props}>
				<StyledButtonText
					className={this.className}
					handlers={this.keyHandler}
					hidden={this.props.hidden}
					keyMap={this.keyMap}
					style={this.state.style}
					onClick={this.handleClick}
				>
					{leftButton}
					{icon}
					{rightButton}
				</StyledButtonText>
			</Wrapper>
		);
	}
}

export default ButtonText;
