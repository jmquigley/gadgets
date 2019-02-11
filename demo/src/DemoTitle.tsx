"use strict";

const debug = require("debug")("DemoTitle");

import * as React from "react";
import {Break, Title, TitleLayout} from "../../dist/bundle";
import {StyledContainer} from "../app";

export default class DemoTitle extends React.Component<any, undefined> {
	constructor(props: any) {
		super(props);
		debug("creating");
	}

	public render() {
		return (
			<StyledContainer id='titleExample' title='Title'>
				<Title
					layout={TitleLayout.quarter}
					sizing={this.props["sizing"]}
					title='quarter'
					widget='widget'
				/>
				<Break sizing={this.props["sizing"]} />

				<Title
					layout={TitleLayout.third}
					sizing={this.props["sizing"]}
					title='third'
					widget='widget'
				/>
				<Break sizing={this.props["sizing"]} />

				<Title
					layout={TitleLayout.even}
					sizing={this.props["sizing"]}
					title='even'
					widget='widget'
				/>
				<Break sizing={this.props["sizing"]} />

				<Title
					layout={TitleLayout.threequarter}
					sizing={this.props["sizing"]}
					title='three quarter'
					widget='widget'
				/>
				<Break sizing={this.props["sizing"]} />

				<Title
					widget='widget'
					layout={TitleLayout.stacked}
					sizing={this.props["sizing"]}
					title='stacked'
				/>
				<Break sizing={this.props["sizing"]} />

				<Title
					layout={TitleLayout.dominant}
					sizing={this.props["sizing"]}
					title='dominant'
					widget='widget'
				/>
				<Break sizing={this.props["sizing"]} />

				<Title
					layout={TitleLayout.none}
					sizing={this.props["sizing"]}
					title='title only'
				/>
				<Break sizing={this.props["sizing"]} />

				<Title
					widget='widget'
					sizing={this.props["sizing"]}
					title='disabled'
					disabled
				/>
				<Break sizing={this.props["sizing"]} />
			</StyledContainer>
		);
	}
}
