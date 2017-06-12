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
 * - `text: string` - The text string used by the button
 *
 * @module ButtonText
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Icon, IconProps, getDefaultIconProps} from '../icon';
import {BaseComponent} from '../shared';

const styles = require('./styles.css');

export interface ButtonTextProps extends IconProps {
	justify?: number;
	text?: string;
}

export function getDefaultButtonTextProps(): ButtonTextProps {
	return cloneDeep(Object.assign(
		getDefaultIconProps(), {
			justify: ButtonText.RIGHT,
			text: ''
		}));
}

export class ButtonText extends BaseComponent<ButtonTextProps, undefined> {

    public static defaultProps: ButtonTextProps = getDefaultButtonTextProps();

	public static LEFT: number = 0;
	public static RIGHT: number = 1;

    constructor(props: ButtonTextProps) {
		super(props);
	}

	private handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!this.props.disabled && this.props.visible && this.props.onClick != null) {
			this.props.onClick();
		}
		e.stopPropagation();
	}

	protected buildStyles() {
		if (this.props.color !== 'inherit') {
			this._style['color'] = this.props.color;
		}

		if (this.props.backgroundColor !== 'inherit') {
			this._style['backgroundColor'] = this.props.backgroundColor;
		}

		if (this.props.borderColor !== 'inherit') {
			this._style['borderColor'] = this.props.borderColor;
		}

		super.buildStyles(this.props);

		this._classes += ' ui-button';
		this._classes += ' ui-buttontext';
		this._classes += ` ${styles.buttonText}`;

		if (!this.props.noripple && !this.props.disabled) {
			this._classes += " ripple";
		}
	}

	render() {
		this.buildStyles();

		let content = (
			<div className={styles.content}>
			  <span>{this.props.text}</span>
			</div>
		);

		let leftButton = null;
		let rightButton = null;

		if (this.props.justify === ButtonText.LEFT) {
			leftButton = content;
		} else {
			rightButton = content;
		}

		return (
			<div
			  className={this._classes}
			  style={this._style}
			  disabled={this.props.disabled}
			  onClick={this.handleClick}>
			  {leftButton}
			  <Icon
				iconName={this.props.iconName}
				className={styles.icon}
				/>
			  {rightButton}
			</div>
		);
	}
}
