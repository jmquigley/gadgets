'use strict';

const debug = require('debug')('DemoSlider');

import autobind from 'autobind-decorator';
import * as React from 'react';

const {
	Break,
	Container,
	Option,
	Slider
} = require('../../dist/bundle');

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
					onSelect={this.handleSelect}
					scale={2}
					sizing={this.props['sizing']}
					snap={this.state.sliderToggle}
					ticks={5}
				/>

				<Option
					onClick={this.handleSnap}
					text="Toggle snap mode on/off"
				/>
				<Break sizing={this.props['sizing']}/>

				<h3>Normal slider, no ticks, range 0 - 100</h3>
				<Slider
					onSelect={this.handleSelect}
					scale={2}
					sizing={this.props['sizing']}
				/>
				<Break sizing={this.props['sizing']} />

				<h3>Disabled slider</h3>
				<Slider
					disabled
					onSelect={this.handleSelect}
					scale={2}
					sizing={this.props['sizing']}
					ticks={5}
				/>
				<Break sizing={this.props['sizing']}/>

			</Container>
		);
	}
}
