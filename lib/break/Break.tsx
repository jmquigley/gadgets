/**
 * A wrapper for the <br /> tag.  This respects the sizing base
 * property setting.
 *
 * ## Examples:
 *
 * ```javascript
 * import {Break} from 'gadgets';
 * <Break sizing={Sizing.small} />
 * ```
 *
 * ## API
 * #### Events
 * N/A
 *
 * #### Styles
 * - `ui-break` - placed on the root `<br>` tag
 *
 * #### Properties
 * - `n=1 {number}` - repeat count for the component.  The default is one Break
 * This is used to create N consecutive breaks.
 *
 * @module Break
 */

// const debug = require("debug")("gadgets.Break");

import * as React from "react";
import {sp} from "util.constants";
import {roundUp} from "util.toolbox";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	getDefaultBaseProps,
	getDefaultBaseState
} from "../shared";
import styled from "../shared/themed-components";

export interface BreakProps extends BaseProps {
	fontSize?: string;
	n?: number;
}

export function getDefaultBreakProps(): BreakProps {
	return {
		...getDefaultBaseProps(),
		fontSize: "1.0rem",
		n: 1,
		obj: "Break"
	};
}

const BreakView: any = styled.p`
	content: "";
	display: block;
	margin: 0;
	margin-top: ${(props: BreakProps) => props.height};
	font-size: ${(props: BreakProps) => props.fontSize};
`;

export class Break extends BaseComponent<BreakProps, BaseState> {
	public static defaultProps: BreakProps = getDefaultBreakProps();
	public state: BaseState = getDefaultBaseState();

	constructor(props: BaseProps) {
		super(props, "ui-break");
	}

	public render() {
		this.updateClassName();

		const totalBreaks: number = roundUp(
			this.props.n > 0 ? this.props.n : 1
		);
		const breaks: any[] = [];

		for (let i = 0; i < totalBreaks; i++) {
			breaks.push(
				<BreakView
					className={this.className}
					fontSize={BaseComponent.fontSizeREM(
						this.props.sizing,
						0.666
					)}
					sizing={this.props.sizing}
					style={this.state.style}
				>
					{sp}
				</BreakView>
			);
		}

		return breaks;
	}
}

export default Break;
