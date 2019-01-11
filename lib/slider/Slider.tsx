/**
 * The Slider control creates a horizontal line overlapped by a chevron that can
 * be moved  along this horizontal line.  The line represents a min/max range.
 * The Slider value increases when the chevron is moved to the right and
 * decreases when moved to the left.  When the chevron is released the current
 * position is given via an onSelect callback.
 *
 * The min/max values must be >= 0.  The control width is represented by this
 * positive range.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/slider.png" width="50%" />
 *
 * ## Examples:
 *
 * #### Simple slider, range 0 - 100, with tick marks at 0, 25, 50, 75, 100 with snap
 * ```javascript
 * import {Slider} from 'gadgets';
 *
 * <Slider
 *     max={100}
 *     min={0}
 *     onSelect={(val: number) => debug('slider select: %o', val)}
 *     scale={2}
 *     snap
 *     ticks={5}
 * />
 * ```
 *
 * ## API
 * #### Events
 * - `onSelect(val: number)` - When the user releases the slider chevron this
 * callback is invoked and given the index where the chevron "landed"
 *
 * #### Styles
 * - `ui-slider` - The `div` around the whole control (the root)
 * - `ui-slider-bar` - The `div` that makes up the central bar that the chevron
 * will slide over.
 * - `ui-slider-element` - the `div` that represents the draggable chevron
 * - `ui-slider-tick` - when tick marks are displayed on the control, this class
 * is attached to each.  The ticks are a `div` container
 *
 * #### Properties
 * - `max: {number} (100)` - The maximum size of the range, counting by 1's
 * - `min: {number} (0)` - The starting point for the range
 * - `scale: {number} (1)` - A sizing (width) multiplier for the range.  It doens't
 * change the counting range, but just the drawing size.  A scale of 2 with the
 * default min/max would yield a width of 200px, but the range would still be 0-100
 * - `snap: {boolean} (false)` - When the ticks option is used this will determine
 * if the chevron slider will be forced to fall on one of the tick marks.
 * - `startPosition: {number} (0)` - the range start position between min/max
 * - ticks: {number} (0)` - A visual number of "stopping" points along the slider
 * These are divided evenly into the range of the slider.  e.g. a setting of 5
 * would show 5 tick marks along the slider.  These positions are also used as a
 * landing point when snap is set to true.
 *
 * @module Slider
 */

'use strict';

// const debug = require('debug')('Slider');

import autobind from 'autobind-decorator';
import {cloneDeep, debounce} from 'lodash';
import * as React from 'react';
import {Keys} from 'util.keys';
import {closestNumber, nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	BaseState,
	boxStyle,
	disabled,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Wrapper
} from '../shared';
import styled from '../shared/themed-components';

export interface SliderProps extends BaseProps {
	max?: number;
	min?: number;
	onSelect?: any;
	scale?: number;
	snap?: boolean;
	startPosition?: number;
	ticks?: number;
}

export function getDefaultSliderProps(): SliderProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			max: 100,
			min: 0,
			obj: 'Slider',
			onSelect: nilEvent,
			scale: 1,
			snap: false,
			startPosition: 0,
			ticks: 0
		})
	);
}

export interface SliderState extends BaseState {
	x?: number;
}

export function getDefaultSliderState(): SliderState {
	return cloneDeep(Object.assign({},
		getDefaultBaseState(), {
			x: false
		}));
}

export const SliderBar: any = styled.div`
	border: solid 1px ${(props: SliderProps) => props.theme.borderColor};
	height: ${(props: SliderProps) => props.height}px;
	left: 50%;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	width: ${(props: SliderProps) => props.width}px;
`;

export const SliderContainer: any = styled.div`
	display: inline-block;
	height: ${(props: SliderProps) => props.height}px;
	position: relative;
	width: ${(props: SliderProps) => props.width}px;

	${(props: SliderProps) => disabled(props)}
	${(props: SliderProps) => invisible(props)}
`;

export const SliderElement: any = styled.div`
	background-color: ${(props: SliderProps) => props.theme.backgroundColor};
	border: solid 1px ${(props: SliderProps) => props.theme.borderColor};
	left: ${(props: SliderProps) => props.left}px;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);

	${(props: SliderProps) => props.sizing && boxStyle[props.sizing]}
`;

export const SliderTick: any = styled.div`
    background-color: ${(props: SliderProps) => props.theme.borderColor};
    height: 0.1875rem;
    left: ${(props: SliderProps) => props.left}px;
    position: absolute;
    bottom: -0.4rem;
    width: 0.125rem;
`;

export class Slider extends BaseComponent<SliderProps, SliderState> {

	public static readonly defaultProps: SliderProps = getDefaultSliderProps();

	private _borderSize: number = 1;
	private _box: any;
	private _container: any;
	private _mouseDelay: number = 5;
	private _mouseMove: any = null;
	private _sliderSize: any;
	private _tickKeys: Keys;
	private _ticks: number[] = [];
	private _width: number = 0;

	constructor(props: SliderProps) {
		super(props, Slider.defaultProps.style);

		this._tickKeys = new Keys({testing: this.props.testing});
		this.state = Object.assign(getDefaultSliderState(), {
			x: this.props.startPosition
		});

		this._sliderSize = BaseComponent.fontSize();
		this._mouseMove = debounce(this.handleMouseMove, this._mouseDelay);

		this.componentWillReceiveProps(this.props);
		this.componentWillUpdate(this.props);
	}

	get max(): number {
		if (this.props.max <= 0) {
			return 1;
		} else {
			return (this.props.max * this.props.scale);
		}
	}

	get min(): number {
		if (this.props.min < 0) {
			return 0;
		} else {
			return this.props.min;
		}
	}

	private buildTicks() {
		return this._ticks.map((offset: number, idx: number) => {
			return (
				<SliderTick
					id={this._tickKeys.at(idx)}
					key={this._tickKeys.at(idx)}
					className="ui-slider-tick"
					left={offset - 1}
				/>
			);
		});
	}

	@autobind
	private handleMouseDown(e: any) {
		if (!this.props.disabled) {
			document.addEventListener('mousemove', this._mouseMove);
			document.addEventListener('mouseup', this.handleMouseUp);
			e.preventDefault();
		}
	}

	@autobind
	private handleMouseMove(e: any) {
		let xVal = e.pageX - this._box.left;

		if (this.props.snap) {
			xVal = closestNumber(this._ticks, xVal);
		} else {
			if (xVal > this.max) {
				xVal = this.max;
			} else if (xVal < this.min) {
				xVal = 0;
			}
		}

		this.setState({
			x: xVal
		});

		e.preventDefault();
	}

	@autobind
	private handleMouseUp(e: any) {
		if (!this.props.disabled) {
			this.props.onSelect(Math.round(this.state.x / this.props.scale));

			document.removeEventListener('mousemove', this._mouseMove);
			document.removeEventListener('mouseup', this.handleMouseUp);

			e.preventDefault();
		}
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

		if (this.props.startPosition !== nextProps.startPosition) {
			this.setState({
				x: nextProps.startPosition
			});
		}

		// Builds an array of tick location offsets
		this._ticks = [];
		if (nextProps.ticks > 1) {

			// the -1 accounts for the start/end tick that will not be part
			// of the offset or loop
			const offset: number = this._width / (nextProps.ticks - 1);
			this._ticks.push(0);  // start tick

			for (let i: number = offset; i < this.max; i += offset) {
				this._ticks.push(i);
			}

			this._ticks.push(this.max); // end tick
		}
	}

	public static getDerivedStateFromProps(props: SliderProps, state: SliderState) {
		state.classes.clear();
		state.classes.add('ui-slider');

		return super.getDerivedStateFromProps(props, state);
	}

	public render() {
		return(
			<Wrapper {...this.props} >
				<SliderContainer
					className={this.state.classes}
					disabled={this.props.disabled}
					height={this._sliderSize + (this._borderSize * 4)}
					visible={this.props.visible}
					width={this._width + this._sliderSize + (this._borderSize * 4)}
				>
					<SliderBar
						className="ui-slider-bar"
						height={this._sliderSize * 0.25}
						ref={this.refContainer}
						width={this._width}
					>
						{this.buildTicks()}
						<SliderElement
							className="ui-slider-element"
							left={this.state.x - (this._sliderSize * 0.5) - this._borderSize}
							onMouseDown={this.handleMouseDown}
							sizing={this.state.sizing}
						/>
					</SliderBar>
				</SliderContainer>
			</Wrapper>
		);
	}
}
