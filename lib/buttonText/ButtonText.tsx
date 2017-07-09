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
 * - `noicon: boolean` - Turns off the icon and only shows the text in the center
 * of the button.
 * - `sizing: Sizing (normal)` - The size of this control set by the Sizing class
 * - `text: string` - The text string used by the button
 *
 * @module ButtonText
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {Icon, IconProps, getDefaultIconProps} from '../icon';
import {BaseComponent, Sizing} from '../shared';

export interface ButtonTextProps extends IconProps {
	justify?: number;
	noicon?: boolean;
	onClick?: any;
	text?: string;
}

export function getDefaultButtonTextProps(): ButtonTextProps {
	return cloneDeep(Object.assign(
		getDefaultIconProps(), {
			justify: ButtonText.RIGHT,
			noicon: false,
			onClick: nilEvent,
			sizing: Sizing.normal,
			text: ''
		}));
}

export interface ButtonTextState {}

export class ButtonText extends BaseComponent<ButtonTextProps, ButtonTextState> {

    public static defaultProps: ButtonTextProps = getDefaultButtonTextProps();

	public static LEFT: number = 0;
	public static RIGHT: number = 1;
	public static CENTER: number = 2;

    constructor(props: ButtonTextProps) {
		super(props, require('./styles.css'));

		this.handleClick = this.handleClick.bind(this);
		this.shouldComponentUpdate(props);
	}

	buildContent(justifyStyle: string) {
		return(
			<div
				className={
					this.styles.content + " " +
						   this.styling.fontStyle + " " +
						   justifyStyle
				}>
				{this.props.text}
			</div>
		);
	}

	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (!this.props.disabled && this.props.visible && this.props.onClick != null) {
			this.props.onClick();
		}
		e.stopPropagation();
	}


	shouldComponentUpdate(nextProps: ButtonTextProps): boolean {
		super.resetStyles(nextProps);

		if (nextProps.color !== 'inherit') {
			this.inlineStyle["color"] = nextProps.color;
		}

		if (nextProps.backgroundColor !== 'inherit') {
			this.inlineStyle["backgroundColor"] = nextProps.backgroundColor;
		}

		if (nextProps.borderColor !== 'inherit') {
			this.inlineStyle["borderColor"] = nextProps.borderColor;
		}

		this.classes.push('ui-button-text');
		this.classes.push(this.styles.buttonText);

		if (!nextProps.noripple && !nextProps.disabled) {
			this.classes.push('ripple');
		}

		super.buildStyles(nextProps);
		return true;
	}

	render() {
		let leftButton = null;
		let rightButton = null;

		if (this.props.justify === ButtonText.CENTER || this.props.noicon) {
			leftButton = this.buildContent(this.styles.center);
		} else if (this.props.justify === ButtonText.LEFT) {
			leftButton = this.buildContent(this.styles.left);
		} else {
			rightButton = this.buildContent(this.styles.right);
		}

		let icon = null;

		if (!this.props.noicon && this.props.justify != ButtonText.CENTER) {
			icon = (
				<Icon
					className={this.styles.icon}
					iconName={this.props.iconName}
					sizing={this.props.sizing}
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
