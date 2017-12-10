// TODO: Add documentation for Slider control

'use strict';

const debug = require('debug')('Slider');

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
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
	border: solid 1px green;
	display: flex;
	height: ${props => props.height || '8'}px;
	width: inherit;
`;

export const SliderContainer: any = withProps<SliderProps, HTMLDivElement>(styled.div)`
	border: solid 1px red;
	padding: 0.5rem;
	position: relative;
	width: ${props => props.width || '100'}px;
`;

export const SliderElement: any = withProps<SliderProps, HTMLDivElement>(styled.div)`
	border: solid 1px blue;
	left: ${props => props.left}px;
	position: absolute;
	top: 15%;

	${props => props.sizing && boxStyle[props.sizing]}
`;

export class Slider extends BaseComponent<SliderProps, SliderState> {

	public static readonly defaultProps: SliderProps = getDefaultSliderProps();

	private _box: any;
	private _sliderSize: any;
	private _width: number = 0;

	constructor(props: SliderProps) {
		super(props, Slider.defaultProps.style);

		this.state = {
			x: 0
		};

		this._sliderSize = this.fontSize() * 0.5;

		this.componentWillReceiveProps(this.props);
		this.componentWillUpdate(this.props);
	}

	@autobind
	private handleMouseDown(e: any) {
		debug('handleMouseDown: %O, %d, box: %O', e, e.pageX, this._box);

		this.setState({
			x: e.pageX - this._box.left - this._sliderSize
		});

		document.addEventListener('mousemove', this.handleMouseMove);
		document.addEventListener('mouseup', this.handleMouseUp);

		e.preventDefault();
	}

	@autobind
	private handleMouseMove(e: any) {
		debug('handleMouseMove: %O, %d', e, e.pageX);

		this.setState({
			x: e.pageX - this._sliderSize * 2
		});

		e.preventDefault();
	}

	@autobind
	private handleMouseUp(e: any) {
		debug('handleMouseUp: %O', e);

		document.removeEventListener('mousemove', this.handleMouseMove);
		document.removeEventListener('mouseup', this.handleMouseUp);

		e.preventDefault();
	}

	@autobind
	private refContainer(ref: any) {
		this._box = ref.getBoundingClientRect();
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
					width={this._width}
				>
					<SliderBar
						className="ui-slider-bar"
						height={this._sliderSize}
					/>
					<SliderElement
						className="ui-slider"
						left={this.state.x}
						onMouseDown={this.handleMouseDown}
						onMouseUp={this.handleMouseUp}
						sizing={this.props.sizing}
					/>
				</SliderContainer>
			</ThemeProvider>
		);
	}
}
