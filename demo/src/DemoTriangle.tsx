"use strict";

const debug = require("debug")("DemoTriangle");

import * as React from "react";
import {Direction, Triangle} from "../../dist/bundle";
import {StyledContainer} from "../app";

export default class DemoTriangle extends React.Component<any, undefined> {
	private style: any = {
		fill: "red",
		stroke: "green"
	};

	constructor(props: any) {
		super(props);
		debug("creating");
	}

	public render() {
		return (
			<StyledContainer id='triangleExample' title='Triangle'>
				<h3>Default</h3>
				<Triangle
					sizing={this.props["sizing"]}
					direction={Direction.up}
				/>
				<Triangle
					sizing={this.props["sizing"]}
					direction={Direction.right}
				/>
				<Triangle
					sizing={this.props["sizing"]}
					direction={Direction.down}
				/>
				<Triangle
					sizing={this.props["sizing"]}
					direction={Direction.left}
				/>

				<h3>Custom Colors</h3>
				<Triangle
					sizing={this.props["sizing"]}
					direction={Direction.up}
					style={this.style}
				/>
				<Triangle
					sizing={this.props["sizing"]}
					direction={Direction.right}
					style={this.style}
				/>
				<Triangle
					sizing={this.props["sizing"]}
					direction={Direction.down}
					style={this.style}
				/>
				<Triangle
					sizing={this.props["sizing"]}
					direction={Direction.left}
					style={this.style}
				/>
			</StyledContainer>
		);
	}
}
