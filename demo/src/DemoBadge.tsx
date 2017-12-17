'use strict';

const debug = require('debug')('DemoBadge');

import autobind from 'autobind-decorator';
import * as React from 'react';

const {
	Badge,
	Button,
	Container,
	Location
} = require('../../dist/bundle');

export interface DemoBadgeState {
	counter1?: number;
	counter2?: number;
	counter3?: number;
	counter4?: number;
	counter5?: number;
}

export default class DemoBadge extends React.Component<any, DemoBadgeState> {
	constructor(props: any) {
		super(props);
		debug('creating');

		this.state = {
			counter1: 0,
			counter2: 1,
			counter3: 99,
			counter4: 1,
			counter5: -5
		};
	}

	@autobind
	private handleDebugCounter(counter: number) {
		debug(`Badge counter click: ${counter}`);
	}

	@autobind
	private handleCounter1() {
		this.setState({counter1: this.state.counter1 + 1});
	}

	@autobind
	private handleCounter2() {
		this.setState({counter2: this.state.counter2 + 1});
	}

	@autobind
	private handleCounter3() {
		this.setState({counter3: this.state.counter3 + 1});
	}

	@autobind
	private handleCounter4() {
		this.setState({counter4: this.state.counter4 + 1});
	}

	@autobind
	private handleCounter5() {
		this.setState({counter5: this.state.counter5 + 1});
	}

	public render() {
		return(
			<Container id="badgeExample" title="Badges">
				'click on the buttons to increment the badges'
				<div id="simple-buttons">
					<div className="box">
						<p>top right (suppress)</p>
						<Badge
							counter={this.state.counter1}
							suppress
						>
							<div className="boxButtons">
								<Button onClick={this.handleCounter1} />
							</div>
						</Badge>
					</div>

					<div className="box">
						<p>top left<br/>&nbsp;</p>
						<Badge
							counter={this.state.counter2}
							location={Location.topLeft}
							onClick={this.handleDebugCounter}
						>
							<div className="boxButtons">
								<Button onClick={this.handleCounter2} />
							</div>
						</Badge>
					</div>

					<div className="box">
						<p>bottom right</p>
						<Badge
							counter={this.state.counter3}
							location={Location.bottomRight}
							style={{color: 'green'}}
						>
							<div className="boxButtons">
								<Button onClick={this.handleCounter3} />
							</div>
						</Badge>
					</div>

					<div className="box">
						<p>bottom left</p>
						<Badge
							counter={this.state.counter4}
							location={Location.bottomLeft}
							style={{color: 'magenta'}}
						>
							<div className="boxButtons">
								<Button onClick={this.handleCounter4} />
							</div>
						</Badge>
					</div>

					<div className="box">
						<p>bottom (negative)</p>
						<Badge
							counter={this.state.counter5}
							location={Location.bottom}
							style={{color: 'blue'}}
						>
							<div className="boxButtons">
								<Button onClick={this.handleCounter5} />
							</div>
						</Badge>
					</div>

				</div>
			</Container>
		);
	}
}
