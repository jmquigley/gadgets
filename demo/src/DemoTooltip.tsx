'use strict';

const debug = require('debug')('DemoTooltip');

import * as loremIpsum from 'lorem-ipsum';
import * as React from 'react';

const {
	Container,
	Location,
	Tooltip
} = require('../../dist/bundle');

export default class DemoTooltip extends React.Component<any, undefined> {

	private randomText = loremIpsum({units: 'sentences', count: 2, random: null});

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	public render() {
		return (
			<Container id="tooltipExample" title="Tooltip">
				<h3>Simple</h3>
				Hover over each square to see the Tooltip.<br/><br/><br/>
				<div id="tooltipContainer">
					<div id="tt-topLeft" className="tooltipCell topLeft">
						topLeft
						<Tooltip location={Location.topLeft} parent="tt-topLeft">{this.randomText}</Tooltip>
					</div>

					<div id="tt-top" className="tooltipCell top">
						top
						<Tooltip location={Location.top} parent="tt-top">{this.randomText}</Tooltip>
					</div>

					<div id="tt-topRight" className="tooltipCell topRight">
						topRight
						<Tooltip location={Location.topRight} parent="tt-topRight">{this.randomText}</Tooltip>
					</div>

					<div id="tt-middleLeft" className="tooltipCell middleLeft">
						middleLeft
						<Tooltip location={Location.middleLeft} parent="tt-middleLeft">{this.randomText}</Tooltip>
					</div>

					<div className="tooltipCell middle inactive">N/A</div>

					<div id="tt-middleRight" className="tooltipCell middleRight">
						middleRight
						<Tooltip location={Location.middleRight} parent="tt-middleRight">{this.randomText}</Tooltip>
					</div>

					<div id="tt-bottomLeft" className="tooltipCell bottomLeft">
						bottomLeft
						<Tooltip location={Location.bottomLeft} parent="tt-bottomLeft">{this.randomText}</Tooltip>
					</div>

					<div id="tt-bottom" className="tooltipCell bottom">
						bottom
						<Tooltip location={Location.bottom} parent="tt-bottom">{this.randomText}</Tooltip>
					</div>

					<div id="tt-bottomRight" className="tooltipCell bottomRight">
						bottomRight
						<Tooltip location={Location.bottomRight} parent="tt-bottomRight">{this.randomText}</Tooltip>
					</div>
				</div>

				<h3>Custom style</h3>
				Hover over the square to see the custom style colors on the tooltip
				<div id="tooltipStyleExample">
					<Tooltip
						location={Location.middleRight}
						parent="tooltipStyleExample"
						style={{
							color: '#fd7400',
							backgroundColor: '#004358'
						}}
					>
						{this.randomText}
					</Tooltip>
				</div>

			</Container>
		);
	}
}
