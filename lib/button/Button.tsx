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

export interface ButtonState {}

export class Button extends BaseComponent<ButtonProps, ButtonState> {

    public static defaultProps: ButtonProps = getDefaultButtonProps();

	private _iconClasses: string[] = [];

    constructor(props: ButtonProps) {
		super(props, require('./styles.css'));
		this.handleClick = this.handleClick.bind(this);
		this.shouldComponentUpdate(props);
	}

	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (!this.props.disabled && this.props.visible && this.props.onClick != null) {
			this.props.onClick();
		}
		e.stopPropagation();
	}

	shouldComponentUpdate(nextProps: ButtonProps): boolean {
		super.resetStyles(nextProps);

		if (nextProps.color !== 'inherit') {
			this.inlineStyle['color'] = nextProps.color;
		}

		if (nextProps.backgroundColor !== 'inherit') {
			this.inlineStyle['backgroundColor'] = nextProps.backgroundColor;
		}

		if (nextProps.borderColor !== 'inherit') {
			this.inlineStyle['borderColor'] = nextProps.borderColor;
		}

		if (nextProps.borderWidth != 'none') {
			this.inlineStyle['borderWidth'] = nextProps.borderWidth;
		}

		this.classes.push('ui-button');
		this.classes.push(this.styles.button);

		if (!nextProps.noripple && !nextProps.disabled) {
			this.classes.push('ripple');
		}

		this._iconClasses = [];
		this._iconClasses.push(this.props.iconStyle);
		this._iconClasses.push(this.styles.icon);

		super.buildStyles(nextProps);
		return true;
	}

	render() {
		return (
			<div
				className={this.classes.join(' ')}
				disabled={this.props.disabled}
				onClick={this.handleClick}
				style={{...this.inlineStyle}}
				>
				<Icon
					className={this._iconClasses.join(' ')}
					iconName={this.props.iconName}
					sizing={this.props.sizing}
				/>
			</div>
		);
	}
}
