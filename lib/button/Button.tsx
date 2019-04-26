/**
 * A typical button control widget.  This control only uses an icon and no text
 * to represent the button.  The icons are [Font Awesome](http://fontawesome.io/)
 * strings.  That library is built into this module, so any font available in
 * the current release of that library is available.  The buttons fill the size
 * of their parent container.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button} from 'gadgets';
 * <Button iconName="cab" onClick={someFunction} />
 * ```
 *
 * #### Events
 * - `onClick()` - This callback is invoked when the control is clicked by the
 * user
 *
 * #### Styles
 * - `ui-button` - A top level style placed on `<i>` control that constructs the
 * button.
 *
 * #### Properties
 * - `iconName: string ('bomb')` - the name of the font awesome icon used with
 * this button
 * - `iconStyle: string ('')` - a CSS style class name that will be added to the
 * icon within the button.
 * - `sizing: Sizing` - Allows one to change the size of the icon within the
 * button.
 * See the shared props object for the `Sizing` enumeration.
 *
 * @module Button
 */

// const debug = require('debug')('Button');

import autobind from "autobind-decorator";
import * as React from "react";
import {nilEvent} from "util.toolbox";
import {Icon} from "../icon";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	disabled,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Wrapper
} from "../shared";
import styled, {css} from "../shared/themed-components";
import {tooltip} from "../tooltip";

export interface ButtonProps extends BaseProps {
	iconName?: string; // font awesome string
	iconStyle?: string;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function getDefaultButtonProps(): ButtonProps {
	return {
		...getDefaultBaseProps(),
		iconName: "bomb",
		iconStyle: "",
		onClick: nilEvent,
		obj: "Button",
		ripple: true
	};
}

export type ButtonState = BaseState;

export function getDefaultButtonState(): ButtonState {
	return {...getDefaultBaseState()};
}

export const BaseButtonView: any = css`
	align-items: center;
	box-sizing: border-box;
	cursor: default;
	display: flex;
	height: 100%;
	justify-content: center;
	line-height: inherit;
	outline: none;
	overflow: visible;
	position: relative;
	user-select: none;
	width: 100%;
`;

const ButtonView: any = styled.div`
	${BaseButtonView}

	flex: 1;

	&:not(.nohover):hover {
		background-color: ${(props: ButtonProps) => props.theme.hoverColor}
			${(props) => props.style.backgroundColor && "!important"};
	}

	${(props: ButtonProps) => disabled(props)}
	${(props: ButtonProps) => invisible(props)}
`;

export class Button extends BaseComponent<ButtonProps, ButtonState> {
	public static readonly defaultProps: ButtonProps = getDefaultButtonProps();
	public state: ButtonState = getDefaultButtonState();

	constructor(props: ButtonProps) {
		super(props, "ui-button", Button.defaultProps.style);
	}

	@autobind
	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (
			!this.props.disabled &&
			this.props.visible &&
			this.props.onClick != null
		) {
			this.props.onClick(e);
		}
		e.stopPropagation();
	}

	public render() {
		this.updateClassName();

		return (
			<Wrapper {...this.props}>
				<ButtonView
					className={this.className}
					disabled={this.props.disabled}
					id={this.id}
					onClick={this.handleClick}
					ripple={this.props.ripple}
					sizing={this.props.sizing}
					style={this.state.style}
					visible={this.props.visible}
				>
					<Icon
						className={this.props.iconStyle}
						iconName={this.props.iconName}
						sizing={this.props.sizing}
					/>
					{tooltip(this.id, this.props)}
				</ButtonView>
			</Wrapper>
		);
	}
}

export default Button;
