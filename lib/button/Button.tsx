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
 * - `iconName: string ('bomb')` - the name of the font awesome icon used with this button
 * - `iconStyle: string ('')` - a CSS style class name that will be added to the
 * icon within the button.
 * - `sizing: Sizing` - Allows one to change the size of the icon within the button.
 * See the shared props object for the `Sizing` enumeration.
 *
 * @module Button
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {ClassNames} from 'util.classnames';
import {nilEvent} from 'util.toolbox';
import {Icon} from '../icon';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	Sizing
} from '../shared';

export interface ButtonProps extends BaseProps {
	iconName?: string;      // font awesome string
	iconStyle?: string;
	onClick?: any;
}

export function getDefaultButtonProps(): ButtonProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			iconName: 'bomb',
			iconStyle: '',
			onClick: nilEvent,
			sizing: Sizing.normal
		})
	);
}

export class Button extends BaseComponent<ButtonProps, undefined> {

	public static defaultProps: ButtonProps = getDefaultButtonProps();

	private _iconStyles: ClassNames = new ClassNames();

	constructor(props: ButtonProps) {
		super(props, require('./styles.css'));

		this._iconStyles.add([
			this.props.iconStyle,
			this.styles.icon
		]);

		this._rootStyles.add([
			'ui-button',
			this.styles.button
		]);

		this.bindCallbacks('handleClick');
		this.componentWillUpdate(props);
	}

	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		if (!this.props.disabled && this.props.visible && this.props.onClick != null) {
			this.props.onClick();
		}
		e.stopPropagation();
	}

	public componentWillUpdate(nextProps: ButtonProps) {
		const style = {};

		if (nextProps.color !== 'inherit') {
			style['color'] = nextProps.color;
		}

		if (nextProps.backgroundColor !== 'inherit') {
			style['backgroundColor'] = nextProps.backgroundColor;
		}

		if (nextProps.borderColor !== 'inherit') {
			style['borderColor'] = nextProps.borderColor;
		}

		if (nextProps.borderWidth !== 'none') {
			style['borderWidth'] = nextProps.borderWidth;
		}

		this._rootStyles.onIf(!nextProps.noripple && !nextProps.disabled)(
			'ripple'
		);

		this.buildInlineStyles(nextProps, style);
		super.componentWillUpdate(nextProps);
	}

	public render() {
		return (
			<div
				className={this._rootStyles.classnames}
				onClick={this.handleClick}
				style={this.inlineStyle}
			>
				<Icon
					className={this._iconStyles.classnames}
					iconName={this.props.iconName}
					sizing={this.props.sizing}
				/>
			</div>
		);
	}
}
