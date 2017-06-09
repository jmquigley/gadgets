'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Icon} from '../icon';
import {baseClasses, BaseProps, getDefaultBaseProps} from '../shared';

const styles = require('./styles.css');

export interface ButtonProps extends BaseProps {
	iconName?: string;      // font awesome string
}

export function getDefaultButtonProps(): ButtonProps {
	return cloneDeep(Object.assign(getDefaultBaseProps(), {
		iconName: 'bomb'
	}));
}

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
 * - `classes: string[]` - an array of strings that represent custom CSS class
 * names that will be applied to the component.
 * - `disabled: boolean` - if true then then the control is disabled.  Defaults
 * to false.
 * - iconName: string` - the name of the font awesome icon used with this button
 * - `noripple: boolean` - turns off the ripple effect for a button.  On by
 * default.
 * - `style: object` - an object of key value/pairs that represent CSS style
 * settings
 * - `visible: boolean` - turns the display of this control on or off.  If true,
 * then the component can be seen.  The default is true.
 *
 */
export class Button extends React.Component<ButtonProps, undefined> {

    public static defaultProps: ButtonProps = getDefaultButtonProps();

	private _classes: string = '';

    constructor(props: ButtonProps) {
		super(props);
	}

	componentWillMount() {
		let l: string[] = baseClasses(this.props);

		l.push('ui-button');

		if (!this.props.noripple && !this.props.disabled) {
			l.push('ripple');
		}

		this._classes = l.join(' ');
	}

	private handleClick = (e: any) => {
		if (!this.props.disabled && this.props.visible && this.props.onClick != null) {
			this.props.onClick();
		}
		(e as Event).stopPropagation();
	}

	render() {
		return (
			<div
				className={`${this._classes} ${styles.button}`}
				onClick={this.handleClick}
				disabled={this.props.disabled}>
				<Icon iconName={this.props.iconName} className={styles.icon}/>
			</div>
		);
	}
}
