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
 * - `ui-buttontext` - A top level style used to differentiate this from generic
 * buttons.
 *
 * #### Properties
 * - `iconName: {string} ('bomb')` - The name of the font awesome icon used with this
 * button
 * - `justify: {Justify} (Justify.right)` - Determines if the button will be on the
 * left, center, right.
 * - `noicon: {boolean} (false)` - Turns off the icon and only shows the text in the
 * center of the button.
 * - `sizing: {Sizing} (Sizing.normal)` - The size of this control set by the Sizing
 * class
 * - `text: {string} ('')` - The text string used by the button
 *
 * @module ButtonText
 */

// const debug = require("debug")("gadgets.ButtonText");

import autobind from "autobind-decorator";
import * as React from "react";
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
import styled from "../shared/themed-components";

export interface ButtonTextProps extends IconProps {
	justify?: Justify;
	noicon?: boolean;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	text?: string;
}

export function getDefaultButtonTextProps(): ButtonTextProps {
	return {
		...getDefaultIconProps(),
		justify: Justify.right,
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

const ButtonTextView: any = styled.div`
	${BaseButtonView}

	&:not(.nohover):hover {
		background-color: ${(props: ButtonTextProps) => props.theme.hoverColor}
			${(props) => props.style.backgroundColor && "!important"};
	}

	${(props: ButtonTextProps) => disabled(props)}
	${(props: ButtonTextProps) => hidden(props)}
`;

export class ButtonText extends BaseComponent<
	ButtonTextProps,
	ButtonTextState
> {
	public static readonly defaultProps: ButtonTextProps = getDefaultButtonTextProps();
	public state: ButtonTextState = getDefaultButtonTextState();

	constructor(props: ButtonTextProps) {
		super(props, "ui-button-text", ButtonText.defaultProps.style);
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
				<Icon
					iconName={this.props.iconName}
					sizing={this.props.sizing}
				/>
			);
		}

		return (
			<Wrapper {...this.props}>
				<ButtonTextView
					disabled={this.props.disabled}
					className={this.className}
					hidden={this.props.hidden}
					style={this.state.style}
					onClick={this.handleClick}
					ripple={this.props.ripple}
				>
					{leftButton}
					{icon}
					{rightButton}
				</ButtonTextView>
			</Wrapper>
		);
	}
}

export default ButtonText;
