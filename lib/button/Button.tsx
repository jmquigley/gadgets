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
 * - `iconName="bomb" {string}` - the name of the font awesome icon used with
 * this button
 * - `iconStyle="" {string}` - a CSS style class name that will be added to the
 * icon within the button.
 * - `kbActivate="" {string}` - Invokes the keyboard handler for the button for the
 * given sequence.
 *
 * @module Button
 */

import autobind from "autobind-decorator";
import * as React from "react";
import {HotKeys} from "react-hotkeys";
import styled, {css} from "styled-components";
import {nilEvent} from "util.toolbox";
import {Icon} from "../icon/Icon";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	defaultBaseProps,
	disabled,
	hidden,
	Wrapper
} from "../shared";
import {tooltip} from "../tooltip/Tooltip";

export interface ButtonProps extends BaseProps {
	iconName?: string; // font awesome string
	iconStyle?: string;
	kbActivate?: string;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export type ButtonState = BaseState;

export const BaseButtonView: any = css`
	align-items: center;
	box-sizing: border-box;
	cursor: default;
	display: inline-flex;
	height: 100%;
	justify-content: center;
	line-height: inherit;
	outline: none;
	overflow: visible;
	position: relative;
	user-select: none;
	width: 100%;
`;

const ButtonView: any = styled(HotKeys)`
	${BaseButtonView}

	flex: 1;

	&:not(.nohover):hover {
		background-color: ${(props: ButtonProps) => props.theme.hoverColor}
			${(props) => props.style.backgroundColor && "!important"};
	}

	${(props: ButtonProps) => hidden(props)}
`;

const StyledIcon: any = styled(Icon)`
	${(props: ButtonProps) => disabled(props)}
`;

export class Button extends BaseComponent<ButtonProps, ButtonState> {
	public static readonly defaultProps: ButtonProps = {
		...defaultBaseProps,
		iconName: "bomb",
		iconStyle: "",
		kbActivate: "",
		nopropagation: true,
		onClick: nilEvent,
		ripple: true
	};

	constructor(props: ButtonProps) {
		super("ui-button", Button, props);

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
		super.render();

		return (
			<Wrapper {...this.props} name={this.name}>
				<ButtonView
					className={this.className}
					handlers={this.keyHandler}
					hidden={this.props.hidden}
					id={this.id}
					keyMap={this.keyMap}
					onClick={this.handleClick}
					sizing={this.props.sizing}
					style={this.state.style}
				>
					<StyledIcon
						disabled={this.props.disabled}
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
