'use strict';

const debug = require('debug')('DemoSlider');

import autobind from 'autobind-decorator';
import * as React from 'react';
import {
	Break,
	Container,
	Option,
	Slider
} from '../../dist/bundle';

export interface DemoSliderState {
	sliderToggle: boolean;
}

export default class DemoSlider extends React.Component<any, DemoSliderState> {

	constructor(props: any) {
		super(props);
		debug('creating');

		this.state = {
			sliderToggle: false
		};
	}

	@autobind
	private handleSnap(toggle: boolean, title: string) {
		debug('%s to %o, %O', title, toggle, this.state);
		this.setState({
			sliderToggle: toggle
		});
	}

	@autobind
	private handleSelect(val: any) {
		debug('slider select: %o', val);
	}

	public render() {
		return (
			<Container id="sliderExample" title="Slider">
				<h3>Normal slider control, range 0 - 100, toggle snap</h3>
				<Slider
					disabled={this.props['disabled']}
					onSelect={this.handleSelect}
					scale={2}
					sizing={this.props['sizing']}
					snap={this.state.sliderToggle}
					ticks={5}
				/>

				<Option
					disabled={this.props['disabled']}
					onClick={this.handleSnap}
					text="Toggle snap mode on/off"
				/>
				<Break sizing={this.props['sizing']}/>

				<h3>Normal slider, no ticks, range 0 - 100</h3>
				<Slider
					disabled={this.props['disabled']}
					onSelect={this.handleSelect}
					scale={2}
					sizing={this.props['sizing']}
				/>

			</Container>
		);
	}
}
