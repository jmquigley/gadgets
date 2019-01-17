/**
 * Works like a typical button control, but instead of a square button the
 * clickable surface is within a circle.  This type of button does NOT fill
 * the parent container.  Its size is determined by the sizing parameter.
 *
 * #### Examples:
 *
 * ```javascript
 * import {ButtonCircle} from 'gadgets';
 *
 * <ButtonCircle
 *     iconName="times"
 *     sizing={Sizing.small}
 *     onClick={someFunction}
 * />
 * ```
 *
 * #### Events
 * - `onClick()` - This callback is invoked when the control is clicked by the
 * user
 *
 * #### Styles
 * - `ui-button-circle` - A top level style placed on the `<div>` container for
 * the control.
 *
 * #### Properties
 * - `borderColor: string ('black')` - The color of the border around the
 * circle.
 * - `color: string ('black')` - the color of the button icon
 * - `iconName: string ('bomb')` - the name of the font awesome icon used with
 * this button
 * - `sizing: Sizing (Sizing.normal)` - Allows one to change the size of the
 * icon within the button.  See the shared props object for the `Sizing`
 * enumeration.
 *
 * @module ButtonCircle
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {
	BaseButtonView,
	Button,
	ButtonProps,
	ButtonState,
	getDefaultButtonProps,
	getDefaultButtonState
} from '../button';
import {
	BaseComponent,
	// @ts-ignore
	BaseState,
	borderStyle,
	Color,
	Sizing,
	Wrapper
} from '../shared';
import styled from '../shared/themed-components';

export interface ButtonCircleProps extends ButtonProps {
	onClick?: any;
}

export function getDefaultButtonCircleProps(): ButtonProps {
	return cloneDeep(Object.assign({},
		getDefaultButtonProps(), {
			obj: 'ButtonCircle',
			onClick: nilEvent,
			style: {
				borderColor: Color.black
			}
		})
	);
}

export type ButtonCircleState = ButtonState;

export function getDefaultButtonCircleState(): ButtonCircleState {
	return cloneDeep({...getDefaultButtonState('ui-button-circle')});
}

export const ButtonCircleContainerView: any = styled.div`
	${BaseButtonView}
	height: unset;
`;

export const ButtonCircleInnerView: any = styled.div`
	border-radius: 4em;
	display: inline-block;
	height: ${(props: ButtonCircleProps) => props.height};
	width: ${(props: ButtonCircleProps) => props.width};
`;

export const ButtonCircleView: any = styled(Button)`
	border-radius: 4em;
	padding: ${(props: ButtonCircleProps) => {
		switch (props.sizing) {
			case Sizing.xxsmall: return('0.2em 0.2em');
			case Sizing.xsmall: return('0.08em 0.005em');
			case Sizing.small: return('0.1em 0.005em');
			case Sizing.large: return('0.175em 0');
			case Sizing.xlarge: return('0.25em 0');
			case Sizing.xxlarge: return('0.33em 0');

			case Sizing.normal:
			default:
				return('0.125em 0');
		}
	}};

	${(props: ButtonCircleProps) => props.sizing && borderStyle[props.sizing]}
`;

export class ButtonCircle extends BaseComponent<ButtonCircleProps, ButtonCircleState> {

	public static defaultProps: ButtonCircleProps = getDefaultButtonCircleProps();
	public state: ButtonCircleState = getDefaultButtonCircleState();

	constructor(props: ButtonCircleProps) {
		super(props, ButtonCircle.defaultProps.style);
	}

	public render() {
		const size: string = BaseComponent.fontSizePX(this.props.sizing, 1.5);

		return (
			<Wrapper {...this.props} >
				<ButtonCircleContainerView className={this.state.classes.classnames}>
					<ButtonCircleInnerView
						height={size}
						width={size}
					>
						<ButtonCircleView
							{...this.props}
							iconName={this.props.iconName}
							style={this.state.style}
						/>
					</ButtonCircleInnerView>
				</ButtonCircleContainerView>
			</Wrapper>
		);
	}
}
