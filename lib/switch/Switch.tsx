// TODO: add Switch documentation

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
	initialState: boolean;
	onClick: any;
	switchType: SwitchType;
}

export function getDefaultSwitchProps(): SwitchProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			initialState: false,
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
			toggle: this.props.initialState
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

		this._containerInline['height'] = this.fontSizePX(nextProps.sizing, 1.5);

		if (nextProps.switchType === SwitchType.outy) {
			this._buttonInline['width'] =
			this._buttonInline['height'] =
				this.fontSizePX(nextProps.sizing, 1.5);
		} else {
			this._buttonInline['width'] =
			this._buttonInline['height'] =
				this.fontSizePX(nextProps.sizing, 0.8);
		}

		super.componentWillUpdate(nextProps, nextState);
	}

	public render() {
		return (
			<div
				className={this._rootStyles.classnames}
				style={this._containerInline}
			>
				<div
					className={this._sliderStyles.classnames}
					onClick={!this.props.disabled && this.handleClick}
				>
					<div
						className={this._buttonStyles.classnames}
						style={this._buttonInline}
					/>
				</div>
			</div>
		);
	}
}
