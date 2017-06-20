/**
 * A typical button control widget that uses an icon and text.  The
 * text for the button is given as a property.  It can be left or
 * right justified using the justify property.
 *
 * #### Examples:
 *
 * ```javascript
 * import {ButtonText} from 'gadgets';
 * <ButtonText
 *   text="some text"
 *   iconName="cab"
 *   justify={ButtonText.LEFT}
 *   onClick={someFunction}
 *   />
 * ```
 *
 * #### Events
 * - `onClick()` - This callback is invoked when the control is clicked by the user
 *
 * #### Style
 * - `ui-button` - A top level style placed on the control that constructs the
 * button.
 * - `ui-buttontext` - A top level style used to differentiate this from generic
 * buttons.
 *
 * #### Properties
 * - `iconName: string` - The name of the font awesome icon used with this button
 * - `justify: number` - Determines if the button will be on the left or the right.
 * Two constants are available: ButtonText.LEFT & ButtonText.RIGHT.  It uses right
 * by default.
 * - `noicon: boolean` - Turns off the icon and only shows the text in the center of the button.
 * - `text: string` - The text string used by the button
 *
 * @module ButtonText
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Icon, IconProps, getDefaultIconProps} from '../icon';
import {BaseComponent} from '../shared';

export interface ButtonTextProps extends IconProps {
	justify?: number;
	noicon?: boolean;
	text?: string;
}

export function getDefaultButtonTextProps(): ButtonTextProps {
	return cloneDeep(Object.assign(
		getDefaultIconProps(), {
			justify: ButtonText.RIGHT,
			noicon: false,
			text: ''
		}));
}

export class ButtonText extends BaseComponent<ButtonTextProps, undefined> {

    public static defaultProps: ButtonTextProps = getDefaultButtonTextProps();

	public static LEFT: number = 0;
	public static RIGHT: number = 1;
	public static CENTER: number = 2;

    constructor(props: ButtonTextProps) {
		super(props, require("./styles.css"));

		this.handleClick = this.handleClick.bind(this);
	}

	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (!this.props.disabled && this.props.visible && this.props.onClick != null) {
			this.props.onClick();
		}
		e.stopPropagation();
	}

	protected buildStyles() {
		if (this.props.color !== "inherit") {
			this.inlineStyle["color"] = this.props.color;
		}

		if (this.props.backgroundColor !== "inherit") {
			this.inlineStyle["backgroundColor"] = this.props.backgroundColor;
		}

		if (this.props.borderColor !== "inherit") {
			this.inlineStyle["borderColor"] = this.props.borderColor;
		}

		super.buildStyles(this.props);

		this.classes.push("ui-button");
		this.classes.push("ui-buttontext");
		this.classes.push(this.styles.buttonText);

		if (!this.props.noripple && !this.props.disabled) {
			this.classes.push("ripple");
		}
	}

	render() {
		this.buildStyles();

		let content = (justifyStyle: string) => (
			<div
				className={
					this.styles.content + " " +
					this.sizeStyle + " " +
					this.boxSizeStyle + " " +
					justifyStyle
				}>
				{this.props.text}
			</div>
		);

		let leftButton = null;
		let rightButton = null;

		if (this.props.justify === ButtonText.CENTER || this.props.noicon) {
			leftButton = content(this.styles.center);
		} else if (this.props.justify === ButtonText.LEFT) {
			leftButton = content(this.styles.left);
		} else {
			rightButton = content(this.styles.right);
		}

		let icon = null;

		if (!this.props.noicon && this.props.justify != ButtonText.CENTER) {
			icon = (
				<Icon
					className={this.styles.icon}
					iconName={this.props.iconName}
					size={this.props.size}
					/>
			);
		}

		return (
			<div
				className={this.classes.join(" ")}
				style={this.inlineStyle}
				disabled={this.props.disabled}
				onClick={this.handleClick}>
				{leftButton}
				{icon}
				{rightButton}
			</div>
		);
	}
}
