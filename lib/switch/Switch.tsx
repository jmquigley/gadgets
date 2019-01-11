/**
 * A button control that works like a toggle.  Pressing the button will turn it
 * on or off.  The color of the slider shows the state.  The default color for
 * the button when off is red, and when it is on it's green.  There are two
 * types of buttons: *inny* and *outy*.  The *inny* places the button within
 * the slider.  The *outy* makes an oversized button outside of the slider.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/switch.png" width="40%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Switch, SwitchType} from 'gadgets';
 * <Switch
 *     initialToggle={true}
 *     onClick={(toggle: boolean) => {
 *         console.log(`clicked: ${toggle}`);
 *     }}
 *     switchType={SwitchType.inny}
 * />
 * ```
 *
 * ## API
 * #### Events
 * - `onClick(toggle: boolean)` - invoked when the circular toggle button is
 * clicked.  The callback is given a boolean parameter.  When true, the button
 * is *on*.  When it is false it is *off*.
 *
 * #### Styles
 * - `ui-switch` - style applied to the root container for the component
 * - `ui-switch-slider` - style applied to the backgrond oval behind the button.
 * This changes color when the state is updated (turned on/off)
 * - `ui-switch-button` - applied to the circular slider button
 * - `ui-slider-on` - style applied when the state is *on* (true)
 * - `ui-slider-off` - style applied when the state is *off* (false)
 *
 * #### Properties
 * - `initialToggle: {boolean} (false)` - The initial on/off state for the
 * toggle.
 * - `innyScale: {number} (0.6)` - the percent sizing of the circle button
 * font size when using the Inny type.
 * - `noripple: {boolean} (false)` - Turns off the ripple effect that occurs
 * when the circular button is pressed.
 * - `outyScale: {number} (1.25)` - the percent sizing of the circle button
 * font size when using the Outy type.
 * - `sliderScale: {number} (1.25)` - the percent sizing of the slider portion
 * of the control as a percent of the font sizing.
 * - `switchType: {SwitchType} (SwitchType.outy)` - Sets the visual form for
 * control.  There are two types: `inny` and `outy`.
 *
 * @module Switch
 */

'use strict';

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {ClassNames} from 'util.classnames';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	BaseState,
	Color,
	disabled,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	rectStyle,
	Wrapper
} from '../shared';
import styled from '../shared/themed-components';

export enum SwitchType {
	inny,
	outy
}

export interface SwitchProps extends BaseProps {
	initialToggle?: boolean;
	innyScale?: number;
	onClick?: any;
	outyScale?: number;
	sliderScale?: number;
	switchType?: SwitchType;
}

export function getDefaultSwitchProps(): SwitchProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			initialToggle: false,
			innyScale: 0.6,
			obj: 'Switch',
			onClick: nilEvent,
			outyScale: 1.25,
			sliderScale: 1.25,
			switchType: SwitchType.outy
		})
	);
}

export interface SwitchState extends BaseState {
	buttonStyles: ClassNames;
	sliderStyles: ClassNames;
	toggle: boolean;
}

export function getDefaultSwitchState(): SwitchState {
	return cloneDeep(Object.assign({},
		getDefaultBaseState(), {
			buttonStyles: new ClassNames(),
			sliderStyles: new ClassNames(),
			toggle: false
		}));
}

export const StyledButton: any = styled.div`
	background: white;
	border: 1px solid silver;
	border-radius: 96px;
	box-sizing: border-box;
	display: inline-block;
	position: absolute;
	top: 50%;
	transition: all ${(props: SwitchProps) => props.theme.transitionDelay} ease;
	transform: translateY(-50%);

	width: ${(props: SwitchProps) => props.width || '1.0em'};
	height: ${(props: SwitchProps) => props.height || '1.0em'};
`;

export const SliderView: any = styled.div`
	border: 1px solid silver;
	border-radius: 96px;
	position: relative;

	${(props: SwitchProps) => rectStyle[props.sizing]}
	${(props: SwitchProps) => disabled(props)}
	${(props: SwitchProps) => invisible(props)}

	overflow: unset;
`;

export const SliderContainerView: any = styled.div`
	align-items: center;
	box-sizing: border-box;
	display: inline-flex;
	height: ${(props: SwitchProps) => props.height};
	padding: 0 2%;
	width: auto;
`;

export class Switch extends BaseComponent<SwitchProps, SwitchState> {

	public static defaultProps: SwitchProps = getDefaultSwitchProps();

	constructor(props: SwitchProps) {
		super(props, Switch.defaultProps.style);

		this.state = Object.assign(getDefaultSwitchState(), {
			toggle: this.props.initialToggle
		});
	}

	@autobind
	private handleClick() {
		if (!this.props.disabled && this.props.visible) {
			this.setState({toggle: !this.state.toggle}, () => {
				this.props.onClick(this.state.toggle);
			});
		}
	}

	public static getDerivedStateFromProps(props: SwitchProps, state: SwitchState) {
		state.classes.clear();
		state.classes.add('ui-switch');

		state.buttonStyles.clear();
		state.buttonStyles.add('ui-switch-button');
		state.buttonStyles.onIf(!props.noripple && !props.disabled)(
			'ripple'
		);

		state.sliderStyles.clear();
		state.sliderStyles.add('ui-switch-slider');
		state.sliderStyles.onIfElse(state.toggle)(
			'ui-slider-on'
		)(
			'ui-slider-off'
		);

		return super.getDerivedStateFromProps(props, state);
	}

	public render() {
		let size: string = '';
		let left: string = '';

		if (this.props.switchType === SwitchType.outy) {
			left = this.state.toggle ? '-15%' : '45%';
			size = BaseComponent.fontSizePX(this.state.sizing, this.props.outyScale);
		} else if (this.props.switchType === SwitchType.inny) {
			left = this.state.toggle ? '5%' : '60%';
			size = BaseComponent.fontSizePX(this.state.sizing, this.props.innyScale);
		}

		return (
			<Wrapper {...this.props} >
				<SliderContainerView
					className={this.classes}
					height={BaseComponent.fontSizePX(this.state.sizing, this.props.sliderScale)}
				>
					<SliderView
						{...this.props}
						className={this.state.sliderStyles.classnames}
						onClick={this.handleClick}
						style={{
							backgroundColor: this.state.toggle ? Color.success : Color.error
						}}
					>
						<StyledButton
							className={this.state.buttonStyles.classnames}
							height={size}
							onClick={this.handleClick}
							style={{left: left}}
							width={size}
						/>
					</SliderView>
				</SliderContainerView>
			</Wrapper>
		);
	}
}
