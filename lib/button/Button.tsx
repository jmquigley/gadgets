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
 * - `onClick()` - This callback is invoked when the control is clicked by the user
 *
 * #### Styles
 * - `ui-button` - A top level style placed on `<i>` control that constructs the
 * button.
 *
 * #### Properties
 * - `iconName: string` - the name of the font awesome icon used with this button
 * - `sizing: Sizing` - Allows one to change the size of the icon within the button.
 * See the shared props object for the `Sizing` enumeration.
 *
 * @module Button
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Icon} from '../icon';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	Location,
	Sizing
} from '../shared';

export interface ButtonProps extends BaseProps {
	iconName?: string;      // font awesome string
	iconStyle?: string;
}

export function getDefaultButtonProps(): ButtonProps {
	return cloneDeep(Object.assign(getDefaultBaseProps(), {
		iconName: 'bomb',
		iconStyle: '',
		location: Location.middle,
		sizing: Sizing.normal
	}));
}

export class Button extends BaseComponent<ButtonProps, undefined> {

    public static defaultProps: ButtonProps = getDefaultButtonProps();

    constructor(props: ButtonProps) {
		super(props, require('./styles.css'));

		this.handleClick = this.handleClick.bind(this);
	}

	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (!this.props.disabled && this.props.visible && this.props.onClick != null) {
			this.props.onClick();
		}
		e.stopPropagation();
	}

	protected buildStyles() {

		if (this.props.color !== 'inherit') {
			this.inlineStyle['color'] = this.props.color;
		}

		if (this.props.backgroundColor !== 'inherit') {
			this.inlineStyle['backgroundColor'] = this.props.backgroundColor;
		}

		if (this.props.borderColor !== 'inherit') {
			this.inlineStyle['borderColor'] = this.props.borderColor;
		}

		if (this.props.borderWidth != 'none') {
			this.inlineStyle['borderWidth'] = this.props.borderWidth;
		}

		super.buildStyles(this.props);

		this.classes.push('ui-button');
		this.classes.push(this.styles.button);

		if (!this.props.noripple && !this.props.disabled) {
			this.classes.push('ripple');
		}
	}

	render() {
		this.buildStyles();

		return (
			<div
				className={this.classes.join(' ')}
				disabled={this.props.disabled}
				onClick={this.handleClick}
				style={{...this.inlineStyle}}
				>
				<Icon
					className={`${this.props.iconStyle} ${this.styles.icon}`}
					iconName={this.props.iconName}
					sizing={this.props.sizing}
				/>
			</div>
		);
	}
}
