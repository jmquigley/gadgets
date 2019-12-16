const debug = require("debug")("DemoIFrame");

import autobind from "autobind-decorator";
import * as React from "react";
import styled from "styled-components";
import {IFrame} from "../../dist/bundle";
import {StyledContainer} from "./helpers";

export interface DemoIFrameState {
	html: string;
}

export const IFrameStyledContainer: any = styled(StyledContainer)`
	height: 300x;
`;

export default class DemoIFrame extends React.Component<any, DemoIFrameState> {
	constructor(props: any) {
		super(props);
		debug("creating");

		this.state = {
			html: "<h1>test html header</h1>"
		};
	}

	@autobind
	private handleClick(e: React.MouseEvent<HTMLDivElement>) {
		e.persist();
		debug("handleClick: %O", e);
	}

	public render() {
		return (
			<IFrameStyledContainer id='iframeExample' title='IFrame'>
				<div onClick={this.handleClick}>
					<IFrame
						html={this.state.html}
						disabled={this.props["disabled"]}
					/>
				</div>
			</IFrameStyledContainer>
		);
	}
}
