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
 * - `iconSize: number` - Allows one to change the size of the icon within the button.
 * the sizes are: IconSize.small, IconSize.medium, IconSize.large, IconSize.xlarge
 *
 * @module Button
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Icon, IconSize} from '../icon';
import {BaseComponent, BaseProps, getDefaultBaseProps} from '../shared';

const styles = require('./styles.css');

export interface ButtonProps extends BaseProps {
	iconName?: string;      // font awesome string
	iconSize?: IconSize;
}

export function getDefaultButtonProps(): ButtonProps {
	return cloneDeep(Object.assign(getDefaultBaseProps(), {
		iconName: 'bomb',
		iconSize: IconSize.normal
	}));
}

export class Button extends BaseComponent<ButtonProps, undefined> {

    public static defaultProps: ButtonProps = getDefaultButtonProps();

    constructor(props: ButtonProps) {
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
		this._classes += ` ${styles.button}`;

		if (!this.props.noripple && !this.props.disabled) {
			this._classes += " ripple";
		}
	}

	render() {
		this.buildStyles();

		return (
			<div
				className={this._classes}
				style={{...this._style}}
				disabled={this.props.disabled}
				onClick={this.handleClick}>
				<Icon
					className={styles.icon}
					iconName={this.props.iconName}
					size={this.props.iconSize}
				/>
			</div>
		);
	}
}
