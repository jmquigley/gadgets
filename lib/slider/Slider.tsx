// TODO: Add documentation for Slider control

'use strict';

const debug = require('debug')('Slider');

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
			labels: [],
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
	display: flex;
	height: ${props => props.height || '8'}px;
	width: inherit;
`;

export const SliderContainer: any = withProps<SliderProps, HTMLDivElement>(styled.div)`
	border: solid 1px red;
	padding: ${props => props.padding}px;
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

export class Slider extends BaseComponent<SliderProps, SliderState> {

	public static readonly defaultProps: SliderProps = getDefaultSliderProps();

	private _borderSize: number = 1;
	private _box: any;
	private _container: any;
	private _sliderSize: any;
	private _width: number = 0;

	constructor(props: SliderProps) {
		super(props, Slider.defaultProps.style);

		this.state = {
			x: 0
		};

		this._sliderSize = this.fontSize();

		this.componentWillReceiveProps(this.props);
		this.componentWillUpdate(this.props);
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
		let xVal = e.pageX - this._box.left - this._sliderSize * 0.5;

		if (xVal > this.max) {
			xVal = this.max;
		} else if (xVal < this.min) {
			xVal = 0;
		}

		debug('handleMouseMove => pageX: %d, xVal: %d', e.pageX, xVal);

		this.setState({
			x: xVal
		});

		e.preventDefault();
	}

	@autobind
	private handleMouseUp(e: any) {
		debug('handleMouseUp: %O', e);

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
		debug('box: %O', this._box);
	}

	public componentWillReceiveProps(nextProps: SliderProps) {
		this._width = Math.round((nextProps.max - nextProps.min) * nextProps.scale);
	}

	public render() {
		return(
			<ThemeProvider theme={getTheme()}>
				<SliderContainer
					className="ui-slider-container"
					innerRef={this.refContainer}
					padding={(this._sliderSize * 0.5) + this._borderSize}
					width={this._width}
				>
					<SliderBar
						className="ui-slider-bar"
						height={this._sliderSize * 0.25}
					/>
					<SliderElement
						className="ui-slider"
						left={this.state.x}
						onMouseDown={this.handleMouseDown}
						sizing={this.props.sizing}
					/>
				</SliderContainer>
			</ThemeProvider>
		);
	}
}
