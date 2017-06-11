/**
 * A typical button control widget.  This control only uses an icon and no text
 * to represent the button.  The icons are [Font Awesome](http://fontawesome.io/)
 * strings.  That library is built into this module, so any font available in
 * the current release of that library is available.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button} from 'gadgets';
 * <Button iconName="cab" onClick={someFunction} />
 * ```
 *
 * #### Events
 * - `onClick()` - when the button control is clicked by the user
 *
 * #### Styles
 * - `ui-button` - top level style placed on `<i>` control that constructs the
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
import {baseClasses, BaseProps, getDefaultBaseProps} from '../shared';

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

export class Button extends React.Component<ButtonProps, undefined> {

    public static defaultProps: ButtonProps = getDefaultButtonProps();

	private _classes: string = '';
	private _style: any = null;

    constructor(props: ButtonProps) {
		super(props);
	}

	private buildStyles = () => {
		this._style = Object.assign({
			color: (this.props.color || 'black'),
			backgroundColor: (this.props.backgroundColor || 'white')
		}, this.props.style);

		this._classes = baseClasses(this.props);
		this._classes += ' ui-button';
		this._classes += ` ${styles.button}`;

		if (!this.props.noripple && !this.props.disabled) {
			this._classes += " ripple";
		}
	}

	private handleClick = (e: any) => {
		if (!this.props.disabled && this.props.visible && this.props.onClick != null) {
			this.props.onClick();
		}
		(e as Event).stopPropagation();
	}

	render() {
		this.buildStyles();

		return (
			<div
				className={this._classes}
				disabled={this.props.disabled}
				onClick={this.handleClick}
				style={this._style}>
				<Icon
					className={styles.icon}
					iconName={this.props.iconName}
					size={this.props.iconSize}
				/>
			</div>
		);
	}
}
