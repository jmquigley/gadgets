"use strict";

const debug = require("debug")("DemoBadge");

import autobind from "autobind-decorator";
import * as React from "react";
import {Badge, Button, Location} from "../../dist/bundle";
import {StyledContainer} from "./helpers";

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
		debug("creating");

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
		debug(`Badge counter: ${counter}`);
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
		return (
			<StyledContainer id='badgeExample' title='Badges'>
				click on the buttons to increment the badges
				<br />
				<br />
				<div id='simple-buttons'>
					<div className='box'>
						<p>
							top right
							<br />
							(suppress)
						</p>
						<Badge
							disabled={this.props["disabled"]}
							counter={this.state.counter1}
							sizing={this.props["sizing"]}
							suppress
						>
							<div className='boxButtons'>
								<Button
									disabled={this.props["disabled"]}
									onClick={this.handleCounter1}
								/>
							</div>
						</Badge>
					</div>

					<div className='box'>
						<p>
							top left
							<br />
							&nbsp;
						</p>
						<Badge
							disabled={this.props["disabled"]}
							counter={this.state.counter2}
							location={Location.topLeft}
							onUpdate={this.handleDebugCounter}
							sizing={this.props["sizing"]}
						>
							<div className='boxButtons'>
								<Button
									disabled={this.props["disabled"]}
									onClick={this.handleCounter2}
								/>
							</div>
						</Badge>
					</div>

					<div className='box'>
						<p>
							bottom right
							<br />
							&nbsp;
						</p>
						<Badge
							disabled={this.props["disabled"]}
							counter={this.state.counter3}
							location={Location.bottomRight}
							sizing={this.props["sizing"]}
							style={{color: "green"}}
						>
							<div className='boxButtons'>
								<Button
									disabled={this.props["disabled"]}
									onClick={this.handleCounter3}
								/>
							</div>
						</Badge>
					</div>

					<div className='box'>
						<p>
							bottom left
							<br />
							&nbsp;
						</p>
						<Badge
							disabled={this.props["disabled"]}
							counter={this.state.counter4}
							location={Location.bottomLeft}
							sizing={this.props["sizing"]}
							style={{color: "magenta"}}
						>
							<div className='boxButtons'>
								<Button
									disabled={this.props["disabled"]}
									onClick={this.handleCounter4}
								/>
							</div>
						</Badge>
					</div>

					<div className='box'>
						<p>
							bottom
							<br />
							(negative)
						</p>
						<Badge
							disabled={this.props["disabled"]}
							counter={this.state.counter5}
							location={Location.bottom}
							sizing={this.props["sizing"]}
							style={{color: "blue"}}
						>
							<div className='boxButtons'>
								<Button
									disabled={this.props["disabled"]}
									onClick={this.handleCounter5}
								/>
							</div>
						</Badge>
					</div>
				</div>
			</StyledContainer>
		);
	}
}
