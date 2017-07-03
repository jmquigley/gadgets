/**
 * Works like a typical button control, but instead of a square button the
 * clickable surface is within a circle.  This type of button does NOT fill
 * the parent container.  Its size is determined by the sizing parameter.
 *
 * #### Examples:
 *
 * ```javascript
 * import {ButtonCircle} from 'gadgets';
 * <ButtonCircle iconName="times" sizing={Sizing.small} onClick={someFunction} />
 * ```
 *
 * #### Events
 * - `onClick()` - This callback is invoked when the control is clicked by the user
 *
 * #### Styles
 * - `ui-button-circle` - A top level style placed on the `<div>` container for the
 * control.
 *
 * #### Properties
 * - `borderColor: string ('black')` - The color of the border around the circle.
 * - `color: string ('black')` - the color of the button icon
 * - `iconName: string ('bomb')` - the name of the font awesome icon used with this button
 * - `sizing: Sizing (Sizing.normal)` - Allows one to change the size of the icon within the button.
 * See the shared props object for the `Sizing` enumeration.
 *
 * @module ButtonCircle
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Button, ButtonProps, getDefaultButtonProps} from '../button';
import {BaseComponent, Sizing} from '../shared';

export interface ButtonCircleProps extends ButtonProps {
}

export function getDefaultButtonCircleProps(): ButtonProps {
	return cloneDeep(Object.assign(
		getDefaultButtonProps(), {
			borderColor: 'black',
			color: 'black',
			iconName: 'bomb',
			sizing: Sizing.normal
		}));
}

export interface ButtonCircleState {}

export class ButtonCircle extends BaseComponent<ButtonCircleProps, ButtonCircleState> {

    public static defaultProps: ButtonCircleProps = getDefaultButtonCircleProps();

	private _buttonClasses: string[] = [];

    constructor(props: ButtonCircleProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	shouldComponentUpdate(nextProps: ButtonCircleProps): boolean {
		super.resetStyles(nextProps);
		this.classes.push('ui-button-circle');
		this.classes.push(this.styles.buttonCircle);

		this._buttonClasses = [];
		this._buttonClasses.push(this.styling.borderStyle);
		this._buttonClasses.push(this.styles.buttonCircleIcon);

		super.buildStyles(nextProps);
		return true;
	}

	render() {
		return (
			<div className={this.classes.join(' ')}>
				<div className={this.styles.buttonCircleContainer}>
					<Button
						{...this.props}
						className={this._buttonClasses.join(' ')}
						iconName={this.props.iconName}
						iconStyle={this.styling.boxStyle}
						style={this.inlineStyle}
						/>
				</div>
			</div>
		);
	}
}
