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
 *   text="some text"
 *   iconName="cab"
 *   justify={ButtonText.LEFT}
 *   onClick={someFunction}
 *   />
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
 * - `iconName: string` - The name of the font awesome icon used with this
 * button
 * - `justify: number` - Determines if the button will be on the left or the
 * right.
 * Two constants are available: ButtonText.LEFT & ButtonText.RIGHT.  It uses
 * right by default.
 * - `noicon: boolean` - Turns off the icon and only shows the text in the
 * center of the button.
 * - `sizing: Sizing (normal)` - The size of this control set by the Sizing
 * class
 * - `text: string` - The text string used by the button
 *
 * @module ButtonText
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {ClassNames} from 'util.classnames';
import {nilEvent} from 'util.toolbox';
import {getDefaultIconProps, Icon, IconProps} from '../icon';
import {BaseComponent, Justify, Sizing} from '../shared';

const styles = require('./styles.css');

export interface ButtonTextProps extends IconProps {
	justify?: Justify;
	noicon?: boolean;
	onClick?: any;
	text?: string;
}

export function getDefaultButtonTextProps(): ButtonTextProps {
	return cloneDeep(Object.assign({},
		getDefaultIconProps(), {
			justify: Justify.right,
			noicon: false,
			onClick: nilEvent,
			sizing: Sizing.normal,
			text: ''
		})
	);
}

export class ButtonText extends BaseComponent<ButtonTextProps, undefined> {

	public static readonly defaultProps: ButtonTextProps = getDefaultButtonTextProps();

	private static readonly _resetJustify = [
		styles.right,
		styles.center,
		styles.left
	];

	private _contentStyles: ClassNames = new ClassNames();

	constructor(props: ButtonTextProps) {
		super(props, styles, ButtonText.defaultProps.style);

		this._contentStyles.add([
			this.styles.content
		]);

		this._rootStyles.add([
			'ui-button-text',
			this.styles.buttonText
		]);

		this.bindCallbacks('handleClick');
		this.componentWillUpdate(props);
	}

	private buildContent() {
		return(
			<div className={this._contentStyles.classnames}>
				{this.props.text}
			</div>
		);
	}

	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (!this.props.disabled && this.props.visible && this.props.onClick != null) {
			this.props.onClick(this.props.text);
		}
		e.stopPropagation();
	}

	public componentWillUpdate(nextProps: ButtonTextProps) {

		if (nextProps.justify !== this.props.justify) {
			this._contentStyles.reset(ButtonText._resetJustify);
		}

		if (this.props.justify === Justify.center || this.props.noicon) {
			this._contentStyles.on(this.styles.center);
		} else if (this.props.justify === Justify.left) {
			this._contentStyles.on(this.styles.left);
		} else {
			this._contentStyles.on(this.styles.right);
		}

		this.updateFontStyle(this._contentStyles, nextProps, this.props);

		this._rootStyles.onIf(!nextProps.noripple && !nextProps.disabled)(
			'ripple'
		);

		super.componentWillUpdate(nextProps);
	}

	public render() {
		let leftButton = null;
		let rightButton = null;

		if (this.props.justify === Justify.right) {
			rightButton = this.buildContent();
		} else {
			leftButton = this.buildContent();
		}

		let icon = null;
		if (!this.props.noicon && this.props.justify !== Justify.center) {
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
				className={this._rootStyles.classnames}
				style={this.inlineStyles}
				onClick={this.handleClick}
			>
				{leftButton}
				{icon}
				{rightButton}
			</div>
		);
	}
}
