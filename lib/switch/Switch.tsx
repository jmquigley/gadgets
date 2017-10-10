/**
 * A button control that works like a toggle.  Pressing the button will turn it
 * on or off.  The color of the slider shows the state.  The default color for
 * the button when off is red, and when it is on it's green.  There are two
 * types of buttons: *inny* and *outy*.  The *inny* places the button within
 * the slider.  The *outy* makes an oversized button outside of the slider.
 *
 * #### Examples:
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
 * - `noripple: {boolean} (false)` - Turns off the ripple effect that occurs
 * when the circular button is pressed.
 * - `switchType: {SwitchType} (SwitchType.outy)` - Sets the visual form for
 * control.  There are two types: `inny` and `outy`.
 *
 * @module Switch
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {ClassNames} from 'util.classnames';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps
} from '../shared';

export enum SwitchType {
	inny,
	outy
}

export interface SwitchProps extends BaseProps {
	initialToggle?: boolean;
	onClick?: any;
	switchType?: SwitchType;
}

export function getDefaultSwitchProps(): SwitchProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			initialToggle: false,
			onClick: nilEvent,
			switchType: SwitchType.outy
		})
	);
}

export interface SwitchState {
	toggle: boolean;
}

export class Switch extends BaseComponent<SwitchProps, SwitchState> {

	private _buttonInline: any = {};
	private _buttonStyles: ClassNames = new ClassNames();
	private _containerInline: any = {};
	private _sliderStyles: ClassNames = new ClassNames();

	public static defaultProps: SwitchProps = getDefaultSwitchProps();

	constructor(props: SwitchProps) {
		super(props, require('./styles.css'));

		this._rootStyles.add([
			'ui-switch',
			this.styles.container
		]);

		this._sliderStyles.add([
			'ui-switch-slider',
			this.styles.slider
		]);

		this._buttonStyles.add([
			'ui-switch-button'
		]);

		this.state = {
			toggle: this.props.initialToggle
		};

		this.bindCallbacks(
			'handleClick'
		);

		this.componentWillUpdate(this.props, this.state);
	}

	private handleClick() {
		this.setState({toggle: !this.state.toggle}, () => {
			this.props.onClick(this.state.toggle);
		});
	}

	public componentWillUpdate(nextProps: SwitchProps, nextState: SwitchState) {
		if (this.props['sizing'] !== nextProps['sizing']) {
			this._sliderStyles.off(this.rectStyle(this.props['sizing']));
		}

		this._sliderStyles.onIf('sizing' in nextProps)(
			this.rectStyle(nextProps['sizing'])
		);

		this._sliderStyles.onIfElse(nextState.toggle)(
			'ui-slider-on',
			this.styles.sliderOn
		)(
			'ui-slider-off',
			this.styles.sliderOff
		);

		this._buttonStyles.onIfElse(nextState.toggle)(
			nextProps.switchType === SwitchType.outy
				? this.styles.buttonRightOuty : this.styles.buttonRightInny
		)(
			nextProps.switchType === SwitchType.outy
				? this.styles.buttonLeftOuty : this.styles.buttonLeftInny
		);

		this._buttonStyles.onIf(!nextProps.noripple && !nextProps.disabled)(
			'ripple'
		);

		this._containerInline['height'] = this.fontSizePX(nextProps.sizing, 1.25);

		if (nextProps.switchType === SwitchType.outy) {
			this._buttonInline['width'] =
			this._buttonInline['height'] =
				this.fontSizePX(nextProps.sizing, 1.25);
		} else {
			this._buttonInline['width'] =
			this._buttonInline['height'] =
				this.fontSizePX(nextProps.sizing, 0.6);
		}

		super.componentWillUpdate(nextProps, nextState);
	}

	public render() {
		return (
			<div
				className={this._rootStyles.classnames}
				style={{...this._containerInline}}
			>
				<div
					className={this._sliderStyles.classnames}
					onClick={this.props.disabled ? nilEvent : this.handleClick}
				>
					<div
						className={this._buttonStyles.classnames}
						onClick={this.props.disabled ? nilEvent : this.handleClick}
						style={{...this._buttonInline}}
					/>
				</div>
			</div>
		);
	}
}
