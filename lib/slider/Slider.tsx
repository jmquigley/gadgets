// TODO: Add documentation for Slider control

'use strict';

// const debug = require('debug')('Slider');

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	boxStyle,
	getDefaultBaseProps,
	getTheme
} from '../shared';
import styled, {ThemeProvider, withProps} from '../shared/themed-components';

export interface SliderProps extends BaseProps {
	labels?: string[];
	max?: number;
	min?: number;
	onSelect?: any;
	scale?: number;
	snap?: boolean;
	step?: number;
	ticks?: number;
}

export function getDefaultSliderProps(): SliderProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			left: '0',
			max: 100,
			min: 0,
			onSelect: nilEvent,
			scale: 1,
			snap: false,
			step: 1,
			ticks: 0
		})
	);
}

export interface SliderState {
	x?: number;
}

export const SliderBar: any = withProps<SliderProps, HTMLDivElement>(styled.div)`
	border: solid 1px ${props => props.theme.borderColor};
	height: ${props => props.height || '8'}px;
	left: 50%;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	width: ${props => props.width || '100'}px;
`;

export const SliderContainer: any = withProps<SliderProps, HTMLDivElement>(styled.div)`
	border: solid 1px red;
	height: ${props => props.height}px;
	padding: ${props => props.padding || '0'};
	position: relative;
	width: ${props => props.width || '100'}px;
`;

export const SliderElement: any = withProps<SliderProps, HTMLDivElement>(styled.div)`
	background-color: ${props => props.theme.backgroundColor};
	border: solid 1px ${props => props.theme.borderColor};
	left: ${props => props.left}px;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);

	${props => props.sizing && boxStyle[props.sizing]}
`;

export const SliderTick: any = withProps<SliderProps, HTMLDivElement>(styled.div)`
    background-color: ${props => props.theme.borderColor};
    height: 0.1875rem;
    left: ${props => props.left || 0}rem;
    position: absolute;
    bottom: -0.4rem;
    width: 0.125rem;
`;

export class Slider extends BaseComponent<SliderProps, SliderState> {

	public static readonly defaultProps: SliderProps = getDefaultSliderProps();

	private _borderSize: number = 1;
	private _box: any;
	private _container: any;
	private _heightAdjust: number = 0;
	private _offset: number = 1 / this.defaultSize;
	private _sliderSize: any;
	private _width: number = 0;

	constructor(props: SliderProps) {
		super(props, Slider.defaultProps.style);

		this.state = {
			x: 0
		};

		this._sliderSize = this.fontSize();

		if (this.hasLabels) {
			this._heightAdjust = this._sliderSize;
		}

		this.componentWillReceiveProps(this.props);
		this.componentWillUpdate(this.props);
	}

	get hasLabels(): boolean {
		return this.props.labels.length > 0;
	}

	get max(): number {
		return this.props.max * this.props.scale;
	}

	get min(): number {
		return this.props.min;
	}

	@autobind
	private handleMouseDown(e: any) {
		document.addEventListener('mousemove', this.handleMouseMove);
		document.addEventListener('mouseup', this.handleMouseUp);
		e.preventDefault();
	}

	@autobind
	private handleMouseMove(e: any) {
		let xVal = e.pageX - this._box.left;

		if (xVal > this.max) {
			xVal = this.max;
		} else if (xVal < this.min) {
			xVal = 0;
		}

		this.setState({
			x: xVal
		});

		e.preventDefault();
	}

	@autobind
	private handleMouseUp(e: any) {
		this.props.onSelect(Math.round(this.state.x / this.props.scale));

		document.removeEventListener('mousemove', this.handleMouseMove);
		document.removeEventListener('mouseup', this.handleMouseUp);

		e.preventDefault();
	}

	@autobind
	private refContainer(ref: any) {
		this._container = ref;
	}

	public componentDidMount() {
		this._box = this._container.getBoundingClientRect();
	}

	public componentWillReceiveProps(nextProps: SliderProps) {
		this._width = Math.round((nextProps.max - nextProps.min) * nextProps.scale);
	}

	public render() {
		return(
			<ThemeProvider theme={getTheme()}>
				<SliderContainer
					className="ui-slider-container"
					height={this._sliderSize + this._borderSize * 4}
					padding={`0 0 ${this._heightAdjust}px 0`}
					width={this._width + this._sliderSize + (this._borderSize * 4)}
				>
					<SliderBar
						className="ui-slider-bar"
						height={this._sliderSize * 0.25}
						innerRef={this.refContainer}
						width={this._width}
					>
						<SliderTick
							className="ui-slider-tick"
							left={-this._offset}
						/>
						<SliderElement
							className="ui-slider"
							left={this.state.x - (this._sliderSize * 0.5) - this._borderSize}
							onMouseDown={this.handleMouseDown}
							sizing={this.props.sizing}
						/>
					</SliderBar>
				</SliderContainer>
			</ThemeProvider>
		);
	}
}
